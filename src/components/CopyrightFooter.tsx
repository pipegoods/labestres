import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const CopyrightFooter = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/pipegoods/labestres">
        IoT - Estres Laboral
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyrightFooter;
