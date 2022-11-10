import { Link } from "react-router-dom";
import FormatNumber from "../util/FormatNumber";
const Item = ({ id, img, title, price }) => {

    return (

             <div className="Item-Box" key={id}>
                <div className="Item-img"><img src={img} alt="Imágen del producto" /></div>
                <div className="Item-BoxText">
                    <p className="Item-BoxText-title">{title}</p>
                    <p className="Item-BoxText-price">Precio: <FormatNumber number={price} /></p>
                    <Link to={`/item/${id}`} className="Item-BoxText-info">+ Info</Link>
                </div>
                <div className="Item-Dark"></div>
            </div>

    );
};

export default Item;