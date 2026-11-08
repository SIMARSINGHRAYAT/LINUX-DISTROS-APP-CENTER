const { github, json, sessionToken, OWNER, REPOSITORIES, PROFILE } = require('../../_github');

module.exports = async (request, response) => {
  const token = sessionToken(request);
  if (!token) {
    json(response, 401, { error: 'Sign in with GitHub first.' });
    return;
  }
  const action = request.body && request.body.action;
  const currentUser = await github('/user', {}, token);
  if (!currentUser.response.ok) {
    json(response, 401, { error: 'GitHub session expired.' });
    return;
  }
  if (currentUser.data.login.toLowerCase() === OWNER.toLowerCase()) {
    json(response, 200, { complete: true, owner: true });
    return;
  }

  if (action === 'repo') {
    // Star all repositories provided
    const starResults = await Promise.all(
      REPOSITORIES.map((repo) =>
        github(`/user/starred/${OWNER}/${repo}`, { method: 'PUT', headers: { 'Content-Length': '0' } }, token)
      )
    );
    const anyFailed = starResults.some((res) => ![204, 304].includes(res.response.status));
    if (anyFailed) {
      json(response, 502, { error: 'Could not star all repositories. Please try again.' });
      return;
    }
    json(response, 200, { complete: true, repositoriesStarred: REPOSITORIES.length });
    return;
  }

  if (action === 'profile') {
    const followResult = await github(`/user/following/${PROFILE}`, {
      method: 'PUT',
      headers: { 'Content-Length': '0' }
    }, token);
    if (![204, 304].includes(followResult.response.status)) {
      json(response, followResult.response.status === 401 ? 401 : 502, { error: 'Could not follow profile. Please try again.' });
      return;
    }
    json(response, 200, { complete: true });
    return;
  }

  json(response, 400, { error: 'Unknown support action.' });
};
