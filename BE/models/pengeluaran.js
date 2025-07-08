"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pengeluaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pengeluaran.init(
    {
      nama: DataTypes.STRING,
      stok: DataTypes.FLOAT,
      kategori: DataTypes.STRING,
      tglTransaksi: DataTypes.DATE,
      hargaperTransaksi: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "pengeluaran",
    }
  );
  return pengeluaran;
};
