"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hisoripembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hisoripembelian.belongsTo(models.kategori, { foreignKey: "kategoriId" });
    }
  }
  hisoripembelian.init(
    {
      pembeli: DataTypes.STRING,
      tanggal: DataTypes.DATE,
      product: DataTypes.STRING,
      kategoriid: DataTypes.INTEGER,
      stok: DataTypes.FLOAT,
      harga: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "hisoripembelian",
    }
  );
  return hisoripembelian;
};
