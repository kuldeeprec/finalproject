const express = require("express");
const User = require("../models/User");
const Person = require("../models/Person");
const Playing = require("../models/Playing");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");
const nodemailer = require("nodemailer");

const JWT_SECTRT = "amitisaplayer";

// ROUTE1:-Create a User using: POST "api/auth". Does not require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("signupEmail", "Enter a valid email").isLength({ min: 3 }),
    body("district", "Enter a valid district").isLength({ min: 3 }),
    body("pincode", "Enter a valid pincode").isLength({ min: 6 }),
    body("place", "Enter a valid place"),
    body("password").isLength({ min: 5 }),
    body("confirmpassword").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and the errors
    console.log(req);
    const errors = validationResult(req);
    // console.log(errors,"amityadav1");
    if (!errors.isEmpty()) {
      // console.log("amityadav2");
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ signupEmail: req.body.signupEmail });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      if (req.body.password != req.body.confirmpassword) {
        return res
          .status(400)
          .json({ error: "Sorry! Password is not matched" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        signupEmail: req.body.signupEmail,
        district: req.body.district,
        pincode: req.body.pincode,
        place: req.body.place,
        distance: req.body.distance,
        password: secPass,
      });
      await Person.create({
        userId: req.body.signupEmail,
      });

      await Playing.create({
        userId: req.body.signupEmail,
      });
      const data = {
        user: {
          id: user,
        },
      };
      success = true;
      const authtoken = jwt.sign(data, JWT_SECTRT);
      // console.log(authtoken);
      res.json({ success, authtoken });
      // res.json(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//  ROUTE2:-Authenticate a User using: POST "/api/auth/login" . No login required
router.post(
  "/login",
  [
    body("signupEmail", "Enter valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    console.log(req.body);
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { signupEmail, password } = req.body;
    try {
      let user = await User.findOne({ signupEmail });
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credential",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credential Second",
        });
      }
      const data = {
        user: {
          id: user,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECTRT);
      console.log(user.signupEmail);
      const mail = user.signupEmail;
      console.log("Yes");
      success = true;
      // const mail = data.email;
      res.json({ success, authtoken, mail });
      // res.status(success).json(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server Error occured");
    }
  }
);

// Logout Api

// router.get('/logout', (req, res)=>{
//   try{
//   console.log("You are now logout");
//   // const token = req.header('auth-token');
//   if(typeof window != 'undefined'){
//   localStorage.removeItem('auth-token');
//   }
//   res.status(200).send("User Logout");
// }
// catch(error){
//   console.log(error.message);
//   res.status(500).send("internal server Error occured");
// }
// });

//  ROUTE3:- Get logged in user detail "/api/auth/getuser" . login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
});

router.post("/finduser", async (req, res) => {
  try {
    const user = await User.findOne({ signupEmail: req.body.id }).select(
      "-password"
    );
    const people1 = await Person.findOne({ userId: req.body.id });
    console.log(people1, "people1");
    let l = people1.profile_img.length;
    let img1 = "1680012998583_Screenshot (11).png";
    if (l > 0) {
      img1 = people1.profile_img[l - 1].image_profile;
    }
    console.log(img1, "img1");
    res.send({ img1: img1, user: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
});

router.post("/sendmail", async (req, res) => {
  try {
    let otp_text = Math.random().toString().substr(2, 6);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "faizabadamit26@gmail.com",
        pass: "xwgksbbxrweruwyl",
      },
    });

    // send mail with defined transport object
    let mailStatus = await transporter.sendMail({
      from: "faizabadamit23@gmail.com", // sender address
      to: "faizabadamit24@gmail.com", // list of recipients
      subject: "Verify Your Email for Make Team Account",
      text: otp_text, // plain text
    });

    console.log(`Message sent: ${mailStatus.messageId}`);
    // return `Message sent: ${mailStatus.messageId}`;
    res.send({ mailStatus_Message: mailStatus.messageId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
});

router.post(
  "/changelocation",
  [
    body("district", "Enter a valid district").isLength({ min: 3 }),
    body("pincode", "Enter a valid pincode").isLength({ min: 6 }),
    body("place", "Enter a valid place"),
    body("p2").isLength({ min: 1 }),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and the errors
    console.log(req.body);
    const errors = validationResult(req);
    // console.log(errors,"amityadav1");
    if (!errors.isEmpty()) {
      // console.log("amityadav2");
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ signupEmail: req.body.p2 });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email not exist" });
      }
      user.name = user.name;
      user.signupEmail = user.signupEmail;
      user.district = req.body.district;
      user.pincode = req.body.pincode;
      user.place = req.body.place;
      user.password = user.password;
      user.isAdmin = user.isAdmin;
      user.date = user.date;
      await user.save();
      success = true;
      res.json({ success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

module.exports = router;
