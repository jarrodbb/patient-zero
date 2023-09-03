//  Create and export routes

const router = require('express').Router();
const patientRoutes = require('./patientRoutes');
const doctorRoutes = require('./doctorRoutes');
const medicalCert = require('./medCert');
const generator = require('./generator');

router.use('/patient', patientRoutes);
router.use('/doctor', doctorRoutes);
router.use('/medcert', medicalCert);
router.use('/generator', generator);

module.exports = router;
