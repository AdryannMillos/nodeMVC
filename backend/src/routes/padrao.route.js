const express = require('express');
const router = express.Router();
const controller = require("../controllers/padrao.controller.js");

router.get('/', controller.get);

module.exports = router;