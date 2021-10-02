import * as React from "react";
import Title from "./Title";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import { Button, Typography } from "@mui/material";


interface Props {
  bpm: number;
  rr: number;
  stateMiband: boolean;
  conectar () : void;
  desconectar () : void;
}

export default function Deposits({ bpm, rr, stateMiband, conectar, desconectar }: Props) {
  return (
    <React.Fragment>
      <Title>
        Conectar Mi Band <BluetoothIcon />{" "}
      </Title>
      <Typography component="p" variant="h5">
        BPM: {bpm}
      </Typography>
      <Typography component="p" variant="h5">
        RR: {rr}
      </Typography>
      <Typography component="p" variant="h6">
        Estado Actual: 😡🤓😌
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Haciendo las compras en el D1
      </Typography>
      <div>
        {stateMiband ? (
          <Button variant="text" color="error" onClick={desconectar}>
            Desconectar
          </Button>
        ) : (
          <Button variant="text" onClick={conectar}>
            Conectar
          </Button>
        )}
      </div>
    </React.Fragment>
  );
}
