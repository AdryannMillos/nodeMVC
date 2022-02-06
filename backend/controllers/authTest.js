const express = require('express');

const router = express.Router();

const test = async (req, res) => {
    res.json('hey ho ');
  };

  module.exports = {
      test,
  }