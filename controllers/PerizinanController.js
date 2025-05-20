const Perizinan = require('../models/Perizinan');

const PerizinanController = {
    async getAll(req, res) {
        try {
          const izinList = await Perizinan.getAll();
          res.status(200).json(izinList);
        } catch (err) {
          res.status(500).json({ message: 'Gagal mengambil data perizinan' });
        }
    },
    async getByUserId(req, res) {
        try {
          const userId = req.user.id;
          const data = await Perizinan.getByUserId(userId);
          res.status(200).json(data);
        } catch (error) {
          res.status(500).json({ message: 'Gagal mengambil data perizinan user', error: error.message });
        }
    },
    async create(req, res) {
        try {
          const data = {
            ...req.body,
            user_id: req.user.id
          };
          const insertedId = await Perizinan.create(data);
          res.status(201).json({ message: 'Perizinan berhasil dibuat', id: insertedId });
        } catch (error) {
          res.status(500).json({ message: 'Gagal membuat perizinan', error: error.message });
        }
    },
    async approve(req, res) {
        const { id } = req.params;
        const { status } = req.body;
    
        if (!['disetujui', 'ditolak'].includes(status)) {
            return res.status(400).json({ message: 'Status tidak valid' });
          }
        
          try {
            const affectedRows = await Perizinan.updateStatus(id, status);
            
            if (affectedRows === 0) {
              return res.status(404).json({ message: 'Perizinan tidak ditemukan' });
            }
        
            res.status(200).json({ message: `Perizinan berhasil di${status}` });
          } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Gagal memperbarui status perizinan' });
          }
    }
}

module.exports = PerizinanController;