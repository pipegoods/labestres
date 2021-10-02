import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CopyrightFooter from "./CopyrightFooter";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { red } from "@mui/material/colors";
import { AuthContext } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default function Login() {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const saveDataUser = async (user: User) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
    } else {
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
    }
  };

  const signInGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential ? credential.accessToken : null;
        // The signed-in user info.
        const user = result.user;
        // ...
        authContext.setUser(user);
        console.log(user, "user");
        console.log("Token: ", token);

        saveDataUser(user);

        history.push("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...

        console.error(errorMessage);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <FavoriteIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Box sx={{ mt: 10, mb: 10 }}>
          <Button
            size="large"
            variant="contained"
            sx={{ backgroundColor: red[500] }}
            startIcon={<GoogleIcon />}
            onClick={signInGoogle}
          >
            Entrar con Google
          </Button>
        </Box>
      </Box>
      <CopyrightFooter sx={{ mt: "auto" }} />
    </Container>
  );
}
