import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    button: {
        height: '100%',
        width: '20%',
        // backgroundColor: 'rgba(239, 198, 119, 0.82) !important',
        background: '#000000 !important',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        border: 'none',
        borderRadius: '10px !important'
    },
    text: {
        fontSize: 17,
        // verticalAlign: 'super',
        color: '#FFFFFF',
        fontFamily: 'Manrope, sans-serif !important',
        fontStyle: 'normal',
        fontWeight: 500,
    }
}));

const ClearButton = (props) => {
    const { onClick } = props;
    const classes = useStyles();
    return(
        <Button className={classes.button} onClick={onClick}>
            <Typography className={classes.text}>
                Clear
            </Typography>
        </Button>
    )
}

export default ClearButton;