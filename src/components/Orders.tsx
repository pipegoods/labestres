import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(
  id: number,
  date: string,
  bpm: number,
  rr: number,
  idm: number,
  estado: string
) {
  return { id, date, bpm, rr, idm, estado };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    88,
    60000/88,
    50.890,
    "Relajado"
  ),
  createData(
    1,
    "16 Mar, 2019",
    88,
    60000/88,
    50.890,
    "Relajado"
  ),
  createData(
    2,
    "16 Mar, 2019",
    88,
    60000/88,
    50.890,
    "Relajado"
  ),
  createData(
    3,
    "16 Mar, 2019",
    88,
    60000/88,
    50.890,
    "Relajado"
  ),
  createData(
    4,
    "16 Mar, 2019",
    88,
    60000/88,
    50.890,
    "Relajado"
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Reporte del registro</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>BPM</TableCell>
            <TableCell>RR</TableCell>
            <TableCell>Indice de Estres Mental</TableCell>
            <TableCell align="right">Estado Mental</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.bpm}</TableCell>
              <TableCell>{row.rr}</TableCell>
              <TableCell>{row.idm}</TableCell>
              <TableCell align="right">{row.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
