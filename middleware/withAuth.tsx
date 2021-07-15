/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:19:04
 * @modify date 2021-07-15 13:19:09
 * @desc [description]
 */
import { useIsAuthenticated } from "./AuthProvider";
import withConditionalRedirect from "./withConditionalRedirect";

/**
 * ConditionalRedirectProps
 * @typedef {Object} ConditionalRedirectProps
 * @property {ReactNode} WrappedComponent - page component wish to go to
 * @property {String} location - fallback page
 * @property {Function} clientCondition - check if a user is authenticated
 * @property {Function} serverCondition - check if backend server responds with valid token
 */

/**
 * HOC function that sets necessary variables ahead of conditional routing
 * @param {ReactNode} WrappedComponent - See {@link ConditionalRedirectProps}
 * @param {String} location - See {@link ConditionalRedirectProps}
 * @returns {ConditionalRedirectProps} - See {@link ConditionalRedirectProps}
 */
export default function withAuth(WrappedComponent, location = "/login") {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: function withAuthClientCondition() {
      return !useIsAuthenticated();
    },
    serverCondition: function withAuthServerCondition(ctx) {
      return !ctx.req?.cookies.auth_token;
    },
  });
}
