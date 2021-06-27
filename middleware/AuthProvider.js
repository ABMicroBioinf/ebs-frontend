/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  accessToken: "",
  isAuthenticated: false,
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children, authenticated, accessToken }) => {
  const [isAuthenticated, setAuthenticated] = useState(authenticated);
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        setAuthenticated,
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
