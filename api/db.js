const faker = require('faker/locale/en');

faker.seed(1337);

const users = require('./users')(faker);
const products = require('./products')(faker);
const transactions = require('./transactions')(faker, users, products);

module.exports = () => ({
	users,
	products,
	transactions,
});
