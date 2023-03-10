import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    searchField: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                border: '1px solid rgba(0, 0, 0, 0.12) !important', // Change the color here
            },
            '&:hover fieldset': {
                border: '1px solid rgba(0, 0, 0, 0.12) !important', // Change the color here
            },
            '& fieldset': {
                border: '1px solid rgba(0, 0, 0, 0.12) !important', // Change the color here
            },
        },
        background: 'rgba(255, 242, 208, 0.39)',
        // border: '1px solid rgba(0, 0, 0, 0.12) !important',
        borderRadius: '15px',
        width: '60% !important'
    },
    buttonText: {
        color: '#FFFFFF'
    }
}));

const Search = (props) => {
    const classes = useStyles();
    return(
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={9}>
                <TextField
                    id="search"
                    className={classes.searchField}
                    variant="outlined"
                    fullWidth
                    value={props.input}
                    onChange={props.locationNameOnChangeHandler}
                />
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined" color="secondary" onClick={props.locationNameOnClickHandler}>
                    <Typography>
                        Search
                    </Typography>
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button variant="outlined" color="secondary" onClick={props.myLocationOnClickHandler}>
                    <Typography>
                        My location
                    </Typography>                    
                </Button>
            </Grid>
        </Grid>
    );
}

export default Search;