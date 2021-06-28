/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import "../styles/globals.css";
import "../styles/ebs.scss";
import "semantic-ui-css/semantic.min.css";

import App from "next/app";
import { AuthProvider } from "../middleware/AuthProvider";
import cookie from "cookie";

function EBSApp({ Component, pageProps, authenticated, token }) {
  return (
    <AuthProvider authenticated={authenticated} token={token}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

EBSApp.getInitialProps = async (appContext) => {
  let token = "";
  let authenticated = false;
  const request = appContext.ctx.req;
  if (request) {
    request.cookies = cookie.parse(request.headers.cookie || "");
    const auth_token = request.cookies.auth_token;
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
