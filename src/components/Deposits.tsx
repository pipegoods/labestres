import { Fragment } from 'react'
import Title from "./Title";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import { Button, TextField, Typography } from "@mui/material";

interface Props {
  bpm: number;
  rr: number;
  stateMiband: boolean;
  conectar(): void;
  desconectar(): void;
  name: string;
  setname(data: string): void;
  open: boolean;
}

export default function Deposits({
  bpm,
  rr,
  stateMiband,
  conectar,
  desconectar,
  name,
  setname,
  open,
}: Props) {

  return (
    <Fragment>
      <Title>
        Conectar Mi Band <BluetoothIcon />{" "}
      </Title>
      <Typography component="p" variant="h5">
        BPM: {bpm}
      </Typography>
      <Typography component="p" variant="h5">
        RR: {rr}
      </Typography>
      {open ? (
        <TextField
          onChange={(e) => setname(e.target.value as string)}
          value={name}
          variant="outlined"
          label="Nombre de la Actividad"
        />
      ) : (
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {name}
        </Typography>
      )}
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
    </Fragment>
  );
}
