import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        '& .MuiBackdrop-root' : {
            opacity: '0 !important'
        }
    },
    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '21%',
        width: '30%',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 3px rgba(125, 125, 125, 0.4)',
        borderRadius: 10
    },
    warningText: {
        textAlign: 'center',
        marginTop: '8% !important'
    },
    modalGridItem: {
        marginTop: '10% !important',
        textAlign: 'center'
    },
    removeButton: {
        width: '60% !important',
        height: '100% !important',
        backgroundColor: '#FF4A4A !important',
        color: '#FFFFFF !important',
        borderRadius: '10px !important',
    },
    cancelButton: {
        width: '60% !important',
        height: '100% !important',
        backgroundColor: 'rgba(125, 125, 125, 0.8) !important',
        color: '#FFFFFF !important',
        borderRadius: '10px !important'
    }
}));

const DeleteByIdModal = (props) => {
    const [isDataLoading, setIsDataLoading] = useState(false);
    const { open, type, placeId, setIsLoaded, setOpen, handleClose } = props;
    const classes = useStyles();
    let navigate = useNavigate();

    const handleRemoveButton = async() => {
        setIsDataLoading(true);

        if(localStorage.getItem("authenticated").length > 0) {
            let tokenValue = null;
            let token = null;
            tokenValue = localStorage.getItem("authenticated");
            token = 'Bearer ' + tokenValue;

            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    placeId: placeId
                })
            };
    
            try {
                let response = await fetch(`${process.env.REACT_APP_API_URL}/${type}restaurant/delete`, requestOptions);
                let convertedResponse = await response.json();
                if(!convertedResponse.success) {
                    throw new Error(convertedResponse.message);
                }
                console.log(convertedResponse.response);
                setOpen(false);
                setIsLoaded(false);
                navigate(`/history/${type}`);
            }
            catch(error) {
                console.log("Failed to delete:: ", error.message);
            }
        }
        setIsDataLoading(false);
    }

    return(
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={classes.modalBox}>
                <Grid container>
                    <Grid className={classes.warningText} item xs={12}>
                        <Typography variant="h6">
                            Are you sure to remove from {type} list?
                        </Typography>
                    </Grid>
                    <Grid className={classes.modalGridItem} item xs={6}>
                        <Button className={classes.removeButton} onClick={handleRemoveButton}>
                            <Typography variant="body1">
                                Remove
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid className={classes.modalGridItem} item xs={6}>
                        <Button className={classes.cancelButton} onClick={handleClose}>
                            <Typography variant="body1">
                                Cancel
                            </Typography>
                        </Button>
                    </Grid>                                          
                </Grid>

            </Box>
        </Modal>
    )



}

export default DeleteByIdModal;