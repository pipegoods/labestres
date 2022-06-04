import { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { MainListItems, SecondaryListItems } from "./ListItems";
import BluetoothAudioIcon from "@mui/icons-material/BluetoothAudio";
import { collection, onSnapshot, query, Timestamp } from "firebase/firestore";
import { IReporte } from "../interfaces/IReporte";
import { db } from "../config/firebaseConfig";
import CopyrightFooter from "./CopyrightFooter";
import { useHistory } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { AuthContext } from "../context/AuthProvider";
import {
  Avatar,
  Container,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ViewReport from "./ViewReport";
import { IViewDashboard } from "../interfaces/IDashboard";
import ConfigView from "./ConfigView";
import NewReport from "./NewReport";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent() {

  const theme = useTheme();
  const { toggle } = useDarkMode();
  const { user } = useContext(AuthContext);

  const history = useHistory();
  const initialReporte: IReporte = {
    id: "",
    nombreActividad: "",
    createdAt: Timestamp.now(),
    idUser: "",
    registro: [],
    status: false,
  };

  const [open, setOpen] = useState(true);
  const [reportes, setReportes] = useState<IReporte[]>([]);
  const [reporteSelected, setreporteSelected] =
    useState<IReporte>(initialReporte);
  const [viewDashboard, setViewDashboard] = useState<IViewDashboard>({
    viewReportes: false,
    viewCrear: true,
    viewConfig: false,
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const obtenerRegistroReporte = async (reporteToogle: IReporte) => {
    setViewDashboard({
      viewConfig: false,
      viewCrear: false,
      viewReportes: true,
    });
    setreporteSelected(reporteToogle);
  };

  useEffect(() => {
    if (user === null) {
      history.push("/auth/login");
    }

    const obtenerDocumentos = async () => {
      const q = query(collection(db, "registroRR"));
      onSnapshot(q, (querySnapshot) => {
        setReportes([]);
        querySnapshot.forEach((docITEM) => {
          setReportes((oldReportes) => [
            ...oldReportes,
            {
              id: docITEM.id,
              nombreActividad: docITEM.data().nombreActividad,
              createdAt: docITEM.data().createdAt,
              idUser: docITEM.data().idUser,
              registro: docITEM.data().registro
                ? [...docITEM.data().registro]
                : [],
              status: docITEM.data().status,
            },
          ]);
        });
      });
    };

    obtenerDocumentos();
  }, [history, user]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar
            sx={{ mx: 2 }}
            alt={"Foto de " + user?.displayName}
            src={
              user?.photoURL
                ? user.photoURL
                : "https://i.blogs.es/285c7f/spiderman/840_560.jpg"
            }
          />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Hola, {user?.displayName} 😎
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{mx: 3, backgroundColor: theme.palette.primary.main, px: 3, borderRadius: 30}}
          >
            Estres laboral App
          </Typography>
          <IconButton color="inherit" onClick={toggle}>
            <Brightness4Icon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <List>
          <div>
            <ListItem
              button
              onClick={() =>
                setViewDashboard({
                  viewConfig: false,
                  viewReportes: false,
                  viewCrear: true,
                })
              }
            >
              <ListItemIcon>
                <Avatar>
                  <BluetoothAudioIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Crear registro nuevo"
                secondary="Mi band 4/5/6"
              />
            </ListItem>
          </div>
        </List>
        <Divider />
        <List>
          <MainListItems
            reporteSelect={reporteSelected}
            toogleReporte={obtenerRegistroReporte}
            reportes={reportes}
          />
        </List>
        <Divider />
        <List>
          <SecondaryListItems toggleDashboard={setViewDashboard} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {viewDashboard.viewReportes ? (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <ViewReport
                loader={false}
                registro={
                  reportes.find((r) => r.id === reporteSelected.id)?.registro
                }
                largeBpm={9}
                reporte={reportes.find((r) => r.id === reporteSelected.id)}
              />
            </Grid>
          </Container>
        ) : null}

        {viewDashboard.viewCrear ? (
          <NewReport toggleDashboard={setViewDashboard} />
        ) : null}

        {viewDashboard.viewConfig ? <ConfigView /> : null}


        <CopyrightFooter sx={{ pt: 4 }} />
      </Box>
    </Box>
  );
}

export default DashboardContent;
