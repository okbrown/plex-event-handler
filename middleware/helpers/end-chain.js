'use strict';

const endChain = () => {
  return (req, res) => {
    res.status(200);
  };
};

module.exports = endChain;