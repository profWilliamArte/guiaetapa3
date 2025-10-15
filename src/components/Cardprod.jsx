
import { Link } from "react-router-dom";
import Modal from "./ModalProd";
import ModalProd from "./ModalProd";
const Cardprod = ({item, carrito, agregarAlCarrito}) => {

    const handleAgregar = () => {
        agregarAlCarrito(item); // 👈 Llamamos a la función que viene de App
    };


      // 🔍 Ver si este producto está en el carrito
    const enCarrito = carrito.find(producto => producto.id === item.id);

    return (
        <div className="col-md-4 col-xl-3 mb-3" key={item.id}>
            <div className="card h-100">
                <div className="card-header p-0">
                    {/* 🔹 Badge de cantidad si está en carrito */}
                    {enCarrito && (
                        <span className="position-absolute top-0 end-0 badge rounded-pill text-bg-warning fs-4 m-2">
                            {enCarrito.cantidad}
                        </span>
                    )}
                    <img src={item.thumbnail} alt="" className="img-fluid" />
                </div>
                <div className="card-body text-center">
                    <p className="fs-3">{item.title}</p>
                    <p className="fs-5 text-danger fw-bold">Precio: {item.price}$</p>
                </div>
                <div className="card-footer text-center">
                    <div>
                        <a href="#" className="btn btn-primary btn-sm me-3" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>Modal</a>
                        <Link to={`/detalle/${item.id}/${item.title}`} href="#" className="btn btn-info btn-sm" >Detalle</Link>
                    </div>
                    <div className="mt-2 border-top pt-2">

                        <button
                            className="btn btn-success btn-sm"
                            onClick={handleAgregar}
                        >
                        + Agregar al Carrito
                        </button>
                    </div>
                </div>

                
            </div>
            <ModalProd item={item}/>


        </div>
    )
}

export default Cardprod