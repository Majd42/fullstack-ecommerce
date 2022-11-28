import { Card, CardContent, CardMedia, Box, Typography, CardActions, Button, IconButton } from '@mui/material'
import React from 'react'
import {currencyFormatter} from '../utilities/currencyFormatter'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useShoppingCart } from '../contexts/ShoppingCartContext';


const StoreItem = ({id, name, price, imgUrl}) => {

    const {getItemQuantity,
         increaseCartQuantity,
         removeFromCart,
          decreaseCartQuantity} = useShoppingCart()
    const quantity = getItemQuantity(id)

    

  return (
    <Card sx={{paddingBottom:'1rem'}}>
        <CardMedia 
            component='img'
            image={imgUrl}
            sx={{
                height: '200px',
                objectFit: 'cover'
            }}
        />
        <CardContent>
            <Box sx={{display: 'flex', justifyContent: 'space-between', }}>
                <Typography variant='h5'>{name}</Typography>
                <Typography variant='h6' fontWeight='bold'>{currencyFormatter(price)}</Typography>
            </Box>
        </CardContent>
        <CardActions sx={{display:'flex', flexDirection: 'column'}}>
            {quantity === 0 ? <Button variant='contained' sx={{width: '100%'}} onClick={() => increaseCartQuantity(id)} >+ Add to Cart</Button> :
                
                <Box sx={{marginTop: 2}} >
                    <IconButton onClick={() => increaseCartQuantity(id)}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                    <span style={{fontWeight:'bold', fontFamily: 'sans-serif', fontSize:'15px'}}>{quantity}</span>
                    <IconButton onClick={() => decreaseCartQuantity(id) } >
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                    <Button color="error" variant="contained" sx={{marginLeft: 2}} onClick= {() => removeFromCart(id)} >
                        Remove item
                    </Button>
                    
                </Box>
            
            }
            
                
            
            
        </CardActions>
    </Card>
  )
}

export default StoreItem