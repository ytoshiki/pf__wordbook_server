const axios = require('axios');
const router = require('express').Router();

let endpoint = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}`;
// lang=en-ru&text=time";

router.get('/:text', async (req, res) => {
  let text = req.params.text;
  text = text.trim().replace(' ', '+');

  if (!text) {
    return res.status(400).json({
      success: false,
      message: 'You need to specify text'
    });
  }

  try {
    const result = await axios.get(`${endpoint}&q=${text}&image_type=photo&per_page=5&pretty=true`);

    if (!result.data.hits.length) {
      throw new Error('No Image Found');
    }
    res.json({
      success: true,
      data: result.data.hits
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || 'Something went wrong'
    });
  }
});

module.exports = router;
