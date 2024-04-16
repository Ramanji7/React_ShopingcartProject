import React, { useState } from 'react'
import { createContext } from 'react'
import { ShoppingCart } from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';


export const ShoppingCartContext = createContext({});


export function ShoppingCartProvider({children}){
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart",[]);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,0
    );

    const getItemQuantity = (id) => {

        console.log(cartItems, id)
        console.log(cartItems.find((item) => item.id === id))
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }
    
    const increaseCartQuantity = (id)=> {
        // console.log('test')
        setCartItems((currItems) =>{
            // console.log('test2')
            if(currItems.find((item)=> item.id===id)==null){
            // console.log('test3')
                
                return [...currItems,{id, quantity:1}];

            }
            else{
                return currItems.map((item)=>{
                    if(item.id===id){
                        return{...item, quantity:item.quantity +1};
                    }
                    else{
                        return item;
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id)=> {
        setCartItems((currItems) =>{
            if(currItems.find((item)=> item.id===id)?.quantity===1){
                return currItems.filter((item)=>item.id !==id);

            }
            else{
                return currItems.map((item)=>{
                    if(item.id===id){
                        return{...item, quantity:item.quantity -1};
                    }
                    else{
                        return item;
                    }
                })
            }
        })
    }

    const removeFromCart = (id)=>{
        setCartItems((currItems)=>{
            return currItems.filter((item)=> item.id !==id);
        })
    }


    return(
        <ShoppingCartContext.Provider
        value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartQuantity,
            cartItems,
            isOpen,
            openCart,
            closeCart,
        }   
        }>
            {children}
            <ShoppingCart/>
        </ShoppingCartContext.Provider>
    )
}