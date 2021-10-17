import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridSize,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import useReadLocalStorage from "../hooks/useReadLocalStorage";
import { IRegistro, IReporte } from "../interfaces/IReporte";
import {
  calcularIDM,
  calculatepRR50,
  medianRR,
  porcentageIS,
  separarIntervalos,
  standartDesviation,
  timestamptodate,
} from "../lib/ecuaciones.lib";
import CardStatistics from "./CardStatistics";
import ChartComponent from "./ChartComponent";
import { IUserConifg } from "./ConfigView";
import PieChartIS from "./PieChartIS";
import useUsers from "../hooks/useUsers";

interface Props {
  loader: boolean;
  registro: IRegistro[] | undefined;
  largeBpm: number;
  reporte?: IReporte;
}

const ViewReport = ({ loader, registro, largeBpm, reporte }: Props) => {
  const configUser = useReadLocalStorage<IUserConifg>("configUser");
  const { users } = useUsers();

  const [porIS, setporIS] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {

    setporIS(
      porcentageIS(
        calcularIDM(
          separarIntervalos(
            registro,
            configUser ? parseInt(configUser.minuteIntervalos) : 1
          )
        )
      )
    );
  }, [registro, configUser]);

  const getDuracion = () => {
    if (registro) {
      const ultima: Date = registro[registro.length - 1].createdAt.toDate();
      const primera: Date = registro[0].createdAt.toDate();

      const diff = Math.abs(ultima.getTime() - primera.getTime());
      var minutes = Math.floor(diff / 60000);
      var seconds = ((diff % 60000) / 1000).toFixed(0);
      return minutes + ":" + (diff < 10 ? "0" : "") + seconds;
    }
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
              data={registro ? timestamptodate(registro) : []}
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
            <Typography>
              Empleador: {users.find(r => r.uid === reporte.idUser)?.name}
            </Typography>

            {reporte.status ? (
              <Box sx={{ mt: "auto", display: "flex", gap: 2 }}>
                <Typography>Captura en tiempo real:</Typography>
                <Skeleton
                  sx={{ bgcolor: "red" }}
                  variant="circular"
                  width={20}
                  height={20}
                />
              </Box>
            ) : null}
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
              data={registro ? timestamptodate(registro) : []}
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
          {registro ? (
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

      {/* Estadisticas !! */}

      {/** MEDIA */}
      {registro ? (
        <>
          <CardStatistics
            variant="h1"
            value={medianRR(registro)}
            copy="Media RR"
          />
          <CardStatistics variant="h1" value={`${calculatepRR50(registro)}%`} copy="pRR50" />
          <CardStatistics
            variant="h2"
            value={standartDesviation(registro).toFixed(2).toString()}
            copy="Desviacion estandar RR"
          />
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 300,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="subtitle1"> Indice de estres mental (%)</Typography>

              <PieChartIS arr={porIS} />
            </Paper>
          </Grid>
        </>
      ) : null}

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
