import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import FormatNumber from '../util/FormatNumber';
import { doc, collection, setDoc, serverTimestamp, updateDoc, increment } from "firebase/firestore";
import db from '../util/firebaseConfig';
import Swal from 'sweetalert2';

const Cart = () => {
    const cart = useContext(CartContext);

    // estado para el form
    const [formValue, SetFormValue] = useState({});
    // funcion para actualizar el estado
    const handleChange = (e) => {
        SetFormValue({
            ...formValue,
            [e.target.name]:e.target.value
        });
    }
    
    // funcion para crear la orden
    const orderCreated = () => {

      // el esquema de la orden con los datos
        let order = {
          buyer: formValue,
          items: cart.cartList.map( item => ({
            id: item.idItem,
            title: item.titleItem,
            price: item.priceItem
          })),
            total: cart.calcTotal(),
            date: serverTimestamp()
        };
        
        // crear la coleccion de la orden en la bd
        const orderInFirestore = async () => {
          const sendOrder = doc(collection(db, "orders"));
          await setDoc(sendOrder, order);
          return sendOrder;
        }

          orderInFirestore()
          .then(result => 
            Swal.fire({
            title:`Orden creada. Gracias por su compra ${formValue.nombre}.`,
            text: 'ID de su orden' + ' ' + result.id,
            icon: 'success',
            backdrop: true
          }))
          .catch(err => console.log(err))
  
          
          // borrar el stock de la bd
          cart.cartList.forEach(async item => {
            const updateItem = doc(db, "products", item.idItem);
            await updateDoc(updateItem, {
              stock: increment(-item.qtyItem)
            })
          });
          
          cart.deleteAll();
    }

    // Confirmar si quiere elmiinar el carrito
    const confirmDeleteAll = () => {
      Swal.fire({
        title: 'Está seguro que quiere eliminar todo el carrito?',
        text: "Esta acción es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar!',
        backdrop: true
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminados!',
            'Se eliminaron todos los productos del carrito.',
            'success'
            )
            cart.deleteAll();
        }
      })
    }

    return(

    <div className="cartContain">
        <div className="cartTitle"><h2>Mi carrito</h2></div>

        {
          cart.cartList.length > 0
          ? <div className='cartBtns'> 
              <Link to='/'><button className='cartKeepShop'>Seguir comprando</button></Link>
              <button className='cartDeleteAll' onClick={confirmDeleteAll}>Borrar todos los productos</button>
            </div>
          : <>
              <p>No hay productos</p>
              <Link to='/'><button className='cartKeepShop'>Ir a comprar</button></Link>
            </>
        }  

        <div className='cartContent'>
          <div className='cartBoxContain'>

        {
          cart.cartList.length > 0 &&
            cart.cartList.map(item => 
              <div className="cartBox" key={item.idItem}>
                  <div className="cartImg">
                      <img src={item.imgItem} alt="Imágen del producto"></img>
                  </div>
                  
                  <div className="cartText">
                      <h3>{item.titleItem}</h3>
                      <p> ${item.priceItem} x {item.qtyItem} item/s</p>
                      <p>Total: <FormatNumber number={cart.calcItem(item.priceItem, item.qtyItem)}/></p>
                      <button onClick={() => cart.deleteItem(item.idItem)}>Eliminar producto</button>
                  </div>
          
              </div>
                            )
        }
            </div>
            {/* fin cartboxcontain */}
        {
          cart.cartList.length > 0 &&
          <div className='cartResume'>
            <h3>Detalle</h3>
              <p>Subtotal: <FormatNumber number={cart.calcSubTotal()}/></p>
              <p>IVA 21%: + <FormatNumber number={cart.calcTax()}/></p>
              <hr></hr>
              <p>Total: <FormatNumber number={cart.calcTotal()}/></p>
              <hr></hr>
              <form className="formDeContacto">
                <h4>Completa con tus datos por favor</h4>
                <input  type="text"
                        id="nombre" 
                        className="btn"
                        placeholder="Tu nombre" 
                        value={formValue.nombre} 
                        onChange={handleChange}
                        name="nombre" 
                        />
                <input type="email" 
                       id="email" 
                       className="btn"
                       placeholder="Tu email"
                       value={formValue.email} 
                       onChange={handleChange}
                       name="email"
                      />
                <input type="number" 
                       id="phone" 
                       className="btn"
                       placeholder="Tu teléfono" 
                       value={formValue.telefono} 
                       onChange={handleChange}
                       name="telefono" 
                      />
                  </form>
                  {
                  formValue.nombre && formValue.email && formValue.telefono
                  ? <button onClick={orderCreated} >Finalizar compra</button>   
                  : <button disabled>Finalizar compra</button> 
                  }
            </div>
        }
        </div>
        {/* fin cartcontent */}
    </div>
        // fin cartcontain
    );
}

export default Cart;