const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const PresensiController = require('../controllers/PresensiController');
const NotifikasiController = require('../controllers/NotifikasiController');
const LoginController = require('../controllers/LoginController');
const PerizinanController = require('../controllers/PerizinanController');

//login router
router.post('/login', LoginController.login);

//presensi router
router.post('/presensi', authenticate, PresensiController.createPresensi);
router.get('/presensi', authenticate, PresensiController.getAll);
router.get('/presensi/qrcode', authenticate, authorize('admin'), PresensiController.getQRCode);

router.get('/notifikasi', authenticate, NotifikasiController.getByUserId);
router.get('/notifikasi', authenticate, NotifikasiController.send);

router.post('/perizinan', authenticate, authorize('guru', 'staf'), PerizinanController.create);
router.get('/perizinan/me', authenticate, authorize('guru', 'staf'), PerizinanController.getByUserId);
router.get('/perizinan', authenticate, authorize('kepala_sekolah'), PerizinanController.getAll);
router.put('/perizinan/:id/approve', authenticate, authorize('kepala_sekolah'), PerizinanController.approve);

module.exports = router; 