/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { useIsAuthenticated } from "./AuthProvider";
import withConditionalRedirect from "./withConditionalRedirect";

export default function withoutAuth(WrappedComponent, location = "/") {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: function withoutAuthClientCondition() {
      return useIsAuthenticated();
    },
    serverCondition: function withoutAuthServerCondition(ctx) {
      return !!ctx.req?.cookies.auth_token;
    },
  });
}
