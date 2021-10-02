import { Grid, GridSize, Paper, Skeleton } from "@mui/material";
import React from "react";
import useReadLocalStorage from "../hooks/useReadLocalStorage";
import { IRegistro } from "../interfaces/IReporte";
import { calcularIDM, separarIntervalos, timestamptodate } from "../lib/ecuaciones.lib";
import ChartComponent from "./ChartComponent";
import { IUserConifg } from "./ConfigView";

interface Props {
    loader : boolean;
    registro: IRegistro[];
    largeBpm : number;
}

const ViewReport = ({loader, registro, largeBpm} : Props) => {
  const configUser = useReadLocalStorage<IUserConifg>('configUser');

  return (
    <>
        {/* Chart */}
        <Grid item xs={12} md={largeBpm as GridSize}>
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
        {/* Recent Deposits
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            CAMBIAR
          </Paper>
        </Grid> */}

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
                data={calcularIDM(separarIntervalos(registro, configUser ? parseInt(configUser.minuteIntervalos) : 1))}
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
        {/* <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid> */}
      </>
  );
};

export default ViewReport;
