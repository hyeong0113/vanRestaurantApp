import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import { MapContext } from '../context/MapContext';

const useStyles = makeStyles((theme) => ({
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

const Search = () => {
    const { input, locationNameOnChangeHandler, locationNameOnClickHandler } = useContext(MapContext);
    const classes = useStyles();
    return(
        <Grid container alignItems="center">
            <Grid className={classes.searchSection} item>
                <TextField
                    id="search"
                    className={classes.searchField}
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={locationNameOnChangeHandler}
                    InputProps={{
                        style: {
                            width: '550px',
                            background: 'rgba(255, 255, 255, 0.78)',
                            border: '2px solid rgba(103, 69, 18, 0.62)',
                            borderRadius: '9px'
                        }
                    }}
                />
            </Grid>
            <Grid className={classes.buttonSection} item>
                <IconButton className={classes.button} variant="contained" onClick={locationNameOnClickHandler}>
                    <SearchIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default Search;