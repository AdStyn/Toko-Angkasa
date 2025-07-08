var express = require("express");
var router = express.Router();
const models = require("../models/index");
const { Op } = require("sequelize");

router.get("/pengeluaran", async (req, res) => {
  try {
    let { bulan, tahun } = req.query;
    const now = new Date();
    bulan = bulan ? parseInt(bulan) - 1 : now.getMonth();
    tahun = tahun ? parseInt(tahun) : now.getFullYear();
    const awalBulan = new Date(tahun, bulan, 1);
    const akhirBulan = new Date(tahun, bulan + 1, 0, 23, 59, 59);
    const dataPengeluaran = await models.pengeluaran.findAll({
      where: {
        tglTransaksi: {
          [Op.between]: [awalBulan, akhirBulan],
        },
      },
      order: [["tglTransaksi", "DESC"]],
    });
    res.status(200).json({
      bulan: bulan + 1,
      tahun: tahun,
      total: dataPengeluaran.length,
      data: dataPengeluaran,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data pengeluaran" });
  }
});
router.post("/transaksi", async (req, res) => {
  try {
    const { pembeli, stok, kategoriid, harga, produk, tanggal } = req.body;
    const pembayaran = await models.historipembelian.create({
      pembeli,
      stok,
      kategoriid,
      harga,
      produk,
      tanggal,
    });
    res.json(pembayaran);
  } catch (error) {}
});
module.exports = router;
