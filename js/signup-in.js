const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});


 const nodemailer = require('nodemailer');
 const crypto = require('crypto');
 const MongoClient = require('mongodb').MongoClient;

 // Connection URL
 const url = 'mongodb://localhost:27017';

 // Database Name
 const dbName = 'myproject';

 // Create a new MongoClient
 const client = new MongoClient(url);

 // Get the user's email and registration data
 const email = req.body.email;
 const name = req.body.name;
const password = req.body.password;

 // Generate a verification token
 const token = crypto.randomBytes(20).toString('hex');

 // Store the user's data and token in a database
 client.connect(function(err) {
   if (err) throw err;
   console.log('Connected successfully to server');

   const db = client.db(dbName);

   const collection = db.collection('users');

   const user = { email, name, password, token, verified: false };

   collection.insertOne(user, function(err, result) {
     if (err) throw err;
     console.log('User inserted');
   });
 });

 // Create the verification link with the token
 const verificationLink = `https://example.com/verify?token=${token}`;

// Create the email message
const message = `
   <p>Hi ${name},</p>
   <p>Thank you for registering with our site. Please click the link below to verify your email address:</p>
   <p><a href='${verificationLink}'>${verificationLink}</a></p>
 `;
 // Create a transporter object to send the email
 const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'youremail@gmail.com',
     pass: 'yourpassword'
   }
 });

 // Define the email options
 const mailOptions = {
   from: 'youremail@gmail.com',
   to: email,
   subject: 'Please verify your email address',
   html: message
 };

 // Send the email using nodemailer
 transporter.sendMail(mailOptions, function(error, info){
   if (error) {
     console.log(error);
   } else {
     console.log('Email sent: ' + info.response);
   }
 });

// // Redirect the user to a success page
// // ...
