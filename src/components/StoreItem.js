import React from 'react'
import { useContext } from 'react'
import {Card, Button} from "react-bootstrap"
import { ShoppingCartContext } from '../context/ShoppingCartContext'
const StoreItem = ({id, name, price, imgUrl}) => {

    const{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useContext(ShoppingCartContext)
    const quantity=getItemQuantity(id);
    // console.log(quantity)
  return (
    <Card className="h-100">
                            <Card.Img
                                variant="top"
                                src={imgUrl}
                                height="200px"
                                style={{objectFit:"cover"}}
                                />

                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                                <span className="fs-2">{name}</span>    
                                <span className="ms-2 text--muted">{price}</span>

                            </Card.Title>
                            <div className="mt-auto">
                                {quantity === 0 ? (
                                     <Button className="w-100" onClick={()=> increaseCartQuantity(id)}>+ Add To Cart</Button>
                                ):(
                                <div className="d-flex align-items-center flex-column">
                                    <div className="d-flex align-items-center justify-content-center"
                                    style={{gap:".5rem"}}> 
                                        <Button onClick={()=> decreaseCartQuantity(id)}>-</Button>
                                        <div>
                                            <span className="fs-3">{quantity}</span>
                                        
                                        </div>
                                        <Button onClick={()=>increaseCartQuantity(id)}>+</Button>
                                    </div>
                                        <Button variant="danger" size="sm" onClick={()=>removeFromCart(id)}>Remove</Button>
                                </div>)}

                                </div>
                            
                            {/* <Button className="w-100">+ Add To Cart</Button>     */}
                        </Card.Body>        
                    </Card>
  )
}
export default StoreItem
