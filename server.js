const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRoute = require('./Routes/userRoutes');
const bookstoredbConfig = require('./Config/config');
require('dotenv').config();

let port = process.env.port;



app.use(cors());
app.use(express.json());
app.use('/api', AuthRoute);
app.listen(port, () => {
    console.log(`Server is starting at port : ${port}`)
})


mongoose.connect(bookstoredbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("\nUser database connected successfully");
}).catch(err => {
    console.log("error", err);
    process.exit();
});


mongoose.connect(bookstoredbConfig.bookurl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Book store database connected successfully");
}).catch(err => {
    console.log("error", err);
    process.exit();
});


mongoose.connect(bookstoredbConfig.AddToCart_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Cart database connected successfully");
}).catch(err => {
    console.log("error", err);
    process.exit();
});


mongoose.connect(bookstoredbConfig.AddToWishlist_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Wishlist database connected successfully");
}).catch(err => {
    console.log("error", err);
    process.exit();
});

mongoose.connect(bookstoredbConfig.CustomerDetails_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Customer details database connected successfully");
}).catch(err => {
    console.log("error", err);
    process.exit();
});