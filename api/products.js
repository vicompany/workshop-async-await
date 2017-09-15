const PRODUCT_COUNT = 50;

module.exports = (faker) => {
	const { commerce } = faker;

	const products = new Array(PRODUCT_COUNT)
		.fill(0)
		.map((p, i) => ({
			id: i + 1,
			name: commerce.productName(),
			price: commerce.price(),
		}));

	return products;
};
