
import { useState , useEffect } from "react"
import Header from "./Componentes/Header"
import { db } from "./data/db"
import Guitarra from "./Componentes/Guitarra"

function App() {

  const initialCart = () => {
    const cart = localStorage.getItem('cart') 
    return cart ? JSON.parse(cart) : []
  }
  
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(db)
  const [cart , setCart] = useState (initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

useEffect(() => {
  localStorage.setItem('cart' , JSON.stringify(cart))
} , [cart])

  function addToCart(item){
    console.log('agregando...')
    setCart(prevCart => [ ...prevCart, item])

    const itemExist = cart.findIndex ((guitar) => guitar.id === item.id)
    if (itemExist >= 0 ) {
      if(cart[itemExist].quantity >= MAX_ITEMS) return
      console.log('El item ya existe')
      const updateCart = [...cart]
      updateCart[itemExist].quantity++
      setCart(updateCart)
    } else {
      item.quantity = 1 
      console.log('El item no existe')
      setCart([...cart, item])
    }
    console.log(itemExist)

  }

  function removeFromCart(id){
    console.log('eliminando...')
    setCart(prevCart => prevCart.filter(guitarra => guitarra.id !== id))
    
  }

  function increaseQuantity(id){
    console.log('aumentando cantidad...')
    const updateCart = cart.map( item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity : item.quantity + 1
        }
      }
      return item 
    })
    setCart(updateCart)

  }

  
  function decreaseQuantity(id){
    console.log(' disminuyendo cantidad...')
    const updateCart = cart.map( item => {
      if (item.id === id && item.quantity > MIN_ITEMS ) {
        return {
          ...item,
          quantity : item.quantity - 1
        }
      }
      return item 
    })
    setCart(updateCart)

  }

  function clearCart(){
    setCart([])
  }

  return (
    <>
    <Header

    cart={cart}
    removeFromCart={removeFromCart}
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
    clearCart={clearCart}

    
    />
    <main className="container-xl mt-5">
      
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {
         
         data.map(guitarra => (
            <Guitarra key={guitarra.id}  guitarra= {guitarra}  setCart={setCart} addToCart={addToCart}
            />
          ))
        }

        </div>
    </main>
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
