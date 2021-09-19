import { Container, Grid, Paper, Skeleton } from "@mui/material";
import React from "react";
import { IRegistro } from "../interfaces/IReporte";
import { calcularIDM, separarIntervalos, timestamptodate } from "../lib/ecuaciones.lib";
import ChartComponent from "./ChartComponent";
import Deposits from "./Deposits";
import Orders from "./Orders";

interface Props {
    loader : boolean;
    registro: IRegistro[];
}

const ViewReport = ({loader, registro} : Props) => {
  return (
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
    </Container>
  );
};

export default ViewReport;
