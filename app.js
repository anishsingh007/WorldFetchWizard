const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const countryRoutes = require('./routes/countryRoutes')
const app = express();

app.use('/api', authRoutes); 
app.use('/api', countryRoutes); 

// Error handling for invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

// Error handling for general errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})