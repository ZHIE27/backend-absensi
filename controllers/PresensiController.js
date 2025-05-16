const Presensi = require('../models/Presensi');
const qr = require('qrcode');
const moment = require('moment');

const PresensiController = {
  async createPresensi(req, res) {
    try {
      const user = req.user; 
      const now = moment(); 

      const data = {
        user_id: user.id,
        nama_user: user.nama,
        tanggal: now.format('YYYY-MM-DD'),
        hari: now.format('dddd'),
        jam_masuk: now.format('HH:mm:ss'),
        created_at: now.format('YYYY-MM-DD HH:mm:ss'),
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        distance_from_school: req.body.distance_from_school,
        location_status: req.body.location_status,
        wifi_mac_address: req.body.wifi_mac_address
      };

      const presensiId = await Presensi.create(data);
      res.status(201).json({ message: 'Presensi berhasil', presensi_id: presensiId });
    } catch (err) {
      res.status(500).json({ message: 'Gagal presensi', error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await Presensi.getAll();
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({ message: 'Gagal mengambil data presensi', error: err.message });
    }
  },

  async getQRCode(req, res) {
    const today = moment().format('YYYY-MM-DD');
    const url = `${process.env.FRONTEND_URL}/presensi/scan?date=${today}`;

    try {
      const qrCode = await qr.toDataURL(url);
      res.status(200).json({ qr: qrCode, date: today });
    } catch (err) {
      res.status(500).json({ message: 'Gagal membuat QR Code', error: err.message });
    }
  }
};

module.exports = PresensiController;
