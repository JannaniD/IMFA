var uname = document.getElementById("uname");


var button = document.getElementById('butto');

button.addEventListener("click", ()=>{
    console.log("clicked");
    console.log(uname.value);

    window.location.href = "https://goog" 

})

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@gmail.com', // your email
    pass: 'your-password' // your email password
  }
});

// send verification email
function sendVerificationEmail(name, email) {
  let mailOptions = {
    from: 'your-email@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Verification Email', // Subject line
    text: `Hi ${name}, please click the following link to verify your email: http://your-registration-page.com`, // plain text body
    html: `<p>Hi ${name}, please click the following link to verify your email: <a href="http://your-registration-page.com">Verify Email</a></p>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// example usage
sendVerificationEmail('John Doe', 'johndoe@example.com');

