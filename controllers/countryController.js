const axios = require('axios');
exports.getCountryInfo = (req, res) => {
    const countryName = req.params.countryName;
    console.log('countryName', countryName)
};

exports.getCountries = (req, res) => {
   
};