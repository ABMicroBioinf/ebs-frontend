/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:18:50
 * @modify date 2021-07-15 15:36:16
 * @desc [description]
 */
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

/**
 * Interface of AuthContextProps
 */
interface AuthContextProps {
  accessToken: String;
  isAuthenticated: Boolean;
  setAccessToken: Dispatch<SetStateAction<String>>;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

/**
 * Initiate AuthContext with init values
 * @type {Context<AuthContextProps>} - AuthContext with default values
 */
const AuthContext = createContext<AuthContextProps>({
  accessToken: "",
  isAuthenticated: false,
  setAccessToken: () => {},
  setAuthenticated: () => {},
});

/**
 * Custom hooks to use AuthContext
 * @throws {Error} - If useAuth hooks is used out of AuthProvider
 * @returns {AuthContext} - The current AuthContext
 */
 export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * User Verification
 * @returns {Boolean} - If the current user is authenticated
 */
export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}

/**
 * AuthProviderProps
 * @typedef AuthProviderProps
 * @prop {ReactNode} children - Wrapped component by Provider
 * @prop {Boolean} authenticated - If a user is authenticated
 * @prop {String} token - Access token of JWT key string.
 */

/**
 * AuthProvider
 * @param {AuthProviderProps} AuthProviderProps - Provider contains children node and custom props which are authenticated and token.
 * @returns {ReactElement} - Wrapped component by an AuthContext Provider.
 */
export const AuthProvider = (AuthProviderProps) => {
  const { children, authenticated, token } = AuthProviderProps;
  const [isAuthenticated, setAuthenticated] = useState(authenticated);
  const [accessToken, setAccessToken] = useState(token);
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        setAuthenticated,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
