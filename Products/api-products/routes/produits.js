const express = require('express');
const Produit = require('../models/produit');
const router = express.Router();

// GET all products

router.get('/', async (req, res) => {
    try {
      const produits = await Produit.find();
      res.status(200).json(produits);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // GET product by ID
router.get('/:id', async (req, res) => {
    try {
      const produit = await Produit.findById(req.params.id);
      if (!produit) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(produit);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // POST create a new product
router.post('/', async (req, res) => {
    const produit = new Produit(req.body);
    try {
      const newProduit = await produit.save();
      res.status(201).json(newProduit);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // PUT update a product
router.put('/:id', async (req, res) => {
    try {
      const produit = await Produit.findById(req.params.id);
      if (!produit) return res.status(404).json({ message: 'Product not found' });
  
      produit.name = req.body.name || produit.name;
      produit.description = req.body.description || produit.description;
      produit.price = req.body.price || produit.price;
      produit.quantity = req.body.quantity || produit.quantity;
      
  
      const updatedProduit = await produit.save();
      res.status(200).json(updatedProduit);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // DELETE a product
router.delete('/:id', async (req, res) => {
    try {
      const produit = await Produit.findById(req.params.id);
      if (!produit) return res.status(404).json({ message: 'Product not found' });
  
      await produit.deleteOne();
      res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;