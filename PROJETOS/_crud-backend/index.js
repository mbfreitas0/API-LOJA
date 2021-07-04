//import {useHistory} from "reac-router-dom"

const express = require("express");
const app = express();
const db = require("./src/model/database");
const { Users } = require("./src/model/Users");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./src/JWT");

app.use(express.json());
app.use(cookieParser());

//    * * *  REGISTER APP  * * *     //
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    })
      .then(() => {
        res.json("USER REGISTERED");
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
});
//    * * *  LOGIN APP  * * *     //
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.status(400).json({ error: "User Doesn't Exist" });

  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res
        .status(400)
        .json({ error: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });

      res.json("LOGGED IN");
    }
  });
});

app.get("/profile", validateToken, (req, res) => {
  res.json("profile");
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("SERVER RUNNING ON PORT 3001");
  });
});
