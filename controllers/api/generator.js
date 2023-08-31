const router = require('express').Router();
const generator = require('generate-password');

router.get('/', (req, res) => {
  try {
    const password = generator.generate({
      length: 4,
      numbers: true,
      symbols: true,
    });
    res.status(200).json(password);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
