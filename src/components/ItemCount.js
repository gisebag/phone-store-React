import { useEffect, useState } from "react";

function ItemCount ({stock, initial, onAdd})  {

    const [count, setCount] = useState(initial);

    useEffect(() => {
        setCount(initial)
    }, [initial])

    const increment = () => {
        if (count < stock) {
            setCount(count+1);
        } 
    }
    const decrement = () => {
        if (count > initial) {
            setCount(count-1);
        } 
    }

    function addToCount () {
        onAdd(count)
    }
    
    return(
        <>
        <div className="ItemCountBox">
            <div className="ItemCountBtns">
                <button className="ItemCountBtns-decrement" onClick={decrement}>-</button>
                <p>{count}</p>
                <button className="ItemCountBtns-increment" onClick={increment}>+</button>
            </div>
            <button className="ItemCount-Add" onClick={addToCount}>Agregar al carrito</button>
        </div>
        </>
    );
}

export default ItemCount;