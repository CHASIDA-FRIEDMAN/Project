import React from "react";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const CategoryCard = ({ category }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            height="300"
            image={`data:image/jpg;base64,${category.image}`}
            alt={category.name}
        />
        <CardContent>
            <Typography variant="h6">{category.name}</Typography>
        </CardContent>
        </Card>
    );
    }

export default CategoryCard;