const axios = require("axios");
exports.getCountryInfo = async (req, res) => {
  const countryName = req.params.countryName;
  console.log(countryName);
  try {
    // Making a GET request to the REST Countries API
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    console.log(response.data);
    const countryData = response.data[0]; // Assuming the response is an array, adjust as needed

    res.json(countryData);
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ error: "Failed to fetch country information" });
  }
};

// Function to retrieve a list of all countries' names based on filters, sorting, and pagination
exports.getCountries = async (req, res) => {
  const { population, area, language, sort, page, pageSize } = req.query;

  try {
    // Making a GET request to the REST Countries API to get a list of countries
    const response = await axios.get(`https://restcountries.com/v3.1/all`);
    let countries = response.data;
    // console.log(countries)
    // Apply conditions
    if (population) {
      countries = countries.filter(
        (country) => country.population >= parseInt(population)
      );
    }

    if (area) {
      countries = countries.filter((country) => country.area >= parseInt(area));
    }

    if (language) {
      // countries = countries.filter(country => country.languages.includes(language))
      //    console.log(countries)
      // console.log('English'===language)
      let a = language.toString();
      countries = countries.filter(
        (country) =>
          country.languages && Object.values(country.languages).includes(a)
      );
      // console.log(countries)
    }

    // Apply sorting
    if (sort === "asc") {
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sort === "desc") {
      countries.sort((a, b) => b.name.common.localeCompare(a.name.common));
    }

    // Extracting country names
    const countryNames = countries.map((country) => country.name.common);
    //  console.log(countryNames)
    // Applying pagination
    const startIndex = (page - 1) * pageSize; //offset
    const endIndex = startIndex + parseInt(pageSize);
    const paginatedCountryNames = countryNames.slice(startIndex, endIndex);
    // console.log("Start Index:", startIndex);
    // console.log("End Index:", endIndex);

    // console.log(paginatedCountryNames)
    res.json(paginatedCountryNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch country data" });
  }
};
