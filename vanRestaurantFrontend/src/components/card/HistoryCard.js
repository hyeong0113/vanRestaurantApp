
import { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import HistoryFavoriteButton from '../button/HistoryFavoriteButton';
import { makeStyles } from '@mui/styles';
import HistoryReviewButton from '../button/HistoryReviewButton';

const useStyles = makeStyles((theme) => ({
    // modal begin
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
    },
    // Modal end
    card: {
        height: '290px',
        width: '970px',
        border: '1px solid rgba(122, 122, 122, 0.26) !important',
        borderRadius: '10px 10px 8px 8px !important',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
        display: 'flex'
    },
    container: {
        rowGap: '5px',
    },
    photo: {
        marginTop: '1.3% !important',
        marginLeft: '2% !important',
        borderRadius: '10px',
        overflow: 'hidden'
    },
    favoriteButton: {
        textAlign: 'right',
        marginRight: '3% !important',
        marginTop: '2% !important',
    },
    nameText: {
        fontWeight: '400 !important',
    },
    text: {
        fontWeight: '400 !important',
        maxWidth: "100%",
        overflow: "hidden",
        whiteSpace: 'nowrap',
        textOverflow: "ellipsis",
    },
    rating: {
        display: 'flex'
    },
    ratingIcon: {
        paddingTop: '1.5%',
        paddingRight: '4%'
    },
    ratingScore: {
        lineHeight: '1.5 !important'
    },
    review: {
        lineHeight: '1.7 !important'
    },
    addressText: {
        lineHeight: '1.8 !important'
    },
    leftItem: {
        textAlign: 'left',
        paddingLeft: '5%',
        paddingTop: '2.5% !important',
    },
    rightItem: {
        textAlign: 'left',
        paddingTop: '2.5% !important',
    },
    buttonCanainer: {
        position: 'relative',
        transform: 'translateY(-550%)'
    }
}));

const HistoryCard = (props) => {
    const [isSelected, setIsSelected] = useState(true);
    const [open, setOpen] = useState(false);

    const { restaurant, index } = props;
    const classes = useStyles();
    const { photo, rating, name, address, url, placeId } = restaurant;
    
    const onFavoriteButtonClick = () => {
        setIsSelected((isSelected) => !isSelected);
    }

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    return(
        <div>
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
                                Are you sure to remove from favorite list?
                            </Typography>
                        </Grid>
                        <Grid className={classes.modalGridItem} item xs={6}>
                            <Button className={classes.removeButton}>
                                <Typography variant="body1">
                                    Remove
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid className={classes.modalGridItem} item xs={6}>
                            <Button className={classes.cancelButton}>
                                <Typography variant="body1">
                                    Cancel
                                </Typography>
                            </Button>
                        </Grid>                                          
                    </Grid>


                </Box>
            </Modal>
            <Card className={classes.card} variant="outlined">
                <CardMedia
                    className={classes.photo}
                    component="img"
                    src={`data:image/png;base64,${photo}`}
                    height={265}
                    width={400}
                />
                <CardContent>
                    <Grid className={classes.container} rowSpacing={4} container>
                        <Grid className={classes.favoriteButton} item xs={12}>
                            <HistoryFavoriteButton isSelected={isSelected} onFavoriteButtonClick={handleOpen} />
                        </Grid>
                        <Grid className={classes.leftItem} item xs={6}>
                            <Typography className={classes.nameText} variant="h5">
                                {name}
                            </Typography>
                        </Grid>
                        <Grid className={classes.rightItem} item xs={6}>
                            <div className={classes.rating}>
                                <StarIcon className={classes.ratingIcon} fontSize='medium' />
                                <Typography className={classes.ratingScore} variant="h5">
                                    {rating}
                                </Typography>  
                            </div>                         
                        </Grid>
                        <Grid className={classes.leftItem} item xs={6}>
                            <Typography className={classes.review} variant="h5">
                                Reviews
                            </Typography>
                        </Grid>
                        <Grid className={classes.rightItem} item xs={6}>
                            <HistoryReviewButton url={url} />
                        </Grid>
                        <Grid className={classes.leftItem} item xs={6}>
                            <Typography variant="h5">
                                Address
                            </Typography>
                        </Grid>
                        <Grid className={classes.rightItem} item xs={6}>
                            <Typography className={classes.addressText} variant="h6">
                                {address}
                            </Typography>                            
                        </Grid>
                    </Grid>       
                </CardContent>
            </Card>
        </div>
    );
}

export default HistoryCard;