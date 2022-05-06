const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, function(error) {
  if (error) throw error;
}, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
