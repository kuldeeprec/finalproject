const Person = require("../models/Person");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

router.post("/confirmfriend", async (req, res) => {
  console.log(req.body.reciever_id, req.body.sender_id, "123");
  try {
    let user1 = await User.findOne({ signupEmail: req.body.sender_id });
    let sender_name = user1.name;
    let user2 = await User.findOne({ signupEmail: req.body.reciever_id });
    let reciever_name = user2.name;

    let result1 = await Person.findOne({ userId: req.body.reciever_id });
    let result2 = await Person.findOne({ userId: req.body.sender_id });

    let image1 = "1681194853026_Screenshot (18).png";
    let image2 = "1681194853026_Screenshot (18).png";

    if (result1.profile_img[0]?.image_profile) {
      image1 = result1.profile_img[0].image_profile;
    }
    if (result2.profile_img[0]?.image_profile) {
      image2 = result2.profile_img[0].image_profile;
    }

    let people1 = result1.pending_friends_reciever;
    let filteredPeople1 = people1.filter(
      (item) => item.friend_id !== req.body.sender_id
    );
    result1.pending_friends_reciever = filteredPeople1;
    result1.friends.push({
      friend_id: req.body.sender_id,
      name: sender_name,
      profile_img: image2,
    });
    await result1.save();

    let people2 = result2.pending_friends_sender;
    let filteredPeople2 = people2.filter(
      (item) => item.friend_id !== req.body.reciever_id
    );
    result2.pending_friends_sender = filteredPeople2;
    result2.friends.push({
      friend_id: req.body.reciever_id,
      name: reciever_name,
      profile_img: image1,
    });
    await result2.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
});
router.post("/pendingfriend", async (req, res) => {
  try {
    let user1 = await User.findOne({ signupEmail: req.body.sender_id });
    console.log(user1, "user1");
    let sender_name = user1.name;
    let user2 = await User.findOne({ signupEmail: req.body.reciver_id });
    console.log(user2, "user2");
    let reciever_name = user2.name;

    let result1 = await Person.findOne({ userId: req.body.sender_id });
    let result2 = await Person.findOne({ userId: req.body.reciver_id });

    let image1 = "1681194853026_Screenshot (18).png";
    let image2 = "1681194853026_Screenshot (18).png";

    if (result1.profile_img[0]?.image_profile) {
      image1 = result1.profile_img[0].image_profile;
    }
    if (result2.profile_img[0]?.image_profile) {
      image2 = result2.profile_img[0].image_profile;
    }

    result1.pending_friends_sender.push({
      friend_id: req.body.reciver_id,
      name: reciever_name,
      profile_img: image1,
    });
    await result1.save();
    result2.pending_friends_reciever.push({
      friend_id: req.body.sender_id,
      name: sender_name,
      profile_img: image2,
    });
    await result2.save();
    res.status(200).json("success");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
});
router.post("/fetchpendingfriend", async (req, res) => {
  try {
    let user = await Person.find({ userId: req.body.id });

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
});
router.post("/fetchconfirmfriend", async (req, res) => {
  try {
    let user = await Person.find({ userId: req.body.id });

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
});
router.post("/fetchfriend", async (req, res) => {
  try {
    let user = await Person.find({ userId: req.body.id });
    let alluser = await User.find({});

    let newfriend = [];
    alluser.forEach((element) => {
      user[0].friends.forEach((friend) => {
        if (element.signupEmail === friend.friend_id) {
          friend._id = element._id;
          newfriend.push(friend);
        }
      });
    });

    res.status(200).json(newfriend);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
});

router.post("/deletependfriend", async (req, res) => {
  console.log(req.body.send_id, req.body.reci_id, "req.body.reci_id");
  try {
    let result1 = await Person.findOne({ userId: req.body.send_id });
    let people1 = result1.pending_friends_sender;
    console.log(result1, people1, "people1");
    let filteredPeople1 = people1.filter(
      (item) => item.friend_id !== req.body.reci_id
    );
    console.log(filteredPeople1, "filteredPeople1");
    result1.pending_friends_sender = filteredPeople1;
    await result1.save();

    let result2 = await Person.findOne({ userId: req.body.reci_id });
    let people2 = result2.pending_friends_reciever;
    console.log(result2, people2, "people2");
    let filteredPeople2 = people2.filter(
      (item) => item.friend_id !== req.body.send_id
    );
    result2.pending_friends_reciever = filteredPeople2;
    await result2.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "internal server Error occured" });
  }
});

router.post("/deletependfriendme", async (req, res) => {
  console.log(req.body.send_id, req.body.reci_id, "req.body.reci_id");
  try {
    let result1 = await Person.findOne({ userId: req.body.send_id });
    let people1 = result1.pending_friends_reciever;
    let filteredPeople1 = people1.filter(
      (item) => item.friend_id !== req.body.reci_id
    );
    result1.pending_friends_reciever = filteredPeople1;
    await result1.save();

    let result2 = await Person.findOne({ userId: req.body.reci_id });
    let people2 = result2.pending_friends_sender;
    let filteredPeople2 = people2.filter(
      (item) => item.friend_id !== req.body.send_id
    );
    result2.pending_friends_sender = filteredPeople2;
    await result2.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "internal server Error occured" });
  }
});

router.post("/deleteconfirmfriend", async (req, res) => {
  console.log(req.body.send_id, req.body.reci_id, "req.body.reci_id");
  try {
    let result1 = await Person.findOne({ userId: req.body.send_id });
    let people1 = result1.friends;
    let filteredPeople1 = people1.filter(
      (item) => item.friend_id !== req.body.reci_id
    );
    result1.friends = filteredPeople1;
    await result1.save();

    let result2 = await Person.findOne({ userId: req.body.reci_id });
    let people2 = result2.friends;
    let filteredPeople2 = people2.filter(
      (item) => item.friend_id !== req.body.send_id
    );
    result2.friends = filteredPeople2;
    await result2.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "internal server Error occured" });
  }
});
module.exports = router;
