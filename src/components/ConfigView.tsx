import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import BluetoothConnectedIcon from "@mui/icons-material/BluetoothConnected";
import {
  Alert,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  Link,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import ListUsers from "./ListUsers";
import useUsers from "../hooks/useUsers";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface IUserConifg {
  uid: string;
  minuteIntervalos: string;
  authKey: string;
  userReports: string[];
}

const ConfigView = () => {
  const { user, configUser, setConfigUser } = useContext(AuthContext);
  const { users } = useUsers();

  const onSubmit = async () => {
    console.log(configUser);
    if (configUser) {
      await updateDoc(doc(db, "users", user ? user.uid : ""), {
        minuteIntervalos: parseInt(configUser.minuteIntervalos),
        authKey: configUser.authKey,
      }).then((d) => {
        setOpen(true);
      });
    }
  };

  const handleChange = (e: InputChange) => {
    e.preventDefault();
    setConfigUser({ ...configUser, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    event?.preventDefault();
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Panel de configuración</Typography>
      <Button sx={{ mt: 3 }} variant="contained" onClick={onSubmit}>
        Guardar Cambios
      </Button>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12} md={12} lg={3}>
          <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="subtitle1">Separar intervalos RR</Typography>
            <Typography variant="subtitle2">Tiempo en minutos</Typography>

            <FormControl variant="standard" sx={{ mt: 3 }}>
              <Input
                type="number"
                name="minuteIntervalos"
                value={configUser?.minuteIntervalos}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <FormatListNumberedIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="subtitle1">Auth key Mi Band 4/5/6</Typography>
            <Link
              href="https://www.freemyband.com/"
              target="_blank"
              rel="noopener"
            >
              Obtén el Auth Key de tu mi band
            </Link>

            <FormControl variant="standard" sx={{ mt: 3 }}>
              <Input
                type="text"
                name="authKey"
                value={configUser?.authKey}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <BluetoothConnectedIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={5}>
          <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="subtitle1">Lista de usuarios</Typography>

            <ListUsers users={users} userReports={configUser?.userReports ? configUser.userReports : []} />
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Configuración guardada con exito!!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ConfigView;
