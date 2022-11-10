import ItemListContainer from "./ItemListContainer"
const Home = () => {
    return(
        <>
        <div className="Home Contenedor">
            <div className="HomeTitle">
            <h1>Bienvenidos<br/> a PhoneStore, <br/>la mejor tienda<br/> virtual de<br/> Smartphone.<br/></h1>
            </div>
            <div className="Home-paragraph">
                <p>A continuación podrás ver el listado con todos los productos en stock.<br/></p>
            </div>
        </div>
            <ItemListContainer />
        </>
    );
}
export default Home;