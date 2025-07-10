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
router.post("/pembelian", async (req, res) => {
  try {
    const { pembeli, tanggal, items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Item pembelian kosong atau tidak sesuai format" });
    }
    const hasilTransaksi = [];
    for (const item of items) {
      const { produkId, stok, kategoriId, harga } = item;
      const produk = await models.produk.findByPk(produkId);
      if (!produk || produk.stok < stok) {
        return res
          .status(400)
          .json({ message: `Stok tidak cukup untuk produk ID: ${produkId}` });
      }
      const transaksi = await models.historipembelian.create({
        pembeli,
        produkId,
        stok,
        kategoriId,
        harga,
        tanggal,
        totalHarga: stok * harga,
      });
      await produk.update({
        stok: produk.stok - stok,
      });
      hasilTransaksi.push(transaksi);
    }
    res
      .status(200)
      .json({ message: "Transaksi berhasil", data: hasilTransaksi });
  } catch (error) {}
});
module.exports = router;
