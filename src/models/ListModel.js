const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      require: true
    },
    examples: [
      {
        example: {
          type: String
        }
      }
    ],
    memo: {
      type: String,
      default: null
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

ListSchema.methods.addExample = function (example) {
  this.examples = this.examples.concat({ example });
};

module.exports = mongoose.model('List', ListSchema);
