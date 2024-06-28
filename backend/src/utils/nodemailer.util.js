import nodemailer from "nodemailer";

const sendMail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Med & Care email verification.",
        text: `Your OTP for email verification is: ${otp}. The otp is valid for 10 min. Do not share otp with anyone else.`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MED & CARE OTP</title>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            animation: fadeIn 2s;
        }

        .email-header {
            background: #dcdcdc; /* Light gray color */
            color: #28791d;
            padding: 10px;
            border-radius: 10px 10px 0 0;
        }

        .email-body {
            padding: 20px;
            background: #fff;
            border-radius: 0 0 10px 10px;
        }

        .otp-code {
            font-size: 2em;
            font-weight: bold;
            margin: 20px 0;
            padding: 10px;
            background: #28791d; /* Green color */
            color: #fff;
            border-radius: 5px;
            display: inline-block;
            animation: fadeIn 2s;
        }

        .email-footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #555;
        }

        .logo {
            max-width: 100px;
            margin: 10px auto;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        .footer-links {
            margin-top: 20px;
        }

        .footer-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://i.imgur.com/gr2Nhap.png" alt="MED & CARE Logo" class="logo">
            <h1>MED & CARE</h1>
        </div>
        <div class="email-body">
            <p>Dear Customer,</p>
            <p>Thank you for choosing MED & CARE. Use the OTP below to complete your verification process:</p>
            <div class="otp-code">${otp}</div> <!-- OTP -->
            <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
        </div>
        <div class="email-footer">
            <p>Best regards,<br>MED & CARE Team</p>
            <div class="social-links">
                <p>Follow us on:</p>
                <a href="https://www.facebook.com" target="_blank">Facebook</a> |
                <a href="https://www.twitter.com" target="_blank">Twitter</a> |
                <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
                <a href="https://www.instagram.com" target="_blank">Instagram</a>
            </div>
            <div class="footer-links">
                <a href="unsubscribe_link_here" target="_blank">Unsubscribe</a> |
                <a href="privacy_policy_link_here" target="_blank">Privacy Policy</a>
            </div>
            <p>If you did not request this code, please ignore this email.</p>
        </div>
    </div>
</body>
</html>`,
    });
};
const sendWelcomeMail = async (email, username) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Welcome to Our App!!",
        text: `Greetings ${username}. We hope yoou will love our app. Stay safe and be happy.`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MED & CARE</title>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            animation: fadeIn 2s;
        }

        .email-header {
            background: #dcdcdc; /* Light gray color */
            color: #28791d;
            padding: 10px;
            border-radius: 10px 10px 0 0;
        }

        .email-body {
            padding: 20px;
            background: #fff;
            border-radius: 0 0 10px 10px;
        }

        .email-body p {
            margin-bottom: 15px; /* Adding spacing between paragraphs */
        }

        .email-body ul {
            margin-bottom: 15px; /* Adding spacing above and below the list */
            padding-left: 20px; /* Indentation for list items */
        }

        .otp-code {
            font-size: 2em;
            font-weight: bold;
            margin: 20px 0;
            padding: 10px;
            background: #28791d; /* Green color */
            color: #fff;
            border-radius: 5px;
            display: inline-block;
            animation: fadeIn 2s;
        }

        .main-website-link {
            margin-top: 20px;
        }

        .main-website-link a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #28791d; /* Green color */
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .main-website-link a:hover {
            background-color: #1e5811; /* Darker shade of green on hover */
        }

        .email-footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #555;
        }

        .logo {
            max-width: 100px;
            margin: 10px auto;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        .footer-links {
            margin-top: 20px;
        }

        .footer-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }
        ul {
            list-style: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://i.imgur.com/gr2Nhap.png" alt="MED & CARE Logo" class="logo">
            <h1>MED & CARE</h1>
        </div>
        <div class="email-body">
            <p>Dear ${username}❤️,</p>
            <p>Welcome to MED & CARE🙌! We are thrilled to have you with us. Our mission is to provide you with the best healthcare services and support👌.</p>
            <p>As a valued member of the MED & CARE community, you now have access to exclusive benefits, resources, and updates. Here are a few things you can get started with:</p>
            <ul>
                <li>Explore our range of healthcare products and services.⛷️</li>
                <li>Access personalized health tips and advice.👩‍⚕️</li>
                <li>Join our community forums to connect with other members.🫂</li>
            </ul>
            <p>If you have any questions or need assistance, our support team is always here to help.</p>
            <div class="main-website-link">
                <a href="https://www.medcare.com/login" target="_blank">Log in to your account</a>
            </div>
        </div>
        <div class="email-footer">
            <p>Best regards,<br>MED & CARE Team</p>
            <div class="social-links">
                <p>Follow us on:</p>
                <a href="https://www.facebook.com" target="_blank">Facebook</a> |
                <a href="https://www.twitter.com" target="_blank">Twitter</a> |
                <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
                <a href="https://www.instagram.com" target="_blank">Instagram</a>
            </div>
            <div class="footer-links">
                <a href="unsubscribe_link_here" target="_blank">Unsubscribe</a> |
                <a href="privacy_policy_link_here" target="_blank">Privacy Policy</a>
            </div>
            <p>If you did not sign up for this email, please ignore this message.</p>
        </div>
    </div>
</body>
</html>`,
    });
};
const sendOrderNotif = async (email, name, address, phno) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Your order has been placed",
        text: `Greetings ${name}. Order has been placed from Med&Care. `,
        html: `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - MED & CARE</title>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            animation: fadeIn 2s;
        }

        .email-header {
            background: #dcdcdc; /* Light gray color */
            color: #28791d;
            padding: 10px;
            border-radius: 10px 10px 0 0;
        }

        .email-body {
            padding: 20px;
            background: #fff;
            border-radius: 0 0 10px 10px;
        }

        .email-body p {
            margin-bottom: 15px; /* Adding spacing between paragraphs */
        }

        .order-details {
            text-align: left;
            margin-bottom: 20px;
        }

        .order-details table {
            width: 100%;
            border-collapse: collapse;
        }

        .order-details th, .order-details td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }

        .order-description {
            font-weight: bold;
            margin-top: 20px;
            padding: 10px;
            color: #000;
            border-radius: 5px;
            display: inline-block;
        }

        .main-website-link {
            margin-top: 20px;
        }

        .main-website-link a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #28791d; /* Green color */
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .main-website-link a:hover {
            background-color: #1e5811; /* Darker shade of green on hover */
        }

        .email-footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #555;
        }

        .logo {
            max-width: 100px;
            margin: 10px auto;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        .footer-links {
            margin-top: 20px;
        }

        .footer-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        ul {
            list-style: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://i.imgur.com/gr2Nhap.png" alt="MED & CARE Logo" class="logo">
            <h1>MED & CARE</h1>
        </div>
        <div class="email-body">
            <div class="order-details">
                <h2>Order Confirmation</h2>
                <table>
                    <tr>
                        <th>Name:</th>
                        <td>${name}</td>
                    </tr>
                    <tr>
                        <th>Address:</th>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <th>Phone Number:</th>
                        <td>+91 ${phno}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>${email}</td>
                    </tr>
                </table>
            </div>
            <div class="order-description">
                <strong>Order has been placed from MED & CARE.<br>
                Our executive will call you shortly to verify and confirm your order.<br>
                Please wait for confirmation mail.</strong>
            </div>
            <div class="main-website-link">
                <a href="https://www.medcare.com/login" target="_blank">Log in to your account</a>
            </div>
        </div>
        <div class="email-footer">
            <p>Best regards,<br>MED & CARE Team</p>
            <div class="social-links">
                <p>Follow us on:</p>
                <a href="https://www.facebook.com" target="_blank">Facebook</a> |
                <a href="https://www.twitter.com" target="_blank">Twitter</a> |
                <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
                <a href="https://www.instagram.com" target="_blank">Instagram</a>
            </div>
            <div class="footer-links">
                <a href="unsubscribe_link_here" target="_blank">Unsubscribe</a> |
                <a href="privacy_policy_link_here" target="_blank">Privacy Policy</a>
            </div>
            <p>If you did not place this order, please contact us immediately.</p>
        </div>
    </div>
</body>
</html>`,
    });
};
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
};

const sendAppointmentNotif = async (email, name, hospital, dr, date, time) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Appointment Reminder from Med&Care.",
        text: `Greetings ${name}. Appointment Reminder from Med&Care. Your Appointment is created in ${hospital}.`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Details - MED & CARE</title>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            animation: fadeIn 2s;
        }

        .email-header {
            background: #dcdcdc; /* Light gray color */
            color: #28791d;
            padding: 10px;
            border-radius: 10px 10px 0 0;
        }

        .email-body {
            padding: 20px;
            background: #fff;
            border-radius: 0 0 10px 10px;
        }

        .email-body p {
            margin-bottom: 15px; /* Adding spacing between paragraphs */
        }

        .appointment-details {
            text-align: left;
            margin-bottom: 20px;
        }

        .appointment-details table {
            width: 100%;
            border-collapse: collapse;
        }

        .appointment-details th, .appointment-details td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }

        .tracking-status {
            font-weight: bold;
            margin-top: 20px;
            padding: 10px;
            color: #000;
            border-radius: 5px;
            display: inline-block;
        }

        .main-website-link {
            margin-top: 20px;
        }

        .main-website-link a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #28791d; /* Green color */
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .main-website-link a:hover {
            background-color: #1e5811; /* Darker shade of green on hover */
        }

        .email-footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #555;
        }

        .logo {
            max-width: 100px;
            margin: 10px auto;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        .footer-links {
            margin-top: 20px;
        }

        .footer-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        ul {
            list-style: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://i.imgur.com/gr2Nhap.png" alt="MED & CARE Logo" class="logo">
            <h1>MED & CARE</h1>
        </div>
        <div class="email-body">
            <div class="appointment-details">
                <h2>Appointment Details</h2>
                <table>
                    <tr>
                        <th>Patient Name:</th>
                        <td>${name}</td>
                    </tr>
                    <tr>
                        <th>Hospital Name:</th>
                        <td>${hospital}</td>
                    </tr>
                    <tr>
                        <th>Date:</th>
                        <td>${date}</td>
                    </tr>
                    <tr>
                        <th>Time:</th>
                        <td>${time}</td>
                    </tr>
                    <tr>
                        <th>Doctor Assigned:</th>
                        <td>${dr}</td>
                    </tr>
                </table>
            </div>
            <div class="tracking-status">
                <strong>Our receptionist will call you shortly to verify and confirm your appointment.<br>
                Please wait for confirmation mail.</strong>
            </div>
            <div class="main-website-link">
                <a href="https://www.medcare.com/login" target="_blank">Log in to your account</a>
            </div>
        </div>
        <div class="email-footer">
            <p>Best regards,<br>MED & CARE Team</p>
            <div class="social-links">
                <p>Follow us on:</p>
                <a href="https://www.facebook.com" target="_blank">Facebook</a> |
                <a href="https://www.twitter.com" target="_blank">Twitter</a> |
                <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
                <a href="https://www.instagram.com" target="_blank">Instagram</a>
            </div>
            <div class="footer-links">
                <a href="unsubscribe_link_here" target="_blank">Unsubscribe</a> |
                <a href="privacy_policy_link_here" target="_blank">Privacy Policy</a>
            </div>
            <p>If you did not schedule this appointment, please contact us immediately.</p>
        </div>
    </div>
</body>
</html>`,
    });
};
const sendEnquiryMail = async (email, hospital, doctor, address,phno) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Welcome to Our App!!",
        text: `Greetings ${username}. We hope yoou will love our app. Stay safe and be happy.`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hospital Enquiry Details - MED & CARE</title>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            animation: fadeIn 2s;
        }

        .email-header {
            background: #dcdcdc;
            color: #28791d;
            padding: 10px;
            border-radius: 10px 10px 0 0;
        }

        .email-body {
            padding: 20px;
            background: #fff;
            border-radius: 0 0 10px 10px;
        }

        .email-body p {
            margin-bottom: 15px;
        }

        .enquiry-details {
            text-align: left;
            margin-bottom: 20px;
        }

        .enquiry-details table {
            width: 100%;
            border-collapse: collapse;
        }

        .enquiry-details th, .enquiry-details td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }

        .email-footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #555;
        }

        .logo {
            max-width: 100px;
            margin: 10px auto;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        .footer-links {
            margin-top: 20px;
        }

        .footer-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        ul {
            list-style: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://i.imgur.com/gr2Nhap.png" alt="MED & CARE Logo" class="logo">
            <h1>MED & CARE</h1>
        </div>
        <div class="email-body">
            <div class="enquiry-details">
                <h2>Hospital Enquiry Details</h2>
                <table>
                    <tr>
                        <th>Hospital Name:</th>
                        <td>MED & CARE Hospital</td>
                    </tr>
                    <tr>
                        <th>Address:</th>
                        <td>123 Health St., Wellness City, State, ZIP</td>
                    </tr>
                    <tr>
                        <th>Contact No:</th>
                        <td>(123) 456-7890</td>
                    </tr>
                </table>
                <h3>Available Doctors and Specialties:</h3>
                <table>
                    <tr>
                        <th>Doctor</th>
                        <th>Specialty</th>
                    </tr>
                    <tr>
                        <td>Dr. John Smith</td>
                        <td>Cardiology</td>
                    </tr>
                    <tr>
                        <td>Dr. Jane Doe</td>
                        <td>Neurology</td>
                    </tr>
                    <tr>
                        <td>Dr. Alice Johnson</td>
                        <td>Orthopedics</td>
                    </tr>
                </table>
                <h3>About the Hospital</h3>
                <p>
                    MED & CARE Hospital is a premier healthcare institution providing top-notch medical services. 
                    We are dedicated to offering comprehensive care and treatment, supported by a team of experienced 
                    doctors and state-of-the-art facilities. Our mission is to improve the health and well-being 
                    of our community through excellence in patient care, education, and research.
                </p>
            </div>
        </div>
        <div class="email-footer">
            <p>Best regards,<br>MED & CARE Team</p>
            <div class="social-links">
                <p>Follow us on:</p>
                <a href="https://www.facebook.com" target="_blank">Facebook</a> |
                <a href="https://www.twitter.com" target="_blank">Twitter</a> |
                <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
                <a href="https://www.instagram.com" target="_blank">Instagram</a>
            </div>
            <div class="footer-links">
                <a href="https://www.medcare.com/unsubscribe" target="_blank">Unsubscribe</a> |
                <a href="https://www.medcare.com/privacy-policy" target="_blank">Privacy Policy</a>
            </div>
            <p>If you did not make this enquiry, please contact us immediately.</p>
        </div>
    </div>
</body>
</html>`,
    });
};
export { sendWelcomeMail, sendAppointmentNotif, sendOrderNotif, sendEnquiryMail };
export default sendMail;
