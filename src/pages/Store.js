import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import StoreItem from '../components/StoreItem.js'
import { useShoppingCart } from '../contexts/ShoppingCartContext.js'


const Store = () => {

    const {storeItems} = useShoppingCart()
  return (
    <Container>
        <Typography variant='h4' marginTop={3}>
            Store
        </Typography>
        <Grid marginTop={.5} container spacing={3}>
            {storeItems.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} >
                    <StoreItem {... item} />
                </Grid>
            ))}     
        </Grid>
        
    </Container>
  )
}

export default Store