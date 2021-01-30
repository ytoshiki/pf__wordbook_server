const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('./db/mongo');
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const imageRoutes = require('./routes/imageRoutes');
const searchRoutes = require('./routes/searchRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
app.use(cors());

app.use('/users', userRoutes);
app.use('/lists', listRoutes);
app.use('/images', imageRoutes);
app.use('/search', searchRoutes);

app.get('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not Allowed Method'
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Node server running on port ${process.env.PORT}`);
});
