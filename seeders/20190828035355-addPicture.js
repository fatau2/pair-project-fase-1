'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [{
      name:'promo',
      source: fs.readFileSync('promo.png'),
      createdAt: new Date(),
      updatedAt: new Date()
    }],{})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
      
    return queryInterface.bulkDelete('Images',{where:{name:'promo'}})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
