"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("produks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
      },
      produk: {
        type: Sequelize.STRING,
      },
      stok: {
        type: Sequelize.FLOAT,
      },
      kategori: {
        type: Sequelize.STRING,
      },
      ondelete: {
        type: Sequelize.BOOLEAN,
      },
      hargaGrosir: {
        type: Sequelize.FLOAT,
      },
      harga: {
        type: Sequelize.FLOAT,
      },
      setpack: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("produks");
  },
};
