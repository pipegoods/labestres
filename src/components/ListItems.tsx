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
import { IViewDashboard } from "../interfaces/IDashboard";
import { AuthContext } from "../context/AuthProvider";
import { IUserConifg } from "./ConfigView";
import useUsers from "../hooks/useUsers";

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
  const { user } = React.useContext(AuthContext);
  const configUser = useReadLocalStorage<IUserConifg>("configUser");
  const { users } = useUsers();

  const theme = useTheme();
  return (
    <div>
      <ListSubheader inset>Reportes anteriores</ListSubheader>
      {reportes
        .filter((c) => c.idUser === user?.uid)
        .map((r) => (
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
      {configUser?.userReports.length ? (
        <ListSubheader inset>Reportes suscritos</ListSubheader>
      ) : null}
      {reportes
        .filter((c) => configUser?.userReports.includes(c.idUser))
        .map((r) => (
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
              secondary={users
                .find((user) => user.uid === r.idUser)
                ?.name.substring(0, 20)}
            />
          </ListItem>
        ))}
    </div>
  );
};

interface PropsSecon {
  toggleDashboard(data: IViewDashboard): void;
}

export const SecondaryListItems = ({ toggleDashboard }: PropsSecon) => {
  const darkMode = useReadLocalStorage("darkMode");
  const history = useHistory();

  const singOut = (event: any) => {
    event.preventDefault();

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
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
      <ListItem
        button
        onClick={() =>
          toggleDashboard({
            viewReportes: false,
            viewCrear: false,
            viewConfig: true,
          })
        }
      >
        <ListItemIcon>
          <Avatar>
            <SettingsIcon color={darkMode ? "inherit" : "primary"} />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Configuración" />
      </ListItem>
      <ListItem button onClick={singOut}>
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
