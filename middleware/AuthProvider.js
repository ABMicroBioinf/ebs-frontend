/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children, authenticated, token }) => {
  const [isAuthenticated, setAuthenticated] = useState(authenticated);
  const [accessToken, setAccessToken] = useState(token);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        setAuthenticated,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}
