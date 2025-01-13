const pool = require('../config/database');
const Producto = require('../models/Producto');
const Venta = require('../models/Venta');
const VentaDetalle = require('../models/VentaDetalle');

// Obtener todas las ventas
const getVentas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM venta');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener una venta por ID
const getVentaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM venta WHERE venta_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear una nueva venta
const createVenta = async (req, res) => {
    const { cliente_id, fecha, total } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO venta (cliente_id, fecha, total) VALUES (?, ?, ?)',
            [cliente_id, fecha, total]
        );
        res.status(201).json({ id: result.insertId, message: 'Venta creada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar una venta existente
const updateVenta = async (req, res) => {
    const { id } = req.params;
    const { cliente_id, fecha, total } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE venta SET cliente_id = ?, fecha = ?, total = ? WHERE venta_id = ?',
            [cliente_id, fecha, total, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.json({ message: 'Venta actualizada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar una venta
const deleteVenta = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM venta WHERE venta_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.json({ message: 'Venta eliminada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Función para realizar la venta y actualizar el stock
const realizarVenta = async (ventaData, detallesVenta) => {
  // Comienza una transacción para garantizar que todas las operaciones sean atómicas
  const transaction = await sequelize.transaction();
  try {
    // Crear la venta en la tabla 'venta'
    const nuevaVenta = await Venta.create(ventaData, { transaction });

    // Registrar los detalles de la venta en la tabla 'venta_detalle'
    for (let detalle of detallesVenta) {
      await VentaDetalle.create({
        venta_codigo: ventaData.venta_codigo, // Asociamos el código de venta
        venta_detalle_cantidad: detalle.cantidad,
        venta_detalle_precio_compra: detalle.precio_compra,
        venta_detalle_precio_venta: detalle.precio_venta,
        venta_detalle_total: detalle.total,
        venta_detalle_descripcion: detalle.descripcion,
        producto_id: detalle.producto_id,
      }, { transaction });

      // Obtener el producto de la base de datos
      const producto = await Producto.findOne({ where: { producto_id: detalle.producto_id } });

      if (producto) {
        // Verificar si hay suficiente stock
        if (producto.producto_stock_total >= detalle.cantidad) {
          // Restar la cantidad vendida del stock
          await Producto.update(
            { producto_stock_total: producto.producto_stock_total - detalle.cantidad },
            { where: { producto_id: detalle.producto_id }, transaction }
          );
        } else {
          // Si no hay suficiente stock, revertir la transacción
          await transaction.rollback();
          throw new Error('Stock insuficiente para uno o más productos');
        }
      } else {
        // Si el producto no existe, revertir la transacción
        await transaction.rollback();
        throw new Error(`Producto con ID ${detalle.producto_id} no encontrado`);
      }
    }

    // Confirmar la transacción
    await transaction.commit();
    return nuevaVenta; // Devolver la venta registrada
  } catch (error) {
    // Si ocurre un error, revertir todos los cambios realizados
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
    getVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta,
    realizarVenta
};
