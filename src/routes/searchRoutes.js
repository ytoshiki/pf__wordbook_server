const { default: axios } = require('axios');

const router = require('express').Router();
// const Owlbot = require('owlbot-js');
// const client = Owlbot(process.env.OWLBOT_TOKEN);
// await client.define(word);

router.get('/:word', async (req, res) => {
  const word = req.params.word;

  try {
    const result = await axios(`https://owlbot.info/api/v4/dictionary/${word}`, {
      headers: {
        Authorization: `Token ${process.env.OWLBOT_TOKEN}`
      }
    });

    const data = await result.data;
    if (!data) {
      throw new Error('Not Found');
    }
    res.send(data);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || 'Not Found'
    });
  }
});

module.exports = router;
