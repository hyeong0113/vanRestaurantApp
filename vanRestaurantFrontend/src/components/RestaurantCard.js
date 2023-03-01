import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import styled from 'styled-components';

import '../styles/RestaurantCard.css';

const CardHeaderDiv = styled.div`
    display: flex;
    align-items: center;
`

function RestaurantCard() {
    // const theme = useTheme();
    // console.log(theme);
    return(
        <Card className="restaurant-card" variant="outlined" sx={{ border: 1 }}>
            <Box display="flex">
                <CardMedia
                    component="img"
                    height="180"
                    width="200"
                    image="https://example.com/example.jpg"
                    alt="Example Photo"
                />
                <Box borderLeft={1} borderColor="grey.500" pl={1} />
                <CardContent>
                    <CardHeaderDiv>
                        <Chip label={
                            <Typography className="chip-font">
                                OPEN
                            </Typography>
                        } color="primary" />
                        <Typography className="rating" variant="body1">
                            Rating: 4.8
                        </Typography>
                    </CardHeaderDiv>
                    <Typography className="name" variant="h5">
                        Restaurant title
                    </Typography>
                    <Typography className="status" variant="h6" color="textSecondary">
                        Operational
                    </Typography>
                </CardContent>
            </Box>
      </Card>
    );
}

export default RestaurantCard;