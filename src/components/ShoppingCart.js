import React, {useState} from 'react'
import {Button, Drawer, Box, Stack, Typography} from '@mui/material'
import { useShoppingCart } from '../contexts/ShoppingCartContext'
import CartItem from './CartItem'
import { currencyFormatter } from '../utilities/currencyFormatter'
import { CircularProgress } from '@mui/material';

const ShoppingCart = () => {

    const {openDrawer, setOpenDrawer, shoppingCart, storeItems} = useShoppingCart()
    const [isLoading, setIsLoading] = useState(false)

    
    const handlePayment =  () => {
        setIsLoading(true)
        fetch('https://ecommerc-back.herokuapp.com/create-checkout-session',{
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {shoppingCart}
            )
        }).then(res => {
            if(res.ok) return res.json()
            res.json().then(json => Promise.reject(json))
        }).then((url) => {
            
            window.location.assign(url)
            
             
        }).catch(e => console.log(e.error))

        
        
    } 
    

  return (
    <Drawer
        anchor='right'
        open= {openDrawer}
        onClose={() => setOpenDrawer(false)}
        >
            <Stack sx={{width: 400, padding: 1.4}} spacing={2}>
                <Typography variant='h5' sx={{
                    fontWeight: 'bold',
                }}>Your Cart</Typography>
                {shoppingCart.map((item) => (
                    <CartItem key={item.id} {...item} />
                ))}
                
                
            </Stack>

            <Box display='flex' gap={2} justifyContent="center" alignItems="center" marginTop={1.2}>
                <Typography variant='h6'>
                    Total{" "}
                    {currencyFormatter(
                    shoppingCart.reduce((total, cartItem) => {
                        const item = storeItems.find(i => i.id === cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                    }, 0)
                    )}
                </Typography>
                <Button disabled={isLoading} variant='contained' onClick={handlePayment} >
                    
                    {isLoading? <CircularProgress size={24} sx={{color: 'black'}} /> : 'Pay'}
                </Button>
            </Box>
    </Drawer>
  )
}

export default ShoppingCart