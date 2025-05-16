const db = require('../config/database');

const Presensi = {
  async create(data) {
    const sql = `
      INSERT INTO presensi (
        user_id, nama_user, tanggal, hari, jam_masuk,
        created_at, latitude, longitude, distance_from_school,
        location_status, wifi_mac_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await db.query(sql, [
      data.user_id, data.nama_user, data.tanggal, data.hari, data.jam_masuk,
      data.created_at, data.latitude, data.longitude, data.distance_from_school,
      data.location_status, data.wifi_mac_address
    ]);
    return result.insertId;
  },

  async getAll() {
    const results = await db.query('SELECT * FROM presensi ORDER BY tanggal DESC');
    return results;
  }
};

module.exports = Presensi;
