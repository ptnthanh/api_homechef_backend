const express = require("express");
const Category = require("../models/dbHelpers");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");
const moment = require("moment");

const router = express.Router();

// for all endpoints beginning with /api/users
router.post("/register", (req, res) => {
  const credentials = req.body;
  const { username, password, email } = credentials;

  if (!(username && password && email)) {

    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }
    else if (!password) {
      return res.status(400).json({ message: "Password required" });
    }
    else if (!email) {
      return res.status(400).json({ message: "Email required" });
    }
  }

  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;
  
  credentials["created_at"] = moment(new Date());
  credentials["updated_at"] = moment(new Date());

  Category.addUser(credentials)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      if (error.errno == 19) {
        res.status(400).json({ message: "Username already taken" });
      } else {
        res.status(500).json(error);
      }
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!(username && password)) {
  
    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }
    else if (!password) {
      return res.status(400).json({ message: "Password required" });
    }
  }

  Category.findUserByUsername(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        
        res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({ message: "You can check out anytime you like, but you can never leave."});
            } else {
                res.status(200).json({ message: "Logout sucessfully"});
            }
        });
    } else {
        res.status(200).json({ message: "Not logged in"});
    }
})

module.exports = router;