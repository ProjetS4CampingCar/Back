const { user } = require("../db/sequelize/sequelize");
const jwt = require("jsonwebtoken");
const { selectUserByToken, updateUserToken } = require("../db/crud/userCrud");

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
        return res.json({ foundUser: false });
      }
      return { valid: true };
    } catch (error) {
      // Gérer les erreurs de vérification du token (par exemple, token invalide)
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

module.exports = { verifyTokenMiddleware, verifyToken };
