const router = require('express').Router();
const { Doctor, Patient, MedicalCertificate } = require('../../models');

const withAuth = require('../../utils/auth');

// router.get('/', async (req, res) => {
//   try {
//     const medCertData = await MedicalCertificate.findAll({
//       attributes: { exclude: ['password'] },
//       include: [{ model: Patient }, { model: Doctor }],
//     });

//     res.status(200).json(medCertData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// Create medical certificate
router.post('/', withAuth, async (req, res) => {
  try {
    const certificateData = await MedicalCertificate.create({
      patient_id: req.session.user_id,
      doctor_id: req.body.doctor_id,
      reason: req.body.reason,
    });

    req.session.save(() => {
      // req.session.user_id = patient_id;
      req.session.logged_in = true;

      res.status(200).json(certificateData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Get all Medical Certificate

router.get('/', (req, res) => {
  MedicalCertificate.findAll({
    include: [
      {
        model: Patient,
        attributes: ['patient_id', 'name'],
      },
      {
        model: Doctor,
        attributes: ['doctor_id', 'name', 'email'],
      },
    ],
  })
    .then((medCertData) => {
      res.status(200).json(medCertData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}); // Can dynamically add reason etc

// Get 1 Medical Certificate by ID
router.get('/:id', (req, res) => {
  MedicalCertificate.findByPk(req.params.id, {
    include: [
      {
        model: Patient,
        attributes: ['patient_id', 'name'],
      },
      {
        model: Doctor,
        attributes: ['doctor_id', 'name', 'email'],
      },
    ],
  })
    .then((medCertData) => {
      if (!medCertData) {
        res.status(404).json({ message: 'Medical certificate not found' });
        return;
      }
      res.status(200).json(medCertData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
