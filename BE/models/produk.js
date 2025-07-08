"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      produk.belongsTo(models.kategori, { foreignKey: "kategoriId" });
    }
  }
  produk.init(
    {
      nama: DataTypes.STRING,
      stok: DataTypes.FLOAT,
      kategoriId: DataTypes.INTEGER,
      harga: DataTypes.FLOAT,
      hargaGrosir: DataTypes.FLOAT,
      ondelete: DataTypes.BOOLEAN,
      setpack: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "produk",
    }
  );
  return produk;
};
