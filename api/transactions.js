const TRANSACTION_COUNT = 30;

module.exports = (faker, users, products) => {
	const { date, random } = faker;
	const userIds = users.map(u => u.id);
	const productIds = products.map(p => p.id);

	const createTransaction = (i = 0) => ({
		id: i + 1,
		date: date.recent(random.number(365)),
		userId: random.arrayElement(userIds),
		productId: random.arrayElement(productIds),
	});

	const transactions = new Array(TRANSACTION_COUNT)
		.fill(0)
		.map((t, i) => createTransaction(i));

	return transactions;
};
