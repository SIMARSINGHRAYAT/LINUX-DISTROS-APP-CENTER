const { github, json, sessionToken, OWNER, REPOSITORIES, PROFILE } = require('../../_github');

module.exports = async (request, response) => {
  const token = sessionToken(request);
  if (!token) {
    json(response, 401, { authenticated: false });
    return;
  }
  const user = await github('/user', {}, token);
  if (!user.response.ok) {
    json(response, 401, { authenticated: false });
    return;
  }
  const isOwner = user.data.login.toLowerCase() === OWNER.toLowerCase();
  if (isOwner) {
    json(response, 200, {
      authenticated: true,
      user: { login: user.data.login, avatar: user.data.avatar_url },
      repoStarred: true,
      profileFollowed: true,
      isOwner: true
    });
    return;
  }
  const repoChecks = await Promise.all(
    REPOSITORIES.map((repo) => github(`/user/starred/${OWNER}/${repo}`, { method: 'GET' }, token))
  );
  const follow = await github(`/user/following/${PROFILE}`, { method: 'GET' }, token);
  const allStarred = repoChecks.every((check) => check.response.status === 204);

  json(response, 200, {
    authenticated: true,
    user: { login: user.data.login, avatar: user.data.avatar_url },
    repoStarred: isOwner || allStarred,
    profileFollowed: isOwner || follow.response.status === 204,
    isOwner,
    repositories: REPOSITORIES
  });
};
