import Checkout from "./Checkout";
import ItemCount from "./ItemCount";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import FormatNumber from "../util/FormatNumber";
const ItemDetail = ( {item} ) => {

    const [itemCount, setItemCount] = useState(0);
    const cart = useContext(CartContext);

  

    function onAddItem(qty){
        
        setItemCount(qty);
        cart.addItem(item, qty);

    }
      
    return (
        <>
        { item && item.img 
            ?   <div className="ItemDetail-contain">
                                <div className="ItemDetail-img"><img src={item.img} alt="Imágen del producto"></img></div>
                                <div className="ItemDetail-text">
                                    <h3>{item.title}</h3>
                                    <p>Precio: <FormatNumber number={item.price}/></p>
                                    <p>Stock: {item.stock}</p>
                                    <p>{item.description}</p>
                                    {
                                        itemCount === 0
                                        ? <ItemCount stock={item.stock} initial={1} onAdd={onAddItem}/>
                                        : <Checkout />
                                    }
                                </div>
                    </div>
                    
            :           <div className='loadContain'>
                            <p>Cargando producto...</p>    
                            <div className='loadBox'>
                                <div className='loadCharge'></div>
                            </div>
                        </div>
            }
        </>
    );
}

export default ItemDetail;


