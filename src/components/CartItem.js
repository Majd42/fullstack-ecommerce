import { IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { currencyFormatter } from '../utilities/currencyFormatter'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useShoppingCart } from '../contexts/ShoppingCartContext'



const CartItem = ({id, quantity}) => {

    const{removeFromCart, storeItems} = useShoppingCart()

    const item= storeItems.find(i => i.id ===id)

    const TotalItemPrice = item.price*quantity

  return (
    <Paper sx={{padding: 1.2, display: 'flex', gap: 2 }} elevation={2}>
        <img src={item.imgUrl}
            style={{width: '130px',
                    height: '80px',
                    objectFit: 'cover'
        }}
        />
        <Box sx={{display:'flex',flexGrow: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', gap:.3,}}>
            <Typography variant='body2' >{item.name}
                <span style={{fontSize:'12px', marginLeft:'6px', color:'grey',}} >*{quantity}</span>
            </Typography>
            <Typography color='gray' variant='subtitle2'>{currencyFormatter(item.price)}</Typography>
            
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf:'flex-end', }} >
            <Typography marginTop={.7} variant="subtitle2" color="gray">{currencyFormatter(TotalItemPrice)}</Typography>
            <IconButton color='error' onClick={()=>removeFromCart(id)}>
                <CancelPresentationIcon />
            </IconButton>
        </Box>

    </Paper>
  )
}

export default CartItem