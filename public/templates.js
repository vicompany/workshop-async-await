const errorTpl = ({ message = 'Oops!' } = {}) => `<div class="error">${message}</div>`;

const orgTpl = org => `
	<h1>
		<a href="${org.url}" target="blank" title="View API on Github"><img class="logo" src="${org.avatar_url}" alt="logo" /> ${org.name}</a>
	</h1>
	<p>${org.description}</p>
`;

const reposTpl = repos => `
	<h2>Repositories</h2>
	<ul>
		${repos.map(r => `
			<li>
				<a class="js-repo" href="${r.url}">${r.name}</a> - <a class="js-contributors" href="${r.contributors_url}">contributors</a>
			</li>
		`).join('')}
	</ul>
`;

const repoTpl = repo => `
	<dialog>
		<h2>${repo.full_name}</h2>
		<p>${repo.description || 'No description available'}</p>
		<p>View <a href="${repo.html_url}" target="blank">${repo.name}</a> on Github.<p>
		<button class="js-close">close</button>
	</dialog>
`;

const contributorsTpl = data => `
	<dialog>
		<dl>
			<dt>Contributors</dt>
				${data.contributors.map(c => `
					<dd>
						<a href="${c.url}"><img class="avatar" src="${c.avatar_url}" alt="avatar" />${c.login}</a> TODO: full name, location, etc.
					</dd>
				`).join('')}
			<dt>Total contributions</dt>
			<dd>TODO: ${data.sum}</dd>
		</dl>
		<button class="js-close">close</button>
	</dialog>
`;

export {
	errorTpl,
	orgTpl,
	reposTpl,
	repoTpl,
	contributorsTpl,
};
