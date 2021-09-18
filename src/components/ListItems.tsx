import * as React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme,
} from "@mui/material";
import useReadLocalStorage from "../hooks/useReadLocalStorage";
import { IReporte } from "../interfaces/IReporte";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";

interface PropsMain {
  reportes: IReporte[];
  toogleReporte: (id: IReporte) => void;
  reporteSelect: IReporte;
}

export const MainListItems = ({
  reportes,
  toogleReporte,
  reporteSelect,
}: PropsMain) => {
  const darkMode = useReadLocalStorage("darkMode");
  const theme = useTheme();
  return (
    <div>
      <ListSubheader inset>Reportes anteriores</ListSubheader>
      {reportes.map((r) => (
        <ListItem button key={r.id} onClick={() => toogleReporte(r)}>
          <ListItemIcon>
            <Avatar
              sx={
                reporteSelect.id === r.id
                  ? { backgroundColor: theme.palette.primary.dark }
                  : null
              }
            >
              <DirectionsRunIcon color={darkMode ? "inherit" : "primary"} />
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={r.nombreActividad}
            secondary="Sep 1, 2021 : 13:30"
          />
        </ListItem>
      ))}
    </div>
  );
};

export const SecondaryListItems = () => {
  const darkMode = useReadLocalStorage("darkMode");
  const history = useHistory();

  const handleClick = (event: any) => {
    event.preventDefault();

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        history.push("/auth/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        
      });
  };

  return (
    <div>
      <ListSubheader inset>Configuración</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <Avatar>
            <SettingsIcon color={darkMode ? "inherit" : "primary"} />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Configuración" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Avatar>
            <LogoutIcon color={darkMode ? "inherit" : "primary"} />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Cerar sesión" />
      </ListItem>
    </div>
  );
};
