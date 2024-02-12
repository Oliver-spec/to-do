const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(req, res, next) {
  try {
    const { password } = req.body;

    const match = await bcrypt.compare(password, process.env.PASSWORD_HASH);

    if (!match) {
      const error = new Error("Invalid Password");
      error.name = "LoginError";
      throw error;
    }

    const token = jwt.sign({ username: "oliver" }, process.env.SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .end();
  } catch (err) {
    next(err);
  }
}

module.exports = login;
