const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://www.electro-specjalisci.pl"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false,
    auth: {
      user: process.env.MONTROE,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.MONTROE,
    to: process.env.JULIA,
    subject: "Nowa wiadomość ze strony elektro-specjaliści",
    text: `Name: ${name}; Email: ${email}; Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(process.env.HOST);

  console.log(`Server is running on port ${PORT}`);
});
