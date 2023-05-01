const express = require("express");
const { BikeModel, validateBike } = require("../models/bikeModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const perPage = 5;
    const page = req.query.page - 1 || 0;
    const data = await BikeModel.find({})
      .limit(perPage)
      .skip(perPage * page);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
});

router.get("/single/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const itemID = await BikeModel.findOne({_id:id},req.body);
      res.json(itemID);
    } 
    catch (error) {
      console.log(error);
      res.status(401).json({ error });
    }
  });

router.post("/",auth, async (req, res) => {
  const validBody = validateBike(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const bike = new BikeModel(req.body);
    await bike.save();
    res.status(201).json(bike);
  } catch (error) {
    console.log(error);
    res.status(502).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const validBody = validateBike(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const id = req.params.id;
    const data = await BikeModel.updateOne({_id:id},req.body);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(502).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const data = await BikeModel.deleteOne({_id: id});
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(502).json({ error });
    }
  });

module.exports = router;
