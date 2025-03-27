require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.PG_CONNECTION_STRING, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Disable logging for cleaner output
});

// Define Sector model
const Sector = sequelize.define('Sector', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sector_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define Project model
const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feature_img_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary_short: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  intro_short: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  impact: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  original_source_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sector_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations
Project.belongsTo(Sector, { foreignKey: 'sector_id' });

// Initialize the database and insert data
async function initialize() {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
  } catch (err) {
    console.error('Error syncing database:', err);
    throw err;
  }
}

// Export the models and functions
module.exports = {
  initialize,
  Sector,
  Project,
  sequelize,
};