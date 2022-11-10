import { createContext, useState } from "react";
import Swal from "sweetalert2";
export const CartContext = createContext();

const CartContextProvider = ({children}) => {

    const [cartList, setCartList] = useState([]);

    // Agregar item
    const addItem = (item, qty) => {
        let findProduct = cartList.find(elem => elem.idItem === item.id);
        if (findProduct === undefined) {
            setCartList([
               ...cartList,
               {
                   idItem: item.id,
                   imgItem: item.img,
                   titleItem: item.title,
                   priceItem: item.price,
                   qtyItem: qty
               }
           ]);        
        } else {
            findProduct.qtyItem += qty;
            setCartList([
                ...cartList
            ]);
        }
    }

    // Borrar 1 producto y preguntar si quiero eliminarlo
    const deleteItem = (item) => {
        Swal.fire({
        title: 'Está seguro que quiere eliminar el producto?',
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
            'Eliminado!',
            'Se eliminó el producto del carrito.',
            'success'
            )
            let newList = cartList.filter(elem => elem.idItem !== item);
            setCartList(newList);
        }
      })
    }

    // Borrar todo el carrito
    const deleteAll = () => {

        setCartList([]);
    }

    // Calcular precio por producto
    const calcItem = (priceItem, qtyItem) => {
        
        return priceItem * qtyItem;
    }

    // Calcular subtotal
    const calcSubTotal = () => {
       
        let arrayOfPrices = cartList.map(elem => calcItem(elem.priceItem, elem.qtyItem))
        let sumaTotal = arrayOfPrices.reduce((a, b) => a + b, 0)
        return sumaTotal;
    }

    // Calcular impuestos
    const calcTax = () => {
        return calcSubTotal() * 0.21;
    }

    // Calcular total
    const calcTotal = () => {
        return calcSubTotal() + calcTax(); 
    }

    // Agregar numeros al cartwidget
    const calcNumberWidget = () => {
        let qtys = cartList.map(item => item.qtyItem);
        return qtys.reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
    }

    return(
        <CartContext.Provider value={
            {   
                cartList, 
                addItem, 
                deleteItem, 
                deleteAll, 
                calcItem, 
                calcSubTotal, 
                calcTax, 
                calcTotal, 
                calcNumberWidget,
            }       
                                    }>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;