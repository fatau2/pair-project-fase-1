'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: DataTypes.STRING,
    source: DataTypes.BLOB
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};