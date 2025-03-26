import React,{ useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories} from "./categorySlice";
import { Grid, Typography, CircularProgress } from "@mui/material";
import CategoryCard from "./CategoryCard";

const CategoriesPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div>
            <Typography variant="h4" align="center" color="white">All Categories</Typography>
            {categories.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress size={100} />
                </div>
            ) : (
                <Grid container spacing={3}>
                    {categories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                            <CategoryCard category={category} />
                        </Grid>
                    ))}
                </Grid>)}
        </div>
    );
}
export default CategoriesPage;
