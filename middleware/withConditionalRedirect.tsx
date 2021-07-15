/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:19:15
 * @modify date 2021-07-15 13:19:20
 * @desc [description]
 */
import { useRouter } from "next/router";

/**
 * Check if user correctly send a request by using a browser
 * @returns {Boolean} - If window is defined.
 */
function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * ConditionalRedirectProps
 * @typedef {Object} ConditionalRedirectProps
 * @property {ReactNode} WrappedComponent - page component wish to go to
 * @property {String} location - fallback page
 * @property {Function} clientCondition - check if a user is authenticated
 * @property {Function} serverCondition - check if backend server responds with valid token
 */

/**
 * HOC function that redirects user depending on clientCondition and serverCondition
 * @param {ConditionalRedirectProps} - See {@link ConditionalRedirectProps}
 * @returns {Function} - 
 */
export default function withConditionalRedirect({
  WrappedComponent,
  clientCondition,
  serverCondition,
  location,
}) {
  const WithConditionalRedirectWrapper = (props) => {
    const router = useRouter();
    const redirectCondition = clientCondition();
    if (isBrowser() && redirectCondition) {
      router.push(location);
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  WithConditionalRedirectWrapper.getInitialProps = async (ctx) => {
    if (!isBrowser() && ctx.res) {
      if (serverCondition(ctx)) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
      }
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps };
  };

  return WithConditionalRedirectWrapper;
}
