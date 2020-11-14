const router = require("express").Router();
const Exercise = require("../models/exercise");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const { username, description, duration } = req.body;
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  const exerciseId = req.params.id;
  Exercise.findById(exerciseId)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  const exerciseId = req.params.id;
  Exercise.findByIdAndDelete(exerciseId)
    .then(() => res.json("Exercise deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  const exerciseId = req.params.id;
  const { username, description, duration, date } = req.body;
  Exercise.findById(req.params.id)
    .then((exercise) => {
      (exercise.username = username),
        (exercise.duration = duration),
        (exercise.description = description),
        (exercise.date = Date.parse(date));

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
