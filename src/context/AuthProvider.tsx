import { useEffect, useState, createContext } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useHistory } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { IUserConifg } from "../components/ConfigView";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

type ContextProps = {
  user: User | null;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
  configUser: IUserConifg;
  setConfigUser: any;
  openPoliticas: boolean;
  setOpenPoliticas: any;
  isSuperUser: boolean;
  setIsSuperUser: any;
};

export const AuthContext = createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null as User | null);
  const [loadingAuthState, setLoadingAuthState] = useState<boolean>(true);
  const [isSuperUser, setIsSuperUser] = useState<boolean>(false);
  const [configUser, setConfigUser] = useLocalStorage<IUserConifg>(
    "configUser",
    {
      uid: user ? user?.uid : "",
      minuteIntervalos: "1",
      authKey: "",
      userReports: [],
    }
  );

  const [openPoliticas, setOpenPoliticas] = useLocalStorage<boolean>(
    "modalPoliticas",
    true
  );


  const history = useHistory();

  

  useEffect(() => {

    const obtenerConfigUser = async (userConfirm: User) => {
      const docRef = doc(db, "users", userConfirm.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        let { minuteIntervalos, authKey, userReports, rol } = docSnap.data();
        setConfigUser({
          minuteIntervalos: minuteIntervalos ? minuteIntervalos : 1,
          authKey: authKey ? authKey : "",
          uid: docSnap.id,
          userReports: userReports,
        });

        if (rol === "super") {
          setIsSuperUser(true);
        }
      } else {
        // doc.data() will be undefined in this case
        alert("Bienvenido a Estres Laboral App, lee nuestras politicas de privacidad antes de continuar");
      }
    };
    if (user) {
      obtenerConfigUser(user);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setUser(user);
        setLoadingAuthState(false);
        console.log("Usuario ya autenticado: ", user.email);

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
        configUser,
        setConfigUser,
        openPoliticas,
        setOpenPoliticas,
        isSuperUser,
        setIsSuperUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
