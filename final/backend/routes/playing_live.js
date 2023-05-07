const Playing = require('../models/Playing');
const User = require('../models/User');
const express = require('express');
const router = express.Router();


router.post('/savemessage', async (req, res) => {
       console.log("123");
       try {
              let user1 = await User.findOne({ signupEmail: req.body.send_id });
              let sender_name = user1.name;
              let user2 = await User.findOne({ signupEmail: req.body.reci_id });
              let reciever_name = user2.name;
              let result1 = await Playing.findOne({ userId: req.body.send_id });
              let result2 = await Playing.findOne({ userId: req.body.reci_id });
              console.log(result2, "result2");
              if (result2.recieve_notification.length != 0) {
                     res.status(200).json({ message: "error" });
              }
              else {
                     result1.send_notification.push({ friend_id: req.body.reci_id, name: sender_name, message: req.body.message, playing_date: req.body.playing_date });
                     await result1.save();
                     console.log(sender_name, reciever_name, "result1");
                     //  let result2 = await Playing.findOne({ userId: req.body.reci_id });
                     result2.recieve_notification.push({ friend_id: req.body.send_id, name: reciever_name, message: req.body.message, playing_date: req.body.playing_date });
                     await result2.save();
                     res.status(200).json({ message: "success" });
              }
              //  console.log(req.body.send_id,result1,"result1");
       }
       catch (error) {
              console.error(error.message);
              res.status(500).send("internal server Error occured");
       }
})

router.post('/fetchsendnotification', async (req, res) => {
       try {
              let user = await Playing.find({ userId: req.body.id });
              let pending_friends_noti = user[0].recieve_notification;

              res.status(200).json(pending_friends_noti);
       }
       catch (error) {
              console.error(error.message);
              res.status(500).send("internal server Error occured");
       }
})

router.post('/fetchaccept_reci_notification', async (req, res) => {
       try {
              let user = await Playing.find({ userId: req.body.id });
              let accept_friends_noti = user[0].accepted_recieve_notification;

              res.status(200).json(accept_friends_noti);
       }
       catch (error) {
              console.error(error.message);
              res.status(500).send("internal server Error occured");
       }
})
router.post('/fetchsendnotificationme', async (req, res) => {
       try {
              let user = await Playing.find({ userId: req.body.id });
              let pending_friends_noti = user[0].send_notification;

              res.status(200).json(pending_friends_noti);
       }
       catch (error) {
              console.error(error.message);
              res.status(500).send("internal server Error occured");
       }
})

router.post('/fetchaccept_reci_notificationme', async (req, res) => {
       try {
              let user = await Playing.find({ userId: req.body.id });
              let accept_friends_noti = user[0].accepted_send_notification;

              res.status(200).json(accept_friends_noti);
       }
       catch (error) {
              console.error(error.message);
              res.status(500).send("internal server Error occured");
       }
})

router.post('/acceptpendsendnotification', async (req, res) => {
       console.log(req.body.send_id, req.body.reci_id, "req.body.reci_id")
       try {
              let user1 = await User.findOne({ signupEmail: req.body.send_id });
              let sender_name = user1.name;
              let user2 = await User.findOne({ signupEmail: req.body.reci_id });
              let reciever_name = user2.name;
              console.log(sender_name, reciever_name, "pd1");
              let result1 = await Playing.findOne({ userId: req.body.reci_id });
              let people1 = result1.recieve_notification;
              let mess_obj = {};
              for (let i = 0; i < people1.length; i++) {
                     if (people1[i]._id = req.body.mess_id) {
                            mess_obj = people1[i];
                            break;
                     }
              }
              let m1 = mess_obj.message;
              let pd1 = mess_obj.playing_date;
              // console.log(mess_obj,m1,pd1,"pd1");
              let filteredPeople1 = people1.filter((item) => item.friend_id !== req.body.send_id);
              result1.recieve_notification = filteredPeople1;
              result1.accepted_recieve_notification.push({ friend_id: req.body.send_id, name: sender_name, message: m1, playing_date: pd1 });
              await result1.save();
              let result2 = await Playing.findOne({ userId: req.body.send_id });
              let people2 = result1.send_notification;
              let filteredPeople2 = people2.filter((item) => item.friend_id !== req.body.reci_id);
              result2.send_notification = filteredPeople2;
              result2.accepted_send_notification.push({ friend_id: req.body.send_id, name: reciever_name, message: m1, playing_date: pd1 });
              await result2.save();

              res.status(200).json({ message: "success" });
       }
       catch (error) {
              console.error(error.message);
              res.status(500).send({ message: "internal server Error occured" });
       }
})

router.post('/deletesendnotification', async (req, res) => {
       console.log(req.body.send_id, req.body.reci_id, "req.body.reci_id")
       try {
              let result1 = await Playing.findOne({ userId: req.body.reci_id });
              let people1 = result1.accepted_recieve_notification;
              let filteredPeople1 = people1.filter((item) => item.friend_id !== req.body.send_id);
              result1.accepted_recieve_notification = filteredPeople1;
              await result1.save();

              let result2 = await Playing.findOne({ userId: req.body.send_id });
              let people2 = result1.accepted_send_notification;
              let filteredPeople2 = people2.filter((item) => item.friend_id !== req.body.reci_id);
              result2.accepted_send_notification = filteredPeople2;
              await result2.save();

              res.status(200).json({ message: "success" });
       }
       catch (error) {
              console.error(error.message);
              res.status(500).send({ message: "internal server Error occured" });
       }
})

module.exports = router