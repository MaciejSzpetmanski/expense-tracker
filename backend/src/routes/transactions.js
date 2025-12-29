const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

// Create
router.post('/', async (req, res) => {
  try {
    const tx = await Transaction.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

router.get('/', async (req, res) => {
  const { from, to, type, category } = req.query;
  const query = { userId: req.user.id };

  if (type) query.type = type;
  if (category) query.category = category;
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  const txs = await Transaction.find(query).sort({ date: -1 });
  res.json(txs);
});

// Update
router.put('/:id', async (req, res) => {
  const tx = await Transaction.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!tx) return res.status(404).json({ message: 'Not found' });
  res.json(tx);
});

// Delete
router.delete('/:id', async (req, res) => {
  const tx = await Transaction.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });
  if (!tx) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

router.get('/summary/monthly', async (req, res) => {
  const { year, month } = req.query;
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  const pipeline = [
    { $match: { userId: require('mongoose').Types.ObjectId(req.user.id), date: { $gte: start, $lt: end } } },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' }
      }
    }
  ];
  const result = await Transaction.aggregate(pipeline);
  res.json(result);
});

module.exports = router;
