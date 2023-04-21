import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import Topbar from '../header/Topbar';
import ClearButton from '../button/ClearButton';
import HistoryCard from '../card/HistoryCard';
import SearchRestaurantButton from '../button/SearchRestaurantButton';
import DeleteAllModal from '../modal/DeleteAllModal';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
    },
    box: {
        backgroundColor: '#FFFFFF',
        height: '100vh'
    },
    grid: {
        paddingTop: '2%'
    },
    title: {
        float: 'left'
    },
    searchRestaurant: {
        marginTop: '20% !important'
    },
    cardContainer: {
        paddingTop: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    }
}));

function HistoryFavoritePage() {
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
    const [open, setOpen] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        fetchFavoriteRestaurant();
        setIsLoaded(true);
    }, [isLoaded])

    const fetchFavoriteRestaurant = async() => {
        setIsDataLoading(true);
        if(localStorage.getItem("authenticated").length > 0) {
            var token = localStorage.getItem("authenticated");
        }
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        await fetch(`${process.env.REACT_APP_API_URL}/favoriterestaurant/all`, requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("data loaded");
                if(result.length === 0) {
                    setIsEmpty(true);
                }
                else {
                    setIsEmpty(false);
                    setFavoriteRestaurants(result);
                }
                setIsLoaded(true);
            },
            (error) => {
                console.log("Not loaded: ", error);
            }
        )
        setIsDataLoading(false);
    }

    const handleDeleteAllModalOpen = () => setOpen(true);

    const handleDeleteAllModalClose = () => setOpen(false);

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isDataLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Topbar />
            <DeleteAllModal open={open} type="favorite" setIsLoaded={setIsLoaded} setOpen={setOpen} handleClose={handleDeleteAllModalClose} />
            <Container className={classes.container} maxWidth="false">
                <Box className={classes.box}>
                    <Grid className={classes.grid} container>
                        <Grid item xs={6}>
                            <Typography variant="h4">
                                Favorites
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <ClearButton onClick={handleDeleteAllModalOpen} />
                        </Grid>
                            {isEmpty && 
                                <Grid className={classes.searchRestaurant} item xs={12}>
                                    <SearchRestaurantButton />
                                </Grid> 
                            }
                            {!isEmpty && favoriteRestaurants.map((restaurant, index) => {
                                return (
                                    <Grid key={index} className={classes.cardContainer} item xs={12}>
                                        <HistoryCard type="favorite" restaurant={restaurant} index={index} setIsLoaded={setIsLoaded} />
                                    </Grid> 
                                )
                            })}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default HistoryFavoritePage;
