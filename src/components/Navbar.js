import React from 'react'
import { AppBar, Container, Toolbar, Box, Button, IconButton, Badge, } from '@mui/material'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useShoppingCart } from '../contexts/ShoppingCartContext';



const Navbar = () => {


    const {getTotalCartItems, openDrawer, setOpenDrawer} = useShoppingCart()
    
    

  return (
    <AppBar position="sticky" sx={{backgroundColor: 'white', height: '50px', justifyContent: 'center' , alignItems: 'center'}}>
        <Container>
            <Toolbar>
                <Box sx={{flexGrow: 1, display: 'flex',}}>
                    <Button component={Link} to='/' size='small' sx={{color: 'gray'}}>Home</Button>
                    <Button component={Link} to='/store' size='small' sx={{color: 'gray'}}>Store</Button>
                    <Button component={Link} to='/about' size='small' sx={{color: 'gray'}}>About</Button>
                </Box>
                {getTotalCartItems() > 0 &&<IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                    <Badge badgeContent={getTotalCartItems()} color='error'>
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>}
                
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Navbar