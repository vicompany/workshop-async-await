const PRODUCT_COUNT = 50;

module.exports = (faker) => {
	const { commerce, image } = faker;

	const products = new Array(PRODUCT_COUNT)
		.fill(0)
		.map((p, i) => ({
			id: i + 1,
			name: commerce.productName(),
			price: commerce.price(),
			material: commerce.productMaterial(),
			image: image.image(400, 300, false),
		}));

	return products;
};
