const express = require('express');
const router = express.Router();

const userauthentication = require('../middleware/authMiddleware')
const countryController = require('../controllers/countryController');

router.get('/country/:countryName', userauthentication.authenticate, countryController.getCountryInfo);
router.get('/countries', countryController.getCountries);

module.exports = router;