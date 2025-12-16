const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Booking = require('../models/Booking');

// --- CONFIGURATION ---
const MY_EMAIL = process.env.MY_EMAIL; 
const MY_APP_PASSWORD = process.env.MY_APP_PASSWORD; 
const ADMIN_EMAIL = process.env.ADMIN_EMAIL; 

// --- DEBUGGING LOG (This will show in Render Logs) ---
console.log("--------------------------------------");
console.log("EMAIL SYSTEM STARTING UP");
console.log("User:", MY_EMAIL ? "Found" : "MISSING!!");
console.log("Pass:", MY_APP_PASSWORD ? "Found" : "MISSING!!");
console.log("Target:", ADMIN_EMAIL ? "Found" : "MISSING!!");
console.log("--------------------------------------");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,               // SSL Port
    secure: true,            // Must be true
    auth: {
        user: MY_EMAIL,
        pass: MY_APP_PASSWORD
    }
});

router.post('/', async (req, res) => {
    try {
        console.log("Attempting to save booking...");
        
        // 1. Save to MongoDB
        const newBooking = new Booking({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            service: req.body.service,
            date: req.body.date,
            location: req.body.location,
            details: req.body.message
        });

        const savedBooking = await newBooking.save();
        console.log(`Booking saved! ID: ${savedBooking._id}`);

        // 2. Prepare Email
        const mailOptions = {
            from: MY_EMAIL,
            to: ADMIN_EMAIL,
            subject: `New Booking: ${savedBooking.service}`,
            text: `Name: ${savedBooking.name}\nPhone: ${savedBooking.phone}\nService: ${savedBooking.service}`
        };

        // 3. Send Email
        console.log("Sending email via Port 465...");
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");

        res.status(201).json({ message: 'Booking confirmed', bookingId: savedBooking._id });

    } catch (error) {
        console.error("CRITICAL ERROR:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;