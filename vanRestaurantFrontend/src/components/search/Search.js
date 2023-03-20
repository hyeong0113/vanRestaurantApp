import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    rootSection: {
        // top: '47%',
        // left: '60%',
        // position: 'absoulte',
        // transform: 'translateY(-50%)'
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    searchSection: {
        // display: 'flex'
    },
    searchField: {
        paddingRight: '10px !important'
    },
    buttonSection: {
        // paddingRight: '250px',
    },
    button: {
        background: '#FFFFFF !important',
        border: '3px solid rgba(103, 69, 18, 0.5) !important',
        borderRadius: '100px !important',
        width: '50px',
        height: '60px'
    },
}));

const Search = (props) => {
    const classes = useStyles();
    return(
        <Grid className={classes.rootSection} container alignItems="center">
            <Grid className={classes.searchSection} item>
                <TextField
                    id="search"
                    className={classes.searchField}
                    variant="outlined"
                    fullWidth
                    value={props.input}
                    onChange={props.locationNameOnChangeHandler}
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
                <Button className={classes.button} variant="contained" disableElevation onClick={props.locationNameOnClickHandler}>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Button>
            </Grid>
        </Grid>
    );
}

export default Search;