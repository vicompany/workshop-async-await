const error = (msg = 'Oops!') => `<div class="error">${msg}</div>`;

const org = data => `
	<h1>
		<a href="/"><img class="logo" src="${data.avatar_url}" alt="logo" /> ${data.name}</a>
	</h1>
	<p>${data.description}</p>
`;

export {
	error,
	org,
};
