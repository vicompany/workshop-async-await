const errorTpl = ({ message = 'Oops!' } = {}) => `<div class="error">${message}</div>`;

const orgTpl = org => `
	<h1>
		<a href="/"><img class="logo" src="${org.avatar_url}" alt="logo" /> ${org.name}</a>
	</h1>
	<p>${org.description}</p>
`;

const reposTpl = repos => `
	<ul>
		${repos.map(r => `
			<li>
				<a href="${r.url}">${r.name}</a>
			</li>
		`).join('')}
	</ul>
`;

export {
	errorTpl,
	orgTpl,
	reposTpl,
};
