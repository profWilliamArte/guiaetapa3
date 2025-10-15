// Busquedas.jsx
import { useEffect, useState, useCallback } from "react";
import Cardprod from "../components/Cardprod";
import { useLocation, useNavigate } from 'react-router-dom';

// 🔹 API: usamos esta constante cuando la URL base NO cambia.
// Es una buena práctica separar la base de la lógica dinámica.
const API = 'https://dummyjson.com/products/search?q=';

const Busquedas = ({carrito, agregarAlCarrito}) => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    // 🔹 txtBuscar: obtenemos el término enviado desde el Header mediante navigate(..., { state })
    // Usamos optional chaining (?.) y trim() para evitar espacios innecesarios.
    const txtBuscar = location.state?.trim() || '';

    // 🔹 URI: armamos la URL completa solo cuando tenemos un término válido.
    // Esto mantiene clara la diferencia entre API (fija) y URI (dinámica).
    const URI = txtBuscar ? API + encodeURIComponent(txtBuscar) : null; 
    //  que hace encodeURIComponent(txtBuscar) 
    // Codifica caracteres especiales en la URL (como espacios, acentos, símbolos).

    // 🔹 useCallback: envuelve la función asíncrona para que React la "memorice"
    // mientras sus dependencias ([txtBuscar]) no cambien.
    // Esto evita que se cree una nueva función en cada render → evita el warning de useEffect.
    const getDatos = useCallback(async () => {
        // Si no hay URI válida, no hacemos nada
        if (!URI) {
            setError("No se proporcionó un término de búsqueda.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setDatos([]); // Limpiamos resultados anteriores para mejor UX

        try {
            const response = await fetch(URI);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.products);
        } catch (err) {
            setError(err.message);
        } finally {
            // Aseguramos que loading siempre se desactive, incluso si hay error
            setLoading(false);
        }
    }, [URI]); // 🔹 Dependencia: URI (que incluye txtBuscar codificado)

    // 🔹 useEffect: se ejecuta cuando cambia txtBuscar (a través de URI)
    // Incluimos getDatos en las dependencias porque ahora está estabilizada con useCallback
    useEffect(() => {
        if (txtBuscar) {
            getDatos();
        } else {
            // Si no hay búsqueda, mostramos error inmediatamente
            setError("No se proporcionó un término de búsqueda.");
            setLoading(false);
        }
    }, [txtBuscar, getDatos]); // ✅ Ahora sin warnings

    // 🔹 Mostramos estado de carga
    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando resultados para "{txtBuscar}"...</p>
            </div>
        );
    }

    // 🔹 Mostramos error si ocurrió alguno
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los resultados</h4>
                <p>{error}</p>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Volver
                </button>
            </div>
        );
    }

    // 🔹 Mostramos mensaje si no hay resultados
    if (datos.length === 0) {
        return (
            <div className="text-center py-5">
                <h4>No se encontraron productos para "{txtBuscar}"</h4>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Volver
                </button>
            </div>
        );
    }

    // 🔹 Renderizado normal con resultados
    return (
        <div className="container">
            {/* 🔹 Título dinámico: muestra lo que el usuario buscó */}
            <h4 className="text-center py-4">Resultados para: "{txtBuscar}"</h4>
            <div className="row">
                {datos.map((item) => (
                     <Cardprod item={item} key={item.id} carrito={carrito} agregarAlCarrito={agregarAlCarrito} />
                ))}
            </div>
        </div>
    );
};

export default Busquedas;

/*

¿Qué hace encodeURIComponent?
Codifica una cadena de texto para que sea segura dentro de una URL. 

Las URLs no pueden contener espacios, acentos, símbolos como &, =, #, etc. directamente.
Si los usas sin codificar, la URL se rompe o el servidor la interpreta mal.

encodeURIComponent convierte esos caracteres "prohibidos" en una secuencia segura llamada "percent-encoding".


Texto original              Texto codificado                        Explicación
__________________________________________________________________________________________________
"smart phone"               "smart%20phone"                 El espacio se convierte en %20
"café"                      "caf%C3%A9"                     La  é es un carácter especial (UTF-8)
"laptop & tablet"           "laptop%20%26%20tablet"         El & se convierte en %26
"price > 100"               "price%20%3E%20100"             El > se convierte en %3E



Sin esta codificación, una búsqueda como "smart phone" generaría una URL inválida:
❌ https://api.com/search?q=smart phone → el navegador o el servidor no saben qué hacer con el espacio.
✅ Con codificación:
✔️ https://api.com/search?q=smart%20phone → válida y funcional. 

🛠️ ¿Cuándo usarlo?
Siempre que insertes datos dinámicos en una URL, especialmente en:

Parámetros de búsqueda (?q=...)
Rutas con variables (/user/...)
Cualquier parte de la URL que venga de un input del usuario



useCallback
¿Qué hace? "Memoriza" una función mientras sus dependencias no cambien.
¿Por qué lo usamos?
Sin useCallback, getDatos se redefine en cada render → React piensa que es una función nueva → pide 
    que la incluyas en las dependencias del useEffect.
Al usar useCallback, garantizamos que getDatos solo cambie si URI cambia → evitamos el warning y bugs potenciales.

Validación de txtBuscar
Evita búsquedas vacías o con solo espacios.
Mejora la experiencia: no se llama a la API innecesariamente.


finally en el try/catch
Asegura que setLoading(false) se ejecute siempre, incluso si hay error.
Evita que la pantalla quede "colgada" en estado de carga.


*/