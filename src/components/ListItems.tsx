import { useContext } from 'react'
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
  const { user, isSuperUser } = useContext(AuthContext);
  const configUser = useReadLocalStorage<IUserConifg>("configUser");
  const { users } = useUsers();

  const formatDate = (date: Date) => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if (month < 10) {
      return `${day}/0${month}/${year}`
    } else {
      return `${day}/${month}/${year}`
    }
  }

  const theme = useTheme();
  return (
    <div>
      <ListSubheader inset>Reportes anteriores</ListSubheader>
      {reportes.length > 0
        ? reportes
          .filter((c) => c.idUser === user?.uid)
          .filter((c) => c.registro.length > 0)
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
                  <DirectionsRunIcon
                    color={darkMode ? "inherit" : "primary"}
                  />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={r.nombreActividad}
                secondary={formatDate(r.createdAt.toDate())}
              />
            </ListItem>
          ))
        : null}

      {isSuperUser && (<>
        {configUser?.userReports ? (
          <ListSubheader inset>Reportes suscritos</ListSubheader>
        ) : null}
        {configUser?.userReports
          ? reportes
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
                    <DirectionsRunIcon
                      color={darkMode ? "inherit" : "primary"}
                    />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={r.nombreActividad}
                  secondary={users
                    .find((user) => user.uid === r.idUser)
                    ?.name.substring(0, 20)}
                />
              </ListItem>
            ))
          : null}
      </>)}
    </div>
  );
};

interface PropsSecon {
  toggleDashboard(data: IViewDashboard): void;
}

export const SecondaryListItems = ({ toggleDashboard }: PropsSecon) => {
  const darkMode = useReadLocalStorage("darkMode");
  const history = useHistory();
  const { setIsSuperUser } = useContext(AuthContext);

  const singOut = (event: any) => {
    event.preventDefault();

    setIsSuperUser(false);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
        history.push("/auth/login");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
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
        <ListItemText primary="Cerrar sesión" />
      </ListItem>
    </div>
  );
};
