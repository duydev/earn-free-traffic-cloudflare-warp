const _ = require('lodash');

module.exports.genString = length => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  return Array(length)
    .fill()
    .map(() => _.sample(characters))
    .join('');
};

module.exports.sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
