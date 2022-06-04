import { useContext } from "react";
import { Button, Modal, Box, Typography, Link } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ModalLegal = () => {
    const {openPoliticas, setOpenPoliticas} = useContext(AuthContext);
    const handleOpen = () => setOpenPoliticas(true);
    const handleClose = () => setOpenPoliticas(false);


    return (
        <div>
            <Button size="small" onClick={handleOpen}>POLÍTICAS DE TRATAMIENTO DE DATOS
                PERSONALES</Button>
            <Modal
                open={openPoliticas || false}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    POLÍTICAS DE TRATAMIENTO DE DATOS
                PERSONALES
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                        Al utilizar nuestros servicios, usted acepta el uso de los datos personales que nos proporcione.
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                        Toda la información que nos proporciones será tratada con la máxima confidencialidad y seguro. En caso de que no desees seguir compartiendo tu información con nosotros, puedes darte de baja en cualquier momento a <Link href="mailto:avizcainos@unicartagena.edu.co">nuestro correo</Link>.
                    </Typography>

                    <Button variant="contained" sx={{mt: 4}} fullWidth color="primary" onClick={handleClose}>
                        Aceptar
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalLegal;