const router = require("express").Router();
const patientRoutes = require("./patientRoutes");
const doctorRoutes = require("./doctorRoutes");
const medicalCert = require("./medCert");

router.use("/patient", patientRoutes);
router.use("/doctor", doctorRoutes);
router.use("/medcert", medicalCert);

module.exports = router;
