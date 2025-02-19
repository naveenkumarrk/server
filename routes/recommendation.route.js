const express = require('express');
const router = express.Router()
const {getRecommendations} = require("../controllers/recommendation.controller.js")


router.post('/', getRecommendations);

module.exports = router