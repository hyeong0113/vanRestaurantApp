import { useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { StandaloneSearchBox } from "@react-google-maps/api";

import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import { MapContext } from '../context/MapContext';

const useStyles = makeStyles((theme) => ({
    search: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    searchField: {
        paddingRight: '10px !important'
    },
    button: {
        background: '#FFFFFF !important',
        border: '3px solid rgba(103, 69, 18, 0.5) !important',
        borderRadius: '100px !important',
        width: '60px',
        height: '60px'
    },
}));

const Search = (props) => {
    const { fetchRestaurantsByName } = useContext(MapContext);
    const classes = useStyles();
    const style = {
        background: 'rgba(255, 255, 255, 0.78)',
        border: '2px solid rgba(103, 69, 18, 0.62)',
        borderRadius: '9px'
    };
    const [place, setPlace] = useState('');
    const placeRef = useRef();

    const handlePlaceChanged = () => {
        const [ placeReceived ] = placeRef.current.getPlaces();
        setPlace(placeReceived.formatted_address);
    };

    const onChangeHandler = (event) => {
        setPlace(event.target.value);
    }
    const onClickHandler = async() => {
        props.setSelectedButton("restaurants");
        await fetchRestaurantsByName(place);
    }

    const onKeyPressHandler = async(event) => {
        if (event.key === 'Enter') {
            props.setSelectedButton("restaurants");
            await fetchRestaurantsByName(place);
        }  
    }    

    return(
        <Grid container justifyContent="flex-end">
            <Grid item lg={11} md={6} xs={2}>
                <div className={classes.search}>
                    <StandaloneSearchBox
                            onLoad={ref => placeRef.current = ref}
                            onPlacesChanged={handlePlaceChanged}>                
                        <TextField
                            id="search"
                            variant="outlined"
                            sx={{
                                "& .MuiInputBase-root": {
                                    width: { xs: '200px', sm: '300px', md: '400px', lg: '550px' },
                                }
                            }}
                            value={place}
                            label="Enter a location or address"
                            onKeyDown={onKeyPressHandler}
                            onChange={onChangeHandler}
                            InputProps={{style}}
                        />
                    </StandaloneSearchBox>
                </div>
            </Grid>
            <Grid item lg={1}>
                <IconButton className={classes.button} variant="contained" onClick={onClickHandler}>
                    <SearchIcon />
                </IconButton>
            </Grid>            
        </Grid>
    );
}

export default Search;