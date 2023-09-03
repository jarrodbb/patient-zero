const router = require('express').Router();

//Import Models
const { Doctor, Patient, MedicalCertificate } = require('../../models');

const withAuth = require('../../utils/auth');

// Create medical certificate
router.post('/', withAuth, async (req, res) => {
  try {
    const certificateData = await MedicalCertificate.create({
      patient_id: req.session.user_id,
      doctor_id: req.body.doctor_id,
      reason: req.body.reason,
    });

    req.session.save(() => {
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
});

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

// Update one cert by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const medCertData = await MedicalCertificate.update(
      {
        approved: req.body.approved,
      },
      {
        where: {
          certificate_id: req.params.id,
        },
      }
    );

    if (!medCertData[0]) {
      res.status(404).json({ message: 'No Certificate with this id' });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;

      res.json({ message: 'updated!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete one cert by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const medCertData = await MedicalCertificate.destroy({
      where: {
        certificate_id: req.params.id,
      },
    });

    if (!medCertData) {
      res.status(404).json({ message: 'No cert found with this id!' });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;

      res.json({ message: 'deleted!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
