import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import CartItem from "./CartItem"

const CartContent = () => {

  const {cart} = useContext(CartContext)
  console.log(cart.items);
  return (
    <>
      {
        cart.items.map(item => {
          return (
            <CartItem key={item.id} id={item.id} image={item.image} title={item.title} price={item.price} quantity={item.quantity} />
          )
        })
      }
    </>
  )
}

export default CartContent