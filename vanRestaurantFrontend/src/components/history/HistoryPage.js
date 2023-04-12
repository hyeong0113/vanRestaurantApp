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

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
    },
    box: {
        backgroundColor: '#FFFFFF',
        height: '100vh'
    },
    grid: {
        // transform: 'translateX(20%)'
        paddingTop: '2%'
    },
    title: {
        float: 'left'
    },
}));

function HistoryPage() {
    const [isDataLoading, setIsDataLoading] = useState(false);

    const classes = useStyles();

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
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default HistoryPage;
