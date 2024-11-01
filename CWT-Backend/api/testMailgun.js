import nodemailer from 'nodemailer';

// Set up the transporter with Gmail's SMTP details
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'ks.khushbushah@gmail.com',  // Replace with your Gmail address
        pass: 'TrustTheProcess1',  // Replace with your Gmail password or App Password
    },
    secure: true, // Set to true if you're using port 465
    connectionTimeout: 10000,  // 10 seconds
    greetingTimeout: 5000,     // 5 seconds
    socketTimeout: 10000       // 10 seconds
});

// Set up email options
const mailOptions = {
    from: 'ks.khushbushah@gmail.com',  // Must be your Gmail address
    to: 'khushisshah7@gmail.com',  // Replace with the recipient’s email address for testing
    subject: 'Test Email from Gmail',
    text: 'This is a test email to verify Gmail setup'
};

// Send test email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error occurred:', error);
    }
    console.log('Email sent successfully:', info);
});
