const nodemailer = require('nodemailer');
const email = process.env.Hidemyemail;
const password = process.env.HideMypassword;

const sendOTPEmail = async (userEmail, otp) => {
    console.log(userEmail, otp, "Sending OTP");

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });

    var mailOptions = {
        from: email,
        to: userEmail,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendOTPEmail;
