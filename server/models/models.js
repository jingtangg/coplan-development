import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// 建立 Sequelize 連接
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

// 定義 Users 模型
const User = sequelize.define("user", {
  // 模型屬性
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
    // 其他屬性...
  },
  // 可以添加其他屬性
});

// 定義 Categories 模型
const Category = sequelize.define("category", {
  // 模型屬性
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  },
  // 可以添加其他屬性
});

// 定義 Projects 模型
const Project = sequelize.define("project", {
  // 模型屬性
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categoryId: {
    type: Sequelize.INTEGER,
    references: { model: "categories", key: "id" },
  },
  // 可以添加其他屬性
});

// 定義 Tasks 模型
const Task = sequelize.define("task", {
  // 模型屬性
  description: Sequelize.STRING,
  projectId: {
    type: Sequelize.INTEGER,
    references: { model: "projects", key: "id" },
  },
  // 可以添加其他屬性
});

// 建立關聯
User.hasMany(Category);
Category.belongsTo(User);

User.hasMany(Project);
Project.belongsTo(User);

Category.hasMany(Project);
Project.belongsTo(Category);

Project.hasMany(Task);
Task.belongsTo(Project);

// 同步模型到資料庫
sequelize.sync();

export { User, Category, Project, Task };
