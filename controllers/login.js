var user = require("../model/user");

const login = (req, res) => {
    try {
        if (req.body && req.body.username && req.body.password) {
            user.find({ username: req.body.username }, (err, data) => {
                if (data.length > 0) {

                    if (bcrypt.compareSync(data[0].password, req.body.password)) {
                        checkUserAndGenerateToken(data[0], req, res);
                    } else {

                        res.status(400).json({
                            errorMessage: 'Username or password is incorrect!',
                            status: false
                        });
                    }

                } else {
                    res.status(400).json({
                        errorMessage: 'Username or password is incorrect!',
                        status: false
                    });
                }
            })
        } else {
            res.status(400).json({
                errorMessage: 'Add proper parameter first!',
                status: false
            });
        }
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        });
    }

}

module.exports.login = login