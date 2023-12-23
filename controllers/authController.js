const jwt = require('jsonwebtoken');


exports.authenticate = (req, res) => {
   // console.log(req)
    const { username, password } = req.body;

    // Check user credentials hardcoded here
    if (username === 'username' && password === 'password') {
        const token = jwt.sign({ username }, 'acharyaPrashant', { expiresIn: '1h' });
        console.log('token generated')
        res.json({ token });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
};