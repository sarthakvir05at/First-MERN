const router = require("express").Router();
let Exercise = require("../models/exercise");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, description, duration, date });
  newExercise
    .save()
    .then(() => res.send("Exercise Added Successfully"))
    .catch((err) => res.status(400).json(err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findOneAndDelete({
    _id: req.params.id,
  })
    .then((doc) => res.json(doc))
    .catch((err) => console.log(err));
});

router.route("/edit/:id").post((req, res) => {
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  Exercise.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        description,
        duration,
        date,
      },
    },
    { upsert: false }
  )
    .then((doc) => res.json(doc))
    .catch((err) => console.log(err));
});

module.exports = router;
