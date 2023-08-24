const router = require("express").Router();
const patientRoutes = require("./patientRoutes");
const doctorRoutes = require("./doctorRoutes");

router.use("/patient", patientRoutes);
router.use("/doctor", doctorRoutes);

module.exports = router;
