import { Grid, GridSize, Paper, Skeleton, Typography } from "@mui/material";
import React from "react";
import useReadLocalStorage from "../hooks/useReadLocalStorage";
import { IRegistro, IReporte } from "../interfaces/IReporte";
import {
  calcularIDM,
  separarIntervalos,
  timestamptodate,
} from "../lib/ecuaciones.lib";
import ChartComponent from "./ChartComponent";
import { IUserConifg } from "./ConfigView";

interface Props {
  loader: boolean;
  registro: IRegistro[];
  largeBpm: number;
  reporte?: IReporte;
}

const ViewReport = ({ loader, registro, largeBpm, reporte }: Props) => {
  const configUser = useReadLocalStorage<IUserConifg>("configUser");

  const getDuracion = () => {
    const ultima: Date = registro[registro.length - 1].createdAt.toDate();
    const primera: Date = registro[0].createdAt.toDate();

    const diff = Math.abs(ultima.getTime() - primera.getTime());
    var minutes = Math.floor(diff / 60000);
    var seconds = ((diff % 60000) / 1000).toFixed(0);
    return minutes + ":" + (diff < 10 ? "0" : "") + seconds;
  };

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
      {/* Recent Deposits */}
      {reporte ? (
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Typography variant="h6" color="primary">
              Datos del reporte 😎
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Actividad: {reporte.nombreActividad}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Tiempo: {reporte.createdAt.toDate().toLocaleDateString()}{" "}
              {reporte.createdAt.toDate().toLocaleTimeString()}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Duración: {getDuracion()} minutos
            </Typography>
      
            <Typography>
              Minutos de cada intervalo: {configUser?.minuteIntervalos}
            </Typography>
          </Paper>
        </Grid>
      ) : null}

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
              data={calcularIDM(
                separarIntervalos(
                  registro,
                  configUser ? parseInt(configUser.minuteIntervalos) : 1
                )
              )}
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
