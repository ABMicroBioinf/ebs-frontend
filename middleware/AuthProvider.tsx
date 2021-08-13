/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:18:50
 * @modify date 2021-07-15 15:36:16
 * @desc [description]
 */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AuthContextProps {
  accessToken: string;
  isAuthenticated: boolean;
  setAccessToken?: Dispatch<SetStateAction<string>>;
  setAuthenticated?: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({
  accessToken: "",
  isAuthenticated: false,
  setAccessToken: null,
  setAuthenticated: null,
});

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useIsAuthenticated(): boolean {
  const context = useAuth();
  return context.isAuthenticated;
}

export const AuthProvider = ({
  children,
  authenticated,
  token,
}): JSX.Element => {
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
