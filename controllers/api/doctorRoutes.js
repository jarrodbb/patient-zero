const router = require('express').Router();
const { Doctor, Patient } = require('../../models');

// const withAuth = require('../../utils/auth');

// Get all doctors and patients
router.get('/', async (req, res) => {
  try {
    const doctorData = await Doctor.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Patient }],
    });

    res.status(200).json(doctorData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create user - Not sure we are going to bother with this
router.post('/', async (req, res) => {
  try {
    const doctorData = await Doctor.create(req.body);

    req.session.save(() => {
      req.session.user_id = doctorData.id;
      req.session.logged_in = true;

      res.status(200).json(doctorData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Doctor login - checks password
router.post('/login', async (req, res) => {
  try {
    const doctorData = await Doctor.findOne({
      where: { email: req.body.email },
    });

    if (!doctorData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await doctorData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: doctorData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post request - approve doctors note
//

module.exports = router;
