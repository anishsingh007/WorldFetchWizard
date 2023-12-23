const jwt = require('jsonwebtoken');


exports.authenticate = (req, res) => {
    const { username, password } = req.body;

    // Check user credentials (replace this with your authentication logic)
    if (username === 'user' && password === 'pass') {
        const token = jwt.sign({ username }, 'acharyaPrashant', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
};