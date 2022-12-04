// Require sequelize package
const Sequelize = require('sequelize');
// Require and configure dotenv package
require('dotenv').config();

let sequelize;

// Create new sequelize instance, using our environment variables.
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize
}
sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

// Export sequelize instance for use in other files.
module.exports = sequelize;