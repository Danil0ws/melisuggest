const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const cachios = require('cachios');
const md5 = require('md5');

module.exports = function(app) {
  this.getUrl = async (url) => {
    return await cachios.get(url);
  }
  return this;
};