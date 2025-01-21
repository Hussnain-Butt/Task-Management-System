const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Configure NodeMailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // App password
    },
});

/**
 * Send email notification
 * @param {Object} admin - Admin's email information
 * @param {String} subject - Email subject
 * @param {String} message - Email body
 */
const sendNotification = async (admin, subject, message) => {
    try {
        const mailOptions = {
            from: `"Task Manager" <${process.env.EMAIL_USER}>`,
            to: admin.email,
            subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${admin.email}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

module.exports = sendNotification;
