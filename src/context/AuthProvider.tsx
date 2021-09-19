import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useHistory } from "react-router-dom";

type ContextProps = {
  user: User | null;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null as User | null);
  const [loadingAuthState, setLoadingAuthState] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setUser(user);
        setLoadingAuthState(false);
        console.log('Usuario ya autenticado: ', user.email);
        history.push("/dashboard");
      } else {
        // User is signed out
        // ...
        setLoadingAuthState(false);
      }
    });
  }, [history]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
