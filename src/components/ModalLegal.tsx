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
    const { openPoliticas, setOpenPoliticas } = useContext(AuthContext);
    const handleOpen = () => setOpenPoliticas(true);
    const handleClose = () => (event : {}, reason : "backdropClick" | "escapeKeyDown") => {
        if (reason === 'backdropClick') {
            return;     
        }
        setOpenPoliticas(false);
    }


        return (
            <div>
                <Button size="small" onClick={handleOpen}>POLÍTICAS DE TRATAMIENTO DE DATOS
                    PERSONALES</Button>
                <Modal
                    open={openPoliticas || false}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEscapeKeyDown
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            POLÍTICAS DE TRATAMIENTO DE DATOS
                            PERSONALES
                        </Typography>

                        <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                            Al utilizar nuestros servicios, usted acepta el uso de los datos personales que nos proporcione.
                        </Typography>

                        <Typography sx={{ mt: 3 }}>
                            Toda la información que nos proporciones será tratada con la máxima confidencialidad y seguro. En caso de que no desees seguir compartiendo tu información con nosotros, puedes darte de baja en cualquier momento a <Link href="mailto:avizcainos@unicartagena.edu.co">nuestro correo</Link>.
                        </Typography>

                        <Typography sx={{ mt: 3 }} fontSize={10}>
                        En cumplimiento de las disposiciones de la Ley 1581 de 2012 y del Decreto reglamentario 1377 de 2013 que desarrollan el derecho de habeas data, solicitamos su autorización para que la App Mi Band Estres en calidad de Responsable del Tratamiento pueda recopilar, almacenar, archivar, copiar, analizar, usar y consultar los datos que se señalan a continuación. Estos datos serán recolectados por la APP con la finalidad de la captura del ritmo cardiaco y calculo del indice del estres mental.
                        </Typography>

                        <Button variant="contained" sx={{ mt: 4 }} fullWidth color="primary" onClick={() => setOpenPoliticas(false)}>
                            Aceptar
                        </Button>
                    </Box>
                </Modal>
            </div>
        )
    }

    export default ModalLegal;