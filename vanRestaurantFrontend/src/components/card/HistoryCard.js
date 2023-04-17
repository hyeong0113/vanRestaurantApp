
import { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import HistoryFavoriteButton from '../button/HistoryFavoriteButton';
import { makeStyles } from '@mui/styles';
import HistoryReviewButton from '../button/HistoryReviewButton';
import DeleteByIdModal from '../modal/DeleteByIdModal';

const useStyles = makeStyles((theme) => ({
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
        overflow: 'hidden',
        minWidth: 289
    },
    favoriteButton: {
        textAlign: 'right',
        marginRight: '3% !important',
        marginTop: '2% !important',
    },
    nameText: {
        fontWeight: '400 !important',
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

    const { restaurant, setIsLoaded, type } = props;
    const { photo, rating, name, address, url, placeId } = restaurant;
    const classes = useStyles();

    const handleDeleteByIdModalOpen = () => setOpen(true);

    const handleDeleteByIdModalClose = () => setOpen(false);

    return(
        <div>
            <DeleteByIdModal open={open} type={type} placeId={placeId} setIsLoaded={setIsLoaded} setOpen={setOpen} handleClose={handleDeleteByIdModalClose} />
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
                            <HistoryFavoriteButton isSelected={isSelected} onFavoriteButtonClick={handleDeleteByIdModalOpen} />
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