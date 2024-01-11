const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));



try {
  const MONGODB_URI = 'mongodb://root:password@localhost:27018';
  mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

// Product Schema
const productSchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String, 
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    seller_username: {
      type: String,
      required: true,
    },
  });

const Product = mongoose.model('Product', productSchema);

// API Endpoints
app.post('/products', async (req, res) => {
  // Validate user access and authentication

  try{
    // Extract product details from the request body
    const { id, productName, productImage, price, Quantity, seller_username} = req.body;

    // Create a new product
    const newProduct = new Product({
        id,
        productName,
        productImage,
        price,
        Quantity,
        seller_username
    });

    // Save the order to the database
    await newProduct.save();

    res.json({ message: 'Product created successfully', product: newProduct });
  }
  catch (error) {
        res.status(500).send(error.message);
 }
});


app.get('/products', async (req, res) => {
    try {
      // Retrieve all products from the database
      const allProducts = await Product.find();
  
      res.json({ products: allProducts });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

  app.get('/products/id/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      // Retrieve product with the specified id from the database
      const product = await Product.find({ id: productId });
  
      if (product) {
        res.json({ product });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  app.get('/products/name/:name', async (req, res) => {
    try {
      const productName = req.params.name;
  
      // Retrieve product(s) with the specified name from the database
      const products = await Product.find({ productName: productName });
  
      if (products.length > 0) {
        res.json({ products });
      } else {
        res.status(404).json({ message: 'Products not found with the specified name' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get('/products/username/:username', async (req, res) => {
    try {
      const sellerUsername = req.params.username;
  
      // Retrieve product(s) with the specified seller username from the database
      const products = await Product.find({ seller_username: sellerUsername });
  
      if (products.length > 0) {
        res.json({ products });
      } else {
        res.status(404).json({ message: 'Products not found for the specified seller username' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.put('/product/id/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProductDetails = req.body;
  
      // Update the product with the specified id in the database
      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductDetails, {
        new: true, // Return the updated document
      });
  
      if (updatedProduct) {
        res.json({ message: 'Product updated successfully', product: updatedProduct });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete('/product/id/:id', async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Delete the product with the specified id from the database
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (deletedProduct) {
        res.json({ message: 'Product deleted successfully', product: deletedProduct });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
