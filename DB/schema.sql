-- DROP DATABASE
DROP DATABASE IF EXISTS patient_db;

-- CREATE DATABASE
CREATE DATABASE patient_db;

-- -- USE DATABASE
-- USE patient_db;

-- -- DROP TABLES IF THEY EXIST
-- DROP TABLE IF EXISTS medical_certificate;
-- DROP TABLE IF EXISTS patient;
-- DROP TABLE IF EXISTS doctor;

-- -- CREATE DOCTOR TABLE
-- CREATE TABLE doctor (
--   doctor_id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
-- );

-- -- CREATE PATIENT TABLE
-- CREATE TABLE patient (
--   patient_id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   date_of_birth DATE,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   requires_certificate BOOLEAN DEFAULT false,
--   allergies VARCHAR(255),
--   diabetes BOOLEAN DEFAULT false,
--   heart_disease BOOLEAN DEFAULT false,
--   high_blood_pressure BOOLEAN DEFAULT false,
--   kidney_or_liver_disease BOOLEAN DEFAULT false,
--   medication_list VARCHAR(255),
--   doctor_id INT,
--   FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id)
-- );

-- -- CREATE MEDICAL CERTIFICATE TABLE
-- CREATE TABLE medical_certificate (
--   certificate_id INT AUTO_INCREMENT PRIMARY KEY,
--   reason VARCHAR(255),
--   patient_id INT NOT NULL,
--   doctor_id INT NOT NULL,
--   is_approved BOOLEAN DEFAULT false,
--   FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
--   FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id)
-- );
