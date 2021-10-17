import { useTheme } from "@mui/material";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";

interface Props {
  arr: { name: string; value: number }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

export default function PieChartIS({ arr }: Props) {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={arr}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill={theme.palette.primary.main}
          label
        >
          {arr.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
