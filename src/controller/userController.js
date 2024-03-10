const { user, sequelize } = require("../db/sequelize/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  deleteUser,
  updateUser,
  selectUserByToken,
  updateUserToken,
} = require("../db/crud/userCrud");
const register = async (req, res) => {
  console.log(req.body);

  try {
    const rawPassword = req.body.password;
    const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT));

    // hash le password
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const newuser = await user.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      phone_number: req.body.phone_number,
      authorization: "user",
    });

    res.send(204);
  } catch (error) {
    console.log(error);
    res.send(404);
  }
};

const login = async (req, res) => {
  try {
    // cherche l'utilisateur
    const foundUsers = await user.findAll({
      where: {
        email: req.body.email,
      },
    });

    if (foundUsers.length === 0) {
      throw new Error("Email invalide");
    }

    const foundUser = foundUsers[0];

    // compare les hash
    const match = await bcrypt.compare(req.body.password, foundUser.password);

    if (!match) {
      // Mot de passe invalide
      res.sendStatus(400);
    } else {
      // Mot de passe valide

      function generateJWTToken(userId) {
        const token = jwt.sign({}, process.env.TOKEN_SECRET, {
          expiresIn: "10m",
        });
        return token;
      }

      const token = generateJWTToken(foundUser.id);

      updateUser(user, foundUser.id, { token });

      res.status(200).json({
        // userId: foundUser.id,
        token,
      });
    }
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

const infoUser = async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const foundUser = await selectUserByToken(user, token);
  res.status(200).json({
    foundUser,
  });
};

const verifyTokenMiddleware = (req, res, next) => {
  if (verifyToken(req, res).valid) {
    next();
  }
};

const verifyToken = (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const foundUser = selectUserByToken(user, token);

  if (token) {
    try {
      // Vérifier si le token est expiré
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const currentTimestamp = Math.floor(Date.now() / 1000); // Obtenez le timestamp actuel en secondes
      if (decodedToken.exp < currentTimestamp) {
        return res.status(401).json({ foundUser: false });
      }
      return { valid: true };
    } catch (error) {
      // Gérer les erreurs de vérification du token (par exemple, token invalide)
      console.error("Erreur lors de la vérification du token:", error);
      updateUserToken(user, token.email, { token: null });
      return res.json({
        message: "Token invalide",
        foundUser: false,
        valid: true,
      });
    }
  } else {
    // Si aucun token n'est fourni dans les en-têtes de la requête
    return res.json({ message: "Token manquant", foundUser: false });
  }
};

const removeToken = (req, res) => {
  const token = req.params.token;
  console.log("Le token est" + token);
  updateUserToken(user, token, { token: null });
};

module.exports = {
  login,
  register,
  infoUser,
  verifyTokenMiddleware,
  removeToken,
  verifyToken,
};
