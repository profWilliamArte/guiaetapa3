import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = 'https://dummyjson.com/products/';

const Detalle = () => {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams(); // Obtenemos el ID del producto desde la URL
    const {nombre } = useParams(); // Obtenemos el ID del producto desde la URL
    const navigate = useNavigate();
    const URI = API+ id
    const getProduct = async () => {
        try {
            const res = await fetch(URI); // https://dummyjson.com/products/1 
            if (!res.ok) throw new Error(`Error al cargar datos (status: ${res.status})`);
            const data = await res.json();
            setProducto(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    // Mientras se carga...
    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando detalles del producto</p>
            </div>
        );
    }

    // Si hay error...
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Hubo un problema al cargar los datos</h4>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container my-4">
            {/* Botón Volver */}
            <div className="d-flex justify-content-end mb-3">
                <button onClick={() => navigate(-1)} className="btn btn-secondary">
                    ← Volver
                </button>
            </div>

            {/* Título */}
            <h4 className="text-center py-3">Detalle del Producto {nombre}</h4>

            {/* Fila con imagen y detalles */}
            <div className="row g-4">
                <div className="col-md-4">
                    <img src={producto.thumbnail} alt={producto.title} className="img-fluid rounded shadow-sm" />
                </div>
                <div className="col-md-8">
                    <div className="p-4 h-100 shadow-sm">
                        <h5 className="fw-bold">{producto.title}</h5>
                        <p><strong>Precio:</strong> ${producto.price}</p>
                        <p><strong>Categoría:</strong> {producto.category}</p>
                        <p><strong>Marca:</strong> {producto.brand}</p>
                        <p><strong>Stock:</strong> {producto.stock} unidades</p>
                        <p><strong>Rating:</strong> {producto.rating}</p>
                        <p><strong>Descripción:</strong> {producto.description}</p>
                    </div>
                </div>
            </div>

            {/* Comentarios */}
            <div className="mt-5">
                <h5>Comentarios de Usuarios</h5>
                <div className="row row-cols-1 row-cols-md-2 g-3">
                    {producto.reviews.map((review, index) => (
                        <div className="col" key={index}>
                            <div className="card border-light shadow-sm">
                                <div className="card-body">
                                    <p className="mb-1"><strong>Comentario:</strong> {review.comment}</p>
                                    <p className="mb-1"><strong>Calificación:</strong> {review.rating}/5</p>
                                    <p className="mb-1"><strong>Fecha:</strong> {new Date(review.date).toLocaleDateString()}</p>
                                    <p className="mb-0"><strong>Usuario:</strong> {review.reviewerName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Detalle;