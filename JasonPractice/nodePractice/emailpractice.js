var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'email@gmail.com',
    pass: 'password'
  }
});

var mailOptions = {
  from: 'email@gmail.com',
  to: 'person1@gmail.com, person2@purdue.edu',
  subject: 'Sending Email using Node.js',
  text: `
    This was send using Node.js! Have a good day!
  `
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});