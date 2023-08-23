const router = require("express").Router();
const { Doctor, Patient, MedicalCertificate } = require("../models");

const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  try {
    const patientData = await Patient.create(req.body);

    req.session.save(() => {
      req.session.user_id = patientData.id;
      req.session.logged_in = true;

      res.status(200).json(patientData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const patientData = await Patient.findOne({
      where: { email: req.body.email },
    });

    if (!patientData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await patientData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = patientData.id;
      req.session.logged_in = true;

      res.json({ user: patientData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//update profile
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateStatus = await Patient.update(
      {
        date_of_birth: req.body.date_of_birth,
        age: req.body.age,
        requires_certificate: req.body.requires_certificate,
        allergies: req.body.allergies,
        diabetes: req.body.diabetes,
        heart_disease: req.body.heart_disease,
        high_blood_pressure: req.body.high_blood_pressure,
        kidney_or_liver_disease: req.body.kidney_or_liver_disease,
        medication_list: req.body.medication_list,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updateStatus[0]) {
      res.status(404).json({ message: "No category with this id" });
    }

    req.session.save(() => {
      req.session.user_id = patientData.id;
      req.session.logged_in = true;

      res.json({ message: "updated!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
