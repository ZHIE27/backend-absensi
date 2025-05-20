const db = require('../config/database');

const User = {
    async findByNoWa(no_wa) {
      const results = await db.query('SELECT * FROM users WHERE no_wa = ?', [no_wa]);
      return results[0];
    },
  
    async findById(id) {
      const results = await db.query('SELECT id, nip, nama, email, no_wa, role FROM users WHERE id = ?', [id]);
      return results[0];
    },
  
    async getDashboardData() {
      const sql = `
        SELECT 
          (SELECT COUNT(*) FROM users WHERE role = 'guru') AS total_guru,
          (SELECT COUNT(*) FROM users WHERE role = 'staf') AS total_staf,
          (SELECT COUNT(*) FROM users WHERE role = 'kepala_sekolah') AS total_kepala_sekolah,
          (SELECT COUNT(*) FROM presensi WHERE tanggal = CURDATE()) AS total_presensi_hari_ini
      `;
      const results = await db.query(sql);
      return results[0];
    }
  };
  
  module.exports = User;