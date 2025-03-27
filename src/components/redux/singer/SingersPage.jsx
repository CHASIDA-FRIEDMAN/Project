import React,{ useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingers } from "./SingerSlice";
import { Grid, Typography, CircularProgress } from "@mui/material";
import SingerCard from "./SingerCard";

const SingersPage = () => {
    const dispatch = useDispatch();
    const singers = useSelector(state => state.singer.singers);

    useEffect(() => {
        dispatch(fetchSingers());
    }, [dispatch]);

    return (
        <div>
            <Typography variant="h4" align="center" color="white">All Singers</Typography>
            {singers.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' ,color:"white"}}>
                    <CircularProgress size={100} color="inherit" />
                </div>
            ) : (
                <Grid container spacing={3}>
                    {singers.map((singer) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={singer.id}>
                            <SingerCard singer={singer} />
                        </Grid>
                    ))}
                </Grid>)}
        </div>
    );
}
export default SingersPage;
