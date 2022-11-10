import Cart from '../img/cart.svg';
import { useContext } from 'react';
import { CartContext } from './CartContext';
const CartWidget = () => {
const cart = useContext(CartContext);

    return(
            <div className='CartWidget-Box'>
            <div className='img-Box'>
                <img src={Cart} alt='cart' className='carrito'></img>
                {
                    cart.cartList.length > 0 
                    ? <div className='number'>{cart.calcNumberWidget()}</div>
                    : <div className='numberNone'></div>
                }
            </div>
            </div>
      );
}

export default CartWidget;