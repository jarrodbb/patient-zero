const router = require('express').Router();
const generator = require('generate-password');
//Defines password generator package
router.get('/', (req, res) => {
  try {
    const password = generator.generate({
      length: 6,
      numbers: true,
      symbols: true,
    });
    res.status(200).json(password);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

// Will generate a random password using the generate method from the package
