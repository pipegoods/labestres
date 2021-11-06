import { Fragment } from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "./Title";
import { RegistroIntervalo, RegistroTypeString } from "../interfaces/IReporte";
import { CurveType } from "recharts/types/shape/Curve";
import { CSVLink } from "react-csv";
import { Box } from "@mui/material";

interface Props {
  data: RegistroTypeString[] | RegistroIntervalo[];
  x: string;
  y: string;
  titulo: string;
  typeLine: CurveType;
}

export default function ChartComponent({
  data,
  x,
  y,
  titulo,
  typeLine,
}: Props) {
  const theme = useTheme();

  return (
    <Fragment>
      <Box>
          <CSVLink style={{color: theme.palette.primary.main}} data={data}> Descargar CSV </CSVLink>
      </Box>
      <Title>{titulo}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey={x}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              {y.toUpperCase()}
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type={typeLine}
            dataKey={y}
            stroke={theme.palette.primary.main}
            dot={false}
          />

          <Tooltip
            wrapperStyle={{
              width: 100,
              backgroundColor: "#ffcd38",
              color: "#000",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  );
}
