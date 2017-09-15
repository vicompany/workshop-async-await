const USER_COUNT = 10;

module.exports = (faker) => {
	const { name, image } = faker;

	const createUser = (i = 0) => ({
		id: i + 1,
		name: name.findName(),
		job: name.jobTitle(),
		avatar: image.avatar(),
	});

	const users = new Array(USER_COUNT)
		.fill(0)
		.map((u, i) => createUser(i));

	return users;
};
