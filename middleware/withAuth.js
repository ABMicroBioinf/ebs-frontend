/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { useIsAuthenticated } from "./AuthProvider";
import withConditionalRedirect from "./withConditionalRedirect";

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
