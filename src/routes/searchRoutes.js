const router = require('express').Router();
const Owlbot = require('owlbot-js');
const client = Owlbot(process.env.OWLBOT_TOKEN);

router.get('/:word', async (req, res) => {
  const word = req.params.word;
  try {
    const result = await client.define(word);
    if (!result) {
      throw new Error('Not Found');
    }
    res.send(result);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || 'Not Found'
    });
  }
});

module.exports = router;
