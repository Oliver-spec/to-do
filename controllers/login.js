const jwt = require("jsonwebtoken");

function login(req, res, next) {
  try {
    const { password } = req.body;

    if (password !== "0451") {
      throw new Error("Invalid Password");
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
