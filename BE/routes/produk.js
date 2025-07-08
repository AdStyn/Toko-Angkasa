var express = require("express");
var router = express.Router();
const models = require("../models/index");
const { Op, where } = require("sequelize");

/* GET home page. */
router.post("/addkategori", async (req, res) => {
  try {
    const kategori = await models.kategori.create({
      nama: req.body.nama,
    });
    res.json(kategori);
  } catch (error) {
    console.error(error);
  }
});
router.get("/kategori", async (req, res) => {
  try {
    const kategori = await models.kategori.findAll({
      attributes: ["nama"],
    });
    res.json(kategori);
  } catch (error) {
    console.error(error);
  }
});
router.post("/add_produk", async (req, res) => {
  try {
    const { nama, harga, hargabeli, kategori, stok, setpack, hargaGrosir } =
      req.body;
    let kategoriData = await models.kategori.findOne({
      where: { nama: kategori },
    });
    if (!kategoriData) {
      kategoriData = await models.kategori.create({ nama: kategori });
    }
    const produk = await models.produk.create({
      nama,
      harga,
      kategoriId: kategoriData.id,
      stok,
      setpack,
      hargaGrosir,
    });
    await models.pengeluaran.create({
      nama,
      stok,
      kategori: kategoriData.nama,
      tglTransaksi: new Date(),
      hargaperTransaksi: hargabeli * stok,
    });
    res.json(produk);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating produk" });
  }
});
router.post("/update_produk/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const produk = await models.produk.findByPk(id);
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    const {
      nama,
      harga,
      hargabeli,
      kategori,
      stok,
      stokbaru,
      setpack,
      hargaGrosir,
    } = req.body;
    const cekUpdate = (input, original) => {
      return input !== undefined && input !== null && input !== ""
        ? input
        : original;
    };
    let kategoriData = null;
    if (kategori) {
      kategoriData = await models.kategori.findOne({
        where: { nama: kategori },
      });
      if (!kategoriData) {
        kategoriData = await models.kategori.create({ nama: kategori });
      }
    }
    let stokBaru = produk.stok;
    if (stok !== undefined && stok !== null && stok !== "") {
      stokBaru = parseFloat(stok); // replace
    } else if (stokbaru !== undefined && stokbaru !== null && stokbaru !== "") {
      stokBaru += parseFloat(stokbaru); // add
    }
    await produk.update({
      nama: cekUpdate(nama, produk.nama),
      harga: cekUpdate(harga, produk.harga),
      kategoriId: kategoriData ? kategoriData.id : produk.kategoriId,
      stok: stokBaru,
      setpack: cekUpdate(setpack, produk.setpack),
      hargaGrosir: cekUpdate(hargaGrosir, produk.hargaGrosir),
    });
    if (stok && hargabeli) {
      await models.pengeluaran.create({
        nama: cekUpdate(nama, product.nama),
        stok: parseFloat(stok),
        kategori: kategoriData ? kategoriData.nama : produk.kategori.nama,
        tglTransaksi: new Date(),
        hargaperTransaksi: parseFloat(stok) * parseFloat(hargabeli),
      });
    }
    res.status(200).json({ data: produk });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});
router.get("/show_product", async (req, res) => {
  try {
    const produk = await models.produk.findAll({
      where: {
        [Op.or]: [{ ondelete: false }, { ondelete: null }],
      },
      include: [
        {
          model: models.kategori,
          attributes: ["nama"], // ambil hanya nama kategori
        },
      ],
      attributes: [
        "id",
        "nama",
        "stok",
        "kategoriiD",
        "harga",
        "hargaGrosir",
        "setpack",
      ],
    });
    const hasil = produk.map((item) => {
      const totalStok = parseFloat(item.stok) || 0;
      const perPack = parseFloat(item.setpack) || 1;

      const jumlahPack = Math.floor(totalStok / perPack);
      const sisa = totalStok % perPack;

      return {
        id: item.id,
        nama: item.nama,
        kategori: item.kategori?.nama || "-",
        harga: item.harga,
        hargaGrosir: item.hargaGrosir,
        setpack: item.setpack,
        stok: item.stok,
        stokAsPack: `${jumlahPack} pack${sisa > 0 ? "," + sisa + "pcs" : ""}`,
      };
    });
    res.status(200).json(hasil);
  } catch (error) {}
});

router.get("/minimum", async (req, res) => {
  try {
    const minimum = await models.produk.findAll({
      where: {
        stok: { [Op.lt]: 10 },
        [Op.or]: [{ ondelete: false }, { ondelete: null }],
      },
    });
    res.status(200).json(minimum);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
