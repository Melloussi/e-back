const express = require('express');
const router = express.Router();
const Transfer = require('../models/Transfer');

// Function to convert quantity string to number
function convertQuantity(quantity) {
    const match = quantity.match(/of (\d+)/);
    return match ? parseInt(match[1], 10) : 0;
}

// @route   POST /api/transfers
// @desc    Add new transfer with items
// @access  Public
/*
router.post('/', async (req, res) => {
    const { name, items } = req.body;
    try {
        const transferItems = items.map((item, index) => ({
            ...item,
            position: index + 1,
            quantity: convertQuantity(item.quantity),
            received: 0,
            damage: 0
        }));

        const newTransfer = new Transfer({
            name,
            items: transferItems,
        });

        const savedTransfer = await newTransfer.save();
        res.status(200).json(savedTransfer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});*/
router.post('/', async (req, res) => {
    const { name, items } = req.body;
    try {
      const transferItems = items.map((item, index) => ({
        ...item,
        position: index + 1,
        quantity: convertQuantity(item.quantity),
        received: 0,
        damage: 0
      }));
  
      const newTransfer = new Transfer({
        name,
        items: transferItems,
      });
  
      const savedTransfer = await newTransfer.save();
      res.status(200).json(savedTransfer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// @route   PUT /api/transfers/:name
// @desc    Update transfer items by transfer name
// @access  Public
router.put('/:name', async (req, res) => {
    const { name } = req.params;
    const { items } = req.body;
  
    try {
      const transfer = await Transfer.findOneAndUpdate(
        { name },
        { items },
        { new: true }
      );
      if (!transfer) {
        return res.status(404).json({ message: 'Transfer not found' });
      }
      res.status(200).json(transfer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// @route   GET /api/transfers/:name
// @desc    Get transfer items by transfer name
// @access  Public
router.get('/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const transfer = await Transfer.findOne({ name });
        if (transfer) {
            res.status(200).json({
                name: transfer.name,
                createdDate: transfer.createdDate,
                items: transfer.items
            });
        } else {
            res.status(404).json({ message: 'Transfer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
