const {user, sequelize} = require("../db/sequelize/sequelize");
const bcrypt = require("bcrypt");

const register = async (req, res) => {

    try {
        const rawPassword = req.body.password;

        // hash le password
        const hashedPassword = bcrypt.hash(rawPassword, process.env.PASSWORD_SALT);

        const newuser = await user.create({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            phone_number: req.body.phone_number,
            authorization: 'user'
        });

        res.send(204);

    } catch (error) {
        console.log(error);
        res.send(500);
    }

}

const login = async (req, res) => {
    try {
        // cherche l'utilisateur
        const founduser = user.findAll({
            where: {
                email: req.body.email
            }
        });
        
        if (founduser === null) {
            throw new Error("email invalid");
        }

        // compare les hash
        bcrypt.compare(req.body.password, founduser.password)
        .then(response => {
            if (!response) {
                // invalid password
                res.send(400); // edit me
            } else {
                res.status(200).json({
                    userId: founduser.id,
                    token: jwt.sign(
                        { userId: founduser.id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '24h' }
                    )
                });
            }
        });

    } catch (error) {
        res.send(500);
        console.log(error);
    }
}


module.exports = {
    login,
    register
};