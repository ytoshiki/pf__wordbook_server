const router = require('express').Router();
const auth = require('../middleware/auth');
const ListModel = require('../models/ListModel');

// Get Lists
router.get('/', auth, async (req, res) => {
  try {
    const lists = await ListModel.find({ user: req.user._id });
    if (!lists) {
      throw new Error('Lists Not Found');
    }

    res.json({
      success: true,
      data: lists
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || 'Something went wrong'
    });
  }
});

// Get List By Id
router.get('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    const list = await ListModel.findOne({ _id: id, user: req.user._id });

    if (!list) {
      throw new Error('List Not Found');
    }

    res.json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error
    });
  }
});

// Create List
router.post('/', auth, async (req, res) => {
  req.body.user = req.user._id;
  try {
    const list = new ListModel(req.body);
    if (req.body.examples) {
      req.body.examples.forEach((example) => {
        list.addExample(example);
      });
    }
    await list.save();
    await list.populate('user').execPopulate();

    res.status(201).json({
      success: true,
      message: 'List Created Successfully',
      data: list
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error
    });
  }
});

// Update Word
router.post('/:id', auth, async (req, res) => {
  const id = req.params.id;

  try {
    const list = await ListModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!list) {
      throw new Error('Failed to Update');
    }

    res.send({
      success: true,
      message: 'List Successfully Updated',
      data: list
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || 'Something went wrong'
    });
  }
});

// Delete Post
router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;

  try {
    const list = await ListModel.findOne({ _id: id, user: req.user._id });
    if (!list) {
      throw new Error('List Not Found');
    }

    await list.remove();

    res.send({
      success: true,
      message: 'List Successfully Deleted'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || 'Something went wrong'
    });
  }
});

module.exports = router;
