import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
// import { useEffect, useState } from "react";
// import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import BasketSummary from "./BasketSummary";
// import LoadingComponent from "../../app/layout/LayoutComponent";
// import { Basket } from "../../app/models/basket";

export default function BasketPage() {
    // const [loading, setLoading] = useState(true);
    // const [basket, setBasket] = useState<Basket | null>(null);

    // useEffect(() => {
    //     agent.Basket.get()
    //         .then(basket => setBasket(basket))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false))
    // }, [])

    // if (loading) return <LoadingComponent message='Loading basket...' />
    const {basket, setBasket, removeItem} = useStoreContext();
    //const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    function handleAddItem(productId: number, name: string) {
        setStatus({loading: true, name});
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({loading: false, name: ''}))
    }

    function handleRemoveItem(productId: number, quantity = 1, name: string) {
        setStatus({loading: true, name});
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() =>  setStatus({loading: false, name: ''}))
    }

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
                <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map(item => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {/* {item.name} */}
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                            <TableCell align="center">
                                <LoadingButton onClick={() => handleRemoveItem(item.productId, 1, 'rem')} loading={status.loading && status.name === 'rem' + item.productId} color='error'>
                                    <Remove />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton onClick={() => handleAddItem(item.productId, 'add')} loading={status.loading && status.name === 'add' + item.productId} color='secondary'>
                                    <Add />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">${((item.price * item.quantity) / 100).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <LoadingButton onClick={() => handleRemoveItem(item.productId, item.quantity, 'del')} loading={status.loading && status.name === 'del' + item.productId} color='error'>
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6}>
                <BasketSummary />
                <Button
                    component={Link}
                    to='/checkout'
                    variant='contained'
                    size='large'
                    fullWidth
                >
                    Checkout
                </Button>
            </Grid>
        </Grid>
        </>


    )
}