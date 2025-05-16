const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const PresensiController = require('../controllers/PresensiController');
const NotifikasiController = require('../controllers/NotifikasiController');
const LoginController = require('../controllers/LoginController');
//login router
router.post('/login', LoginController.login);

//presensi router
router.post('/presensi', authenticate, PresensiController.createPresensi);
router.get('/presensi', authenticate, PresensiController.getAll);
router.get('/presensi/qrcode', authenticate, authorize('admin'), PresensiController.getQRCode);

router.get('/notifikasi', authenticate, NotifikasiController.getByUserId);
router.get('/notifikasi', authenticate, NotifikasiController.send);

module.exports = router; 