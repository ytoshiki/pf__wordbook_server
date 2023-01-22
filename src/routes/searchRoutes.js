const { default: axios } = require("axios");
const fetch = require("node-fetch");

const router = require("express").Router();
// const Owlbot = require('owlbot-js');
// const client = Owlbot(process.env.OWLBOT_TOKEN);
// await client.define(word);

router.get("/:word", async (req, res) => {
  const word = req.params.word;

  try {
    // const result =
    fetch(`https://owlbot.info/api/v4/dictionary/${word}`, {
      headers: {
        Authorization: `Token ${process.env.OWLBOT_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.definitions) {
          throw new Error("Not Found");
        }

        res.status(200).json({
          success: true,
          data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "Not Found",
        });
      });

    // const data = await result.data;
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Not Found",
    });
  }
});

module.exports = router;
