const db = require('../config/database');

const Perizinan = {
    async getAll() {
        const rows = await db.query(`
            SELECT p.*, u.nama AS nama_guru, u.nip
            FROM perizinan p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC 
        `);
        return rows;
    },
    async getByUserId(user_id) {
        const rows = await db.query(
          `SELECT * FROM perizinan WHERE user_id = ? ORDER BY tanggal DESC`,
          [user_id]
        );
        return rows;
      },
    
      async create(data) {
        const {
          user_id,
          tanggal,
          jenis,
          keterangan = null,
          bukti_sakit = null,
        } = data;
    
        const result = await db.query(
          `INSERT INTO perizinan (user_id, tanggal, jenis, keterangan, bukti_sakit)
           VALUES (?, ?, ?, ?, ?)`,
          [user_id, tanggal, jenis, keterangan, bukti_sakit]
        );
    
        return result.insertId;
      },
    async updateStatus(id, status_approval) {
        const result = await db.query(
          `UPDATE perizinan SET status_approval = ? WHERE id = ?`,
          [status_approval, id]
        );
        return result.affectedRows;
      },
}

module.exports = Perizinan;