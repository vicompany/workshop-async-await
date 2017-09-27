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
				${data.users.map(u => `
					<dd>
						<a href="${u.url}"><img class="avatar" src="${u.avatar}" alt="avatar" />${u.login}</a>
						<dl class="user">
							<dt>Full name</dt>
							<dd class="todo">user.name</dd>
							<dt>Public repos</dt>
							<dd class="todo">user.public_repos</dd>
							<dt>Followers</dt>
							<dd class="todo">user.followers</dd>
						</dl>
					</dd>
				`).join('')}
			<dt>Total contributions</dt>
			<dd class="todo">Sum contributions</dd>
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
