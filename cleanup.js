const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GIST_TOKEN,
});

try {
  const gists = await octokit.gists.listPublicForUser({
    username: process.env.GIST_USERNAME,
  });

  if (gists.data && gists.data.length > 0) {
    gists.data.map(gist => {
      clientWithAuth.gists.delete({
        gist_id: gist.id
      });
      const m = `> Delete gist file ${gist.html_url}`;
      console.warn(m);
    });
  }
} catch (e) {
  console.error('> Error deleteAllGist: ', e)
}
