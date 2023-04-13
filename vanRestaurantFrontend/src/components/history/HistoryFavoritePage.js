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

    const [isLoaded, setIsLoaded] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        fetchFacoriteRestaurant();
        setIsLoaded(true);
    }, [isLoaded])

    const fetchFacoriteRestaurant = async() => {
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
                const { favoriteRestaurants } = result;
                if(favoriteRestaurants.length === 0) {
                    setIsEmpty(true);
                }
                else {
                    setFavoriteRestaurants(favoriteRestaurants);
                }
            },
            (error) => {
                console.log("Not loaded: ", error);
            }
    )
        setIsDataLoading(false);
    }

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isDataLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Topbar />
            <Container className={classes.container} maxWidth="false">
                <Box className={classes.box}>
                    <Grid className={classes.grid} container>
                        <Grid item xs={6}>
                            <Typography variant="h4">
                                Favorites
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <ClearButton />
                        </Grid>
                            {isEmpty && 
                                <Grid className={classes.searchRestaurant} item xs={12}>
                                    <SearchRestaurantButton />
                                </Grid> 
                            }
                            {favoriteRestaurants.length > 0 && favoriteRestaurants.map((restaurant, index) => {
                                return (
                                    <Grid key={index} className={classes.cardContainer} item xs={12}>
                                        <HistoryCard restaurant={restaurant} index={index} />
                                    </Grid> 
                                )
                            })}
                    </Grid>
                    {/* <Grid className={classes.cardContainer} container>
 
                    </Grid> */}
                </Box>
            </Container>
        </div>
    );
}

export default HistoryFavoritePage;
