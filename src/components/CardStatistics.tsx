import { Grid, Paper, Typography } from "@mui/material";

interface Props {
  value: string;
  copy: string;
  variant:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | undefined;
}

const CardStatistics = ({ value, copy, variant }: Props) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 240,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant={variant}> {value} </Typography>
        <Typography variant="subtitle1"> {copy} </Typography>
      </Paper>
    </Grid>
  );
};

export default CardStatistics;
