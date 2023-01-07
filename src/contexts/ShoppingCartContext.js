import { createContext, useContext, useEffect, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import {useLocalStorage} from '../hooks/useLocalStorage'


const ShoppingCartContext = createContext();



export const  useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}




export const ShoppingCartProvider = ({children}) =>{
    const [shoppingCart, setShoppingCart] = useLocalStorage("shopping-cart",[])
    const [openDrawer, setOpenDrawer]= useState(false)
    const [storeItems, setStoreItems] = useState([])

    const fetchStoreItems = async () => {
      fetch('https://express-api-rqvb.onrender.com/store-items').then(res => {
       if(res.ok) return res.json()
        res.json().then(json => Promise.reject(json))
      }).then((items) => setStoreItems(items))
      
    }

    useEffect(() => {
      fetchStoreItems()
      
    },[])

    function getItemQuantity(id) {
        return shoppingCart.find(item => item.id === id)?.quantity || 0
    }


    function increaseCartQuantity(id) {
        setShoppingCart(currItems => {
          if (currItems.find(item => item.id === id) == null) {
            return [...currItems, { id, quantity: 1 }]
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
              } else {
                return item
              }
            })
          }
        })
      }
    function decreaseCartQuantity(id) {
        setShoppingCart(currItems => {
          if (currItems.find(item => item.id === id) === 1) {
            return currItems.filter(item => item.id !== id)
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
              } else {
                return item
              }
            })
          }
        })
      }

      const removeFromCart = (id) => {
        return setShoppingCart(currItems => currItems.filter(item => item.id !== id))
      }


      const getTotalCartItems = () => {
        let total = 0
        shoppingCart.map(item => {
           return total+= item.quantity
        })
        return total
      }
  
      

    return(
        <ShoppingCartContext.Provider value={
            {
                shoppingCart,
                increaseCartQuantity,
                getItemQuantity,
                decreaseCartQuantity,
                removeFromCart,
                getTotalCartItems,
                openDrawer,
                setOpenDrawer,
                storeItems
            }
        }>
            {children}
            <ShoppingCart  />
        </ShoppingCartContext.Provider>
    )
    
}