import { Box, Typography } from "@mui/material";
import React from "react";

const ConfigView = () => {
  return (
    <Box>
      <Typography variant="h1" component="div" gutterBottom>
        Panel de configuracion
      </Typography>
      <Typography variant="h2" gutterBottom component="div">
        Aqui podras configurar los colores
      </Typography>
      <Typography variant="h3" gutterBottom component="div">
        Podras cambiar el separador de intervalos
      </Typography>
      
    </Box>
  );
};

export default ConfigView;
