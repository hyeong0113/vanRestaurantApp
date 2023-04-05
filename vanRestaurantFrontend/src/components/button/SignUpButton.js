import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    button: {
        height: '102%',
        width: '70%',
        backgroundColor: '#C98E1C !important',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        border: 'none',
        borderRadius: '5px'
    },
    text: {
        fontSize: 17,
        verticalAlign: 'super',
        color: '#FFFFFF',
        fontWeight: '560 !important',
    }
}));

const SignUpButton = () => {
    const classes = useStyles();
    return(
        <Button className={classes.button} LinkComponent={Link} to="/signup">
            <Typography className={classes.text}>
                SIGN UP
            </Typography>
        </Button>
    )
}

export default SignUpButton;