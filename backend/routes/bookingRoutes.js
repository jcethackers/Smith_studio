const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer'); // Import Nodemailer

// --- CONFIGURATION ---
// Replace these with YOUR details
const MY_EMAIL =process.env.MY_EMAIL; // Your Gmail address
const MY_APP_PASSWORD =process.env.MY_APP_PASSWORD; // Paste the 16-digit App Password here
const ADMIN_EMAIL =process.env.ADMIN_EMAIL; // The person receiving the booking
// ---------------------

// Create the Transporter (The mailman)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MY_EMAIL,
        pass: MY_APP_PASSWORD
    }
});

// POST /api/bookings
router.post('/', (req, res) => {
    const folderPath = path.join(__dirname, '../bookings');
    const filePath = path.join(folderPath, 'all_bookings.json');

    if (!fs.existsSync(folderPath)) { fs.mkdirSync(folderPath); }

    // 1. Read existing bookings
    let currentBookings = [];
    if (fs.existsSync(filePath)) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            if (fileData) currentBookings = JSON.parse(fileData);
        } catch (error) { currentBookings = []; }
    }

    // 2. Calculate ID
    let nextId = 1;
    if (currentBookings.length > 0) {
        const lastBooking = currentBookings[currentBookings.length - 1];
        nextId = parseInt(lastBooking.id) + 1;
    }

    // 3. Create Booking Object
    const newBooking = {
        id: nextId,
        ...req.body,
        createdAt: new Date().toISOString()
    };

    // 4. Save to File
    currentBookings.push(newBooking);

    fs.writeFile(filePath, JSON.stringify(currentBookings, null, 2), (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).json({ message: 'Failed to save booking' });
        }

        console.log(`Booking saved with ID: ${nextId}`);

        // --- 5. SEND EMAIL LOGIC ---
        
        // Create the email content
        const mailOptions = {
            from: MY_EMAIL,
            to: ADMIN_EMAIL,
            subject: `New Booking Alert: #${nextId} - ${newBooking.service}`,
            html: `
                <h2>New Booking Received!</h2>
                <p><strong>Booking ID:</strong> ${nextId}</p>
                <p><strong>Customer:</strong> ${newBooking.name}</p>
                <p><strong>Service:</strong> ${newBooking.service}</p>
                <p><strong>Date:</strong> ${newBooking.date}</p>
                <p><strong>Phone:</strong> ${newBooking.phone}</p>
                <p><strong>Email:</strong> ${newBooking.email}</p>
                <p><strong>Location:</strong> ${newBooking.location}</p>
                <br>
                <p><em>Check the dashboard for full details.</em></p>
            `
        };

        // Send the mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                // We still send success to frontend because the file save worked
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // Send response to Frontend
        res.status(201).json({ 
            message: 'Booking confirmed', 
            bookingId: nextId 
        });
    });
});

module.exports = router;