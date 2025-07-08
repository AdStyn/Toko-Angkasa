'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hisoripembelians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pembeli: {
        type: Sequelize.STRING
      },
      tanggal: {
        type: Sequelize.DATE
      },
      product: {
        type: Sequelize.STRING
      },
      kategoriid: {
        type: Sequelize.INTEGER
      },
      stok: {
        type: Sequelize.FLOAT
      },
      harga: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hisoripembelians');
  }
};