import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ModalLegal from "./ModalLegal";

const CopyrightFooter = (props: any) => {
  return (
   
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
       <ModalLegal  />
       <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      sx={{my: 3}}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/pipegoods/labestres">
        IoT - Estres Laboral
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
    </div>
  );
};

export default CopyrightFooter;
