import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { IRegistro } from "../interfaces/IReporte";
import MiBand5 from "../lib/miband";
import Deposits from "./Deposits";
import * as firestore from "firebase/firestore";
import ViewReport from "./ViewReport";
import { IUserConifg } from "./ConfigView";
import useReadLocalStorage from "../hooks/useReadLocalStorage";
import { addDoc, arrayUnion, collection, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthProvider";

declare global {
  interface Window {
    miband: MiBand5 | undefined;
  }
}

const NewReport = () => {
  const configUser = useReadLocalStorage<IUserConifg>("configUser");
  const { user } = useContext(AuthContext);

  const [bpm, setBpm] = useState<number>(0);
  const [rr, setrr] = useState<number>(0);
  const [stateMiband, setstateMiband] = useState<boolean>(false);

  const [registro, setregistro] = useState<IRegistro[]>([]);

  const conectar = async () => {
    console.log("Estoy conectando!!");

    const docRef = await addDoc(collection(db, "registroRR"), {
      idUser: user?.uid,
      createdAt: firestore.Timestamp.now(),
      nombreActividad: "Mercando en D1",
    });

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
  };

  const desconectar = async () => {
    console.log(window.miband);

    try {
      await window.miband?.onDisconnectButtonClick();
      setstateMiband(false);
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
            />
          </Paper>
        </Grid>
        {stateMiband ? (
          <ViewReport loader={false} registro={registro} largeBpm={9} />
        ) : (
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
                Ten cerca tu miBand para iniciar con la captura de tus datos...
                recuerda que esta prueba no tiene limite de tiempo, por lo que
                deberas desconectar cuando ya quieras parar con la prueba...
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default NewReport;
