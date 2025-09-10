require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');

const userRoutes = require ('./routes/users_route.js');

const productRoutes = require ('./routes/product_route.js');

const middlewareRequest = require('./middleware/logs.js')

const upload = require('./middleware/multer.js')


const app = express();

app.use(middlewareRequest);

//baca json
app.use(express.json());

// supaya bisa baca form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(upload.none());

//akses gambar di public
app.use('/assets',express.static('public/images'));

//router users
app.use('/users',userRoutes);

//router products
app.use('/products',productRoutes);

app.post('/upload', upload.single('photo'),(req, res) =>{
  res.json({
    message:'Upload berhasil'
  })
})


//error handler
app.use( (err, req, res, next) => {
  res.status(500).json({
    message: err.message
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});