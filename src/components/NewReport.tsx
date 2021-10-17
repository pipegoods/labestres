import { Container, Grid, Link, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { IRegistro } from "../interfaces/IReporte";
import MiBand5 from "../lib/miband";
import Deposits from "./Deposits";
import * as firestore from "firebase/firestore";
import ViewReport from "./ViewReport";
import { IUserConifg } from "./ConfigView";
import useReadLocalStorage from "../hooks/useReadLocalStorage";
import {
  addDoc,
  arrayUnion,
  collection,
  DocumentReference,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthProvider";
import { IViewDashboard } from "../interfaces/IDashboard";

declare global {
  interface Window {
    miband: MiBand5 | undefined;
  }
}

interface Props {
  toggleDashboard(data: IViewDashboard): void;
}

const NewReport = ({ toggleDashboard }: Props) => {
  const configUser = useReadLocalStorage<IUserConifg>("configUser");
  const { user } = useContext(AuthContext);

  const [bpm, setBpm] = useState<number>(0);
  const [rr, setrr] = useState<number>(0);
  const [stateMiband, setstateMiband] = useState<boolean>(false);
  const [nombreActividad, setnombreActividad] = useState("");
  const [registro, setregistro] = useState<IRegistro[]>([]);
  const [open, setopen] = useState(true);
  const [docIdReport, setdocIdReport] = useState<DocumentReference>();

  const conectar = async () => {
    console.log("Estoy conectando!!");
    setopen(false);
    if (nombreActividad !== "") {
      const docRef = await addDoc(collection(db, "registroRR"), {
        idUser: user?.uid,
        createdAt: firestore.Timestamp.now(),
        nombreActividad,
        status: true,
      });
      setdocIdReport(docRef);
      window.addEventListener("heartrate", async (e: CustomEventInit) => {
        console.log("BPM ACTUAL:", e.detail);
        console.log("RR:", 60000 / e.detail);
        setBpm(e.detail);
        setrr(Math.trunc(60000 / e.detail));
        setregistro((old) => [
          ...old,
          {
            rr: Math.trunc(60000 / e.detail),
            bpm: e.detail,
            id: "0",
            createdAt: firestore.Timestamp.now(),
          },
        ]);

        await updateDoc(docRef, {
          registro: arrayUnion({
            rr: Math.trunc(60000 / e.detail),
            bpm: e.detail,
            createdAt: firestore.Timestamp.now(),
          }),
        });
        // rr: 60000 / e.detail,
        //   bpm: e.detail,
      });

      try {
        if (configUser) {
          if (configUser.authKey) {
            window.miband = new MiBand5(configUser.authKey);
            await window.miband.init();
            setstateMiband(true);
          } else {
            alert("Debes agregar el AuthKey en el panel de configuracion");
          }
        } else {
          alert("Debes agregar el AuthKey en el panel de configuracion");
        }
      } catch (e: any) {
        alert(e.message);
      }
    } else {
      alert("Debes colocar un nombre a la actividad");
      setopen(true);
    }
  };

  const desconectar = async () => {
    console.log(window.miband);
    setopen(true);
    setnombreActividad("");
    try {
      await window.miband?.onDisconnectButtonClick();
      setstateMiband(false);

      if (docIdReport) {
        await updateDoc(docIdReport, {
          status: false
        });
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
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
            <Deposits
              rr={rr}
              bpm={bpm}
              conectar={conectar}
              desconectar={desconectar}
              stateMiband={stateMiband}
              name={nombreActividad}
              setname={setnombreActividad}
              open={open}
            />
          </Paper>
        </Grid>
        {stateMiband ? (
          <ViewReport loader={false} registro={registro} largeBpm={9} />
        ) : (
          <>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="subtitle1">
                  Ten cerca tu miBand para iniciar con la captura de tus
                  datos... recuerda que esta prueba no tiene limite de tiempo,
                  por lo que deberas desconectar cuando ya quieras parar con la
                  prueba...
                </Typography>
              </Paper>
            </Grid>
            {configUser?.authKey ? (
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Typography variant="subtitle1">
                    Tu authKey es: {configUser.authKey.substring(0, 10)}...
                  </Typography>
                  <Typography variant="subtitle1">
                    Si deseas cambiar este valor debes{" "}
                    <Link
                      onClick={() =>
                        toggleDashboard({
                          viewReportes: false,
                          viewCrear: false,
                          viewConfig: true,
                        })
                      }
                    >
                      ir a configuración
                    </Link>
                  </Typography>
                </Paper>
              </Grid>
            ) : null}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default NewReport;
