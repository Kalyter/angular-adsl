// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  auth: {
    clientID: '6mYPjAc5VD9BHHp5Jbrrgf7Z1LwAxylI',
    domain: 'kalyter.eu.auth0.com', // e.g., you.auth0.com
    audience: 'http://localhost:4000', // e.g., http://localhost:3001
    redirect: 'http://localhost:4000/callback',
    scope: 'openid'
  },
  youtube_api: 'AIzaSyDRTh04ioW26pRy1TyguqKB3mirOuxN1dM',
  google_api: 'AIzaSyCjxiunP24NnW1pleSRw5P1kBb45V-qwDM'
};
