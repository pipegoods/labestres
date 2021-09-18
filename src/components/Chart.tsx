import * as React from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";

// Generate Sales Data
function createData(time: string, bpm?: number) {
  return { time, bpm };
}

const data = [
  createData("00:00", 80),
  createData("00:10", 87),
  createData("00:20", 90),
  createData("00:30", 100),
  createData("00:40", 95),
  createData("00:50", 90),
  createData("01:00", 85),
  createData("01:10", 80),
  createData("01:20", 77),
  createData("01:30", 95),
  createData("01:40", 90),
  createData("01:50", 85),
  createData("02:10", 80),
  createData("02:20", 77),
  createData("02:30", 100),
  createData("02:40", 95),
  createData("02:50", 90),
  createData("03:00", 85),
  createData("03:10", 80),
  createData("03:20", 77),
  createData("03:30", 95),
  createData("03:40", 90),
  createData("03:50", 85),
  createData("04:10", 80),
  createData("04:20", 77),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>
        Ritmo Cardiaco <FavoriteIcon />{" "}
      </Title>
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
            dataKey="time"
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
              BPM
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="natural"
            dataKey="bpm"
            stroke={theme.palette.primary.main}
            dot={false}
          />

          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ffcd38", color: "#000" }} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
