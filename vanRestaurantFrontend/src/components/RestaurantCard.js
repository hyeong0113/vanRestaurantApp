import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import '../styles/RestaurantCard.css';

function RestaurantCard() {


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
                    <Typography variant="h5" component="h2">
                    Example Title
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Example description goes here.
                    </Typography>
                </CardContent>
            </Box>
      </Card>
    );
}

export default RestaurantCard;