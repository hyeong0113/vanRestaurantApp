import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    rootSection: {
        marginTop: '10px !important'
    },
    searchSection: {
        paddingLeft: '360px !important'
    },
    searchField: {
        '& .MuiOutlinedInput-root': {
            height: '50px !important',
            border: '1px solid rgba(0, 0, 0, 0.12) !important',
            borderRadius: '15px',
            backgroundColor: 'rgba(255, 242, 208, 0.39) !important'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            height: '50px !important',
            border: 'none',
            borderRadius: '15px',
            color: 'rgba(0, 0, 0, 0)'
        },
        // '& .MuiInputBase-input': {
        //     color: 'rgba(255, 242, 208, 0.39) !important',
        // },
        width: '580px !important',
    },
    buttonSection: {
        paddingRight: '250px',
    },
    button: {
        background: 'rgba(255, 184, 0, 0.84) !important',   
        border: '1px solid rgba(0, 0, 0, 0.12) !important',
        borderRadius: '10px !important',
        height: '50px',
        // marginBottom: '5px !important',
        marginRight: '30px !important'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600'
    }
}));

const Search = (props) => {
    const classes = useStyles();
    return(
        <Grid className={classes.rootSection} container spacing={1} alignItems="flex-end">
            <Grid className={classes.searchSection} item xs={7}>
                <TextField
                    id="search"
                    className={classes.searchField}
                    variant="outlined"
                    fullWidth
                    value={props.input}
                    onChange={props.locationNameOnChangeHandler}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                />
            </Grid>
            <Grid className={classes.buttonSection} item xs={4}>
                <Button className={classes.button} variant="contained" disableElevation onClick={props.locationNameOnClickHandler}>
                    <Typography className={classes.buttonText} variant="body4">
                        Search
                    </Typography>
                </Button>
                <Button className={classes.button} variant="contained" disableElevation onClick={props.myLocationOnClickHandler}>
                    <Typography className={classes.buttonText} variant="body4">
                        My location
                    </Typography>                    
                </Button>
            </Grid>
            {/* <Grid item xs={2}>

            </Grid> */}
        </Grid>
    );
}

export default Search;