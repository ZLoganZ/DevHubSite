export function GetGitHubUrl() {
  const rootURl = 'https://github.com/login/oauth/authorize';

  const options = {
    client_id: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID as string,
    redirect_uri: import.meta.env.VITE_GITHUB_OAUTH_REDIRECT_URL as string,
    scope: 'user:email',
  };

  const qs = new URLSearchParams(options);

  return `${rootURl}?${qs.toString()}`;
}