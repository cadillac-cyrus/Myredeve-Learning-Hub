const functions = require('firebase-functions');
const admin = require('firebase-admin');
const emailjs = require('emailjs');

// Initialize Firebase Admin SDK
admin.initializeApp();

// EmailJS server setup
const server = emailjs.server.connect({
    user: "Coxwell",
    password: "G7$k@2Xp",
    host: "smtp.gmail.com",  // Use your SMTP provider details
    ssl: true,
});

exports.sendEmailOnNewFormSubmission = functions.firestore
    .document('submissions/{docId}')
    .onCreate((snap, context) => {
        const newValue = snap.data();
        const { name, email, subject, message } = newValue;

        // Set up your template parameters here
        const templateParams = {
            name: name,
            email: email,
            subject: subject,
            message: message,
        };

        // Send the email using EmailJS with the template ID
        return emailjs.send({
            user: "Coxwell",
            password: "G7$k@2Xp",
            host: "smtp.gmail.com",
            ssl: true,
            template: 'template_ym0bbq7', // Your EmailJS template ID
            templateParams: templateParams,
            from: "Your Name <hexacodelabs@gmail.com>",
            to: "Recipient Name <myredevesuper@gmail.com>",
            subject: `New Form Submission: ${subject}`,
        }, (err, message) => {
            if (err) {
                console.error('Error sending email:', err);
            } else {
                console.log('Email sent successfully using template!', message);
            }
        });
    });
