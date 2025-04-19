const express = require('express');
const Order = require('../models/order');
const router = express.Router();

// GET all products

router.get('/', async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // GET order by ID
router.get('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // POST create a new order
router.post('/', async (req, res) => {
    const order = new Order(req.body);
    try {
      const newProduit = await order.save();
      res.status(201).json(newProduit);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // PUT update a order
router.put('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      order.name = req.body.name || order.name;
      order.description = req.body.description || order.description;
      order.price = req.body.price || order.price;
      order.quantity = req.body.quantity || order.quantity;
      
  
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // DELETE a order

router.delete('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      await order.deleteOne();
      res.status(200).json({ message: 'Order deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;