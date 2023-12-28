import { useContext } from "react"
import WishlistItem from "./Wishlisttem"
import { WishlistContext } from "../../context/WishlistContext"

const WishlistContent = () => {

  const {wishlist} = useContext(WishlistContext)
  console.log(wishlist.items);
  return (
    <>
      {
        wishlist.items.map(item => {
          return (
            <WishlistItem key={item.id} id={item.id} image={item.image} title={item.title} price={item.price} />
          )
        })
      }
    </>
  )
}

export default WishlistContent