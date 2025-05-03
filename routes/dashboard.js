const express = require('express');
const router = express.Router();
const Admission = require('../models/AdmissionEnquiry');
const Teacher = require('../models/TeacherEnquiry');

router.get('/', async (req, res) => {
  if (!req.session.adminId) return res.redirect('/login');

  const admissionData = await Admission.find();
  const teacherData = await Teacher.find();

  res.render('dashboard', { admissionData, teacherData });
});

module.exports = router;
