import * as React from 'react';
import Title from './Title';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { Button, Typography } from '@mui/material';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Conectar Mi Band <BluetoothIcon /> </Title>
      <Typography component="p" variant="h5">
        BPM: 77
      </Typography>
      <Typography component="p" variant="h5">
        RR: 779
      </Typography>
      <Typography component="p" variant="h6">
        Estado Actual: 😡🤓😌
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Haciendo las compras en el D1
      </Typography>
      <div>
        <Button variant="text" onClick={preventDefault}>Conectar</Button>
      </div>
    </React.Fragment>
  );
}