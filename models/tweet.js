'use strict';
module.exports = function(sequelize, DataTypes) {
  var tweet = sequelize.define('tweet', {
    tweet: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tweet;
};