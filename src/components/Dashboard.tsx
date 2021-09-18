import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { MainListItems, SecondaryListItems } from "./ListItems";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { IRegistro, IReporte } from "../interfaces/IReporte";
import Skeleton from "@mui/material/Skeleton";
import ChartComponent from "./ChartComponent";
import {
  calcularIDM,
  separarIntervalos,
  timestamptodate,
} from "../lib/ecuaciones.lib";
import { db } from "../config/firebaseConfig";
import CopyrightFooter from "./CopyrightFooter";
import { useHistory } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { AuthContext } from "../context/AuthProvider";

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
  const { toggle } = useDarkMode();
  const { user } = useContext(AuthContext);

  const history = useHistory();
  const initialReporte: IReporte = {
    id: "",
    nombreActividad: "",
    createdAt: Timestamp.now(),
  };

  const [open, setOpen] = useState(true);
  const [reportes, setReportes] = useState<IReporte[]>([]);
  const [registro, setregistro] = useState<IRegistro[]>([]);
  const [reporteSelected, setreporteSelected] =
    useState<IReporte>(initialReporte);
  const [loader, setloader] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const obtenerRegistroReporte = async (reporteToogle: IReporte) => {
    setreporteSelected(reporteToogle);
    setregistro([]);
    setloader(true);
    const docRef = doc(db, "registroRR", reporteToogle.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const q = query(
        collection(docRef, "registro"),
        orderBy("createdAt", "asc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setloader(false);
        // doc.data() is never undefined for query doc snapshots
        let { bpm, rr, createdAt } = doc.data();
        setregistro((oldRegistro) => [
          ...oldRegistro,
          {
            id: doc.id,
            bpm,
            rr,
            createdAt,
          },
        ]);
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
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
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Hola, Andrés Vizcaíno 😎
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
          <SecondaryListItems />
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                {loader ? (
                  <>
                    <Skeleton variant="text" width="100%" height="100%" />
                    <Skeleton variant="text" width="100%" height="100%" />
                    <Skeleton variant="text" width="100%" height="100%" />
                    <Skeleton variant="text" width="100%" height="100%" />
                  </>
                ) : (
                  <ChartComponent
                    data={timestamptodate(registro)}
                    x="createdAt"
                    y="bpm"
                    titulo="Ritmo Cardiaco"
                    typeLine="natural"
                  />
                )}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Deposits />
              </Paper>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                {loader ? (
                  <Skeleton variant="text" width="100%" height="100%" />
                ) : (
                  <ChartComponent
                    data={timestamptodate(registro)}
                    x="createdAt"
                    y="rr"
                    titulo="Variación del RR"
                    typeLine="natural"
                  />
                )}
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                {registro.length > 0 ? (
                  <ChartComponent
                    data={calcularIDM(separarIntervalos(registro))}
                    x="hora"
                    y="is"
                    titulo="Indice 1: Relajado, 2: Normal, 3: Estresado"
                    typeLine="step"
                  />
                ) : (
                  <Skeleton variant="text" width="100%" height="100%" />
                )}
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <CopyrightFooter sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

export default DashboardContent;
