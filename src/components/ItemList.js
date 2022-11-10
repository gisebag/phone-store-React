import Item from './Item';

export default function ItemList({ products }){
    return(

        <div className='ItemList-Box'>
            {
                products.map(el => <Item key={el.id} id={el.id} img={el.img} title={el.title} price={el.price}/>)
            }
        </div>
    );
};