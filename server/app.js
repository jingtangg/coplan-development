// 1. import函式庫
import express from "express";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Sequelize from "sequelize";
import session from "express-session";
import dotenv from "dotenv";

// 2. 初始化全局變數
dotenv.config();
const app = express();
const port = 3000;

// 3.Sequelize 數據庫連接和模型定義
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const User = sequelize.define("user", {
  githubId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
  },
});

// ... User 模型和 sequelize.sync() ...
sequelize.sync();

// 4. 配置 Passport GitHub 策略
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Passport 認證邏輯
      // 例如：查找或創建用戶
    }
  )
);

// 5. 配置 Passport Google 策略
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // 根據 Google 用戶的資訊來查找或創建用戶
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

// 6. 中間件配置
app.use(
  session({ secret: "your_secret", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// 7. 路由處理
app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

// 8. 啟動伺服器
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
