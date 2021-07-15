/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:14:25
 * @modify date 2021-07-15 15:46:55
 * @desc [description]
 */
import "../styles/globals.css";
import "../styles/ebs.scss";
import "semantic-ui-css/semantic.min.css";

import App from "next/app";
import cookie from "cookie";
import { AuthProvider } from "../middleware/AuthProvider";

/**
 * EBSAppProps
 * @typedef EBSAppProps
 * @prop {AppProps.Component} Component - Home component of index.js.
 * @prop {AppProps.PageProps} pageProps - Page props of App props.
 * @prop {Boolean} authenticated - If a current user is authenticated.
 * @prop {String} token - Access token of JWT key string.
 */

/**
 * The most top level of Next.js component that extends react application by overriding the global App component.
 * @param {EBSAppProps} EBSAppProps - See {@link EBSAppProps}.
 * @returns {ReactElement} - Home page that is the main page(index.js) of next.js.
 */
function EBSApp(EBSAppProps) {
  const { Component, pageProps, authenticated, token } = EBSAppProps;
  return (
    <AuthProvider authenticated={authenticated} token={token}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

/**
 * Overriding getInitialProps 
 * @param {AppContext} appContext - Application context of Next.js.
 * @returns {Promise<EBSAppProps>} - AppContext with custom props which are authenticated and token.
 */
EBSApp.getInitialProps = async (appContext) => {
  let token = "";
  let authenticated = false;
  const request = appContext.ctx.req;
  if (request) {
    const cookies = cookie.parse(request.headers.cookie || "");
    const auth_token = cookies.auth_token;
    if (auth_token) {
      const sanitized = auth_token.replace(/\\054/g, ",").replace(/'/g, '"');
      const tokenObj = JSON.parse(sanitized);
      token = tokenObj.access;
    }
    authenticated = !!auth_token;
  }

  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, authenticated, token };
};

export default EBSApp;
