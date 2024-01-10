const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// // Enable CORS for specific routes
// app.use('/orders', cors(corsOptions)); 



try {
  const MONGODB_URI = 'mongodb://root:password@localhost:27017';
  mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

// Order Schema
const orderSchema = new mongoose.Schema({
  Products: [
    {
      id: {
        type:Number,
        required: true
    },
      productName: {
        type:String,
        required: true
    },
      amount:{
        type:Number,
        required: true
    },
      price: {
        type:Number,
        required: true
    },
      productImage: {
        type:String,
        required: true
    },
    },
    { _id: false }
  ],
  Total_price: {
    type: Number,
    required: true
},
  Status: {
    type: String,
    enum: ['Pending', 'Success', 'Reject'],
    default: 'Pending'
},
  customer_username:{
    type: String,
    required: true
}
});

const Order = mongoose.model('Order', orderSchema);

// API Endpoints
app.post('/orders', async (req, res) => {
  // Validate user access and authentication

  try{
    // Extract order details from the request body
    const { Products, Total_price, Status, customer_username } = req.body;

    // Create a new order
    const newOrder = new Order({
      Products,
      Total_price,
      Status,
      customer_username,
    });

    // Save the order to the database
    await newOrder.save();

    res.json({ message: 'Order created successfully', order: newOrder });
  }
  catch (error) {
        res.status(500).send(error.message);
 }
});



app.get('/orders/username/:username', async (req, res) => {
  try {
    // Validate user access and authentication
    const username = req.params.username;

    // Retrieve orders from the database based on the provided username
    const orders = await Order.find({ customer_username: username });

    res.send(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
