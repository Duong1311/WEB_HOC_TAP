const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

// thu viện lodash

let refreshTokens = [];

const authControllers = {
  //generate access token

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2d" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "5d" }
    );
  },

  registerUser: async (req, res) => {
    try {
      console.log("register");
      console.log(req.body);
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const user1 = await User.findOne({ email: req.body.email });
      if (user1) {
        return res.status(201).json({
          error: "Email đã tồn tại",
        });
      }
      const user2 = await User.findOne({ username: req.body.username });
      if (user2) {
        return res.status(201).json({
          error: "Tên đăng nhập đã tồn tại",
        });
      }

      //create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //save to database
      const user = await newUser.save();
      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    try {
      console.log("login");
      console.log(req.body);
      const user = await User.findOne({ username: req.body.username });
      if (!user)
        return res.status(201).json({
          error: "Không tìm thấy tài khoản",
        });
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(201).json({ error: "Sai mật khẩu" });

      const { password, ...others } = user._doc;

      if (validPassword && user) {
        const accessToken = authControllers.generateAccessToken(user);
        const refreshToken = authControllers.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/",
          secure: false,
          sameSite: "strict",
        });
        res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  loginUserGoogle: async (req, res) => {
    const { credential, client_id } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: client_id,
      });
      const payload = ticket.getPayload();
      const user = await User.findOne({ email: payload.email });
      // console.log(user);
      if (!user) {
        console.log("User does not exist");
        // Create a user if they do not exist
        const newUser = new User({
          email: payload.email,
          username: payload.name,
          // picture: payload.picture,
          authSource: "google",
        });
        const result = await newUser.save();

        const { picture, ...others } = result._doc;
        const accessToken = authControllers.generateAccessToken(result);
        const refreshToken = authControllers.generateRefreshToken(result);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/",
          secure: false,
          sameSite: "strict",
        });
        return res
          .status(200)
          .json({ ...others, picture: payload.picture, accessToken });
      }
      const { picture, ...others } = user._doc;

      if (user) {
        const accessToken = authControllers.generateAccessToken(user);
        const refreshToken = authControllers.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/",
          secure: false,
          sameSite: "strict",
        });
        res
          .status(200)
          .json({ ...others, picture: payload.picture, accessToken });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  refreshToken: async (req, res) => {
    try {
      console.log("refresh token");
      //Take refresh token from user

      const refreshToken = req.cookies.refreshToken;
      console.log(refreshToken);
      if (!refreshToken)
        return res.status(401).json("You're not authenticated");
      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid");
      }
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
          console.log(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        //Create new accesstoken, refresh token
        const newAccessToken = authControllers.generateAccessToken(user);
        const newRefreshToken = authControllers.generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({ accessToken: newAccessToken });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  logout: async (req, res) => {
    try {
      console.log("logout");
      res.clearCookie("refreshToken");
      refreshTokens = refreshTokens.filter(
        (token) => token !== req.cookies.refreshToken
      );
      return res.status(200).json("Logged out !");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authControllers;
