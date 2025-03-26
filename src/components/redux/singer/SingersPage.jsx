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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress size={100} />
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

// const status = useSelector(state => state.singers.status);
// const error = useSelector(state => state.singers.error);

// useEffect(() => {
//     if (status === 'idle') {
//         dispatch(fetchSingers());
//     }
// }, [status, dispatch]);

// let content;

// if (status === 'loading') {
//     content = <CircularProgress />;
// } else if (status === 'succeeded') {
//     content = singers.map(singer => (
//         <SingerCard key={singer.id} singer={singer} />
//     ));
// } else if (status === 'failed') {
//     content = <div>{error}</div>;
// }

// return (
//     <div>
//         <Typography variant="h4" sx={{ marginBottom: 2 }}>Singers</Typography>
//         <Grid container spacing={3}>
//             {content}
//         </Grid>
//     </div>
// );
