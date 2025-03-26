import React from "react";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const SingerCard = ({ singer }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            height="300"
            image={`data:image/jpg;base64,${singer.image}`}
            alt={singer.name}
        />
        <CardContent>
            <Typography variant="h6">{singer.name}</Typography>
            {/* <Typography variant="body2" color="textSecondary">
            {singer.genre}
            </Typography> */}
        </CardContent>
        </Card>
    );
    }

export default SingerCard;