require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');

const userRoutes = require ('./routes/users_route.js');

const middlewareRequest = require('./middleware/logs.js')

const upload = require('./middleware/multer.js')


const app = express();

app.use(middlewareRequest);
app.use(express.json());
app.use('/assets',express.static('public/images'));


app.use('/users',userRoutes);

app.post('/upload', upload.single('photo'),(req, res) =>{
  res.json({
    message:'Upload berhasil'
  })
})

app.use( (err, req, res, next) => {
  res.status(500).json({
    message: err.message
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});