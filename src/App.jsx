import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Error405 from './pages/Error405'
import Movil from './pages/Movil'
import Laptop from './pages/Laptop'
import Tienda from './pages/Tienda'
import Detalle from './pages/Detalle'
import Busquedas from './pages/Busquedas'
import Categorias from './pages/Categorias'
import Resumen from './pages/Resumen'
import Glosario from './pages/Glosario'
import Autoevaluacion from './pages/Autoevaluacion'
import Tablas from './pages/Tablas'


const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (e) {
    console.error("Error al cargar el carrito:", e);
    localStorage.removeItem("cart");
  }
  return [];
};

const App = () => {

  const [darkMode, setDarkMode] = useState('dark')



    // 🔹 Estado del carrito: array de productos con cantidad
    const [carrito, setCarrito] = useState(getInitialCart);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carrito));
  }, [carrito]);


    // 🔹 Función para agregar producto al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito(prev => {
            // Ver si ya existe en el carrito
            const existe = prev.find(item => item.id === producto.id);
            if (existe) {
                // Actualizar cantidad
                return prev.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                // Agregar nuevo producto con cantidad 1
                return [...prev, { ...producto, cantidad: 1 }];
            }
        });
    };

    // 🔹 Función para eliminar producto del carrito
    const eliminarDelCarrito = (id) => {
        setCarrito(prev => prev.filter(item => item.id !== id));
    };

    // 🔹 Función para actualizar cantidad
    const actualizarCantidad = (id, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        setCarrito(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, cantidad: nuevaCantidad }
                    : item
            )
        );
    };

    // 🔹 Función para vaciar carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };




  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.body.setAttribute('data-bs-theme', !darkMode ? 'dark' : 'light')
  }
  return (
    <BrowserRouter>
      <div className="app">
         <Header 
          darkMode={darkMode} 
          toggleTheme={toggleTheme} 
          carrito={carrito} 
          agregarAlCarrito={agregarAlCarrito}
          eliminarDelCarrito={eliminarDelCarrito}
          actualizarCantidad={actualizarCantidad}
          vaciarCarrito={vaciarCarrito}
          />
         <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
           
          <Route path="/movil" element={<Movil carrito={carrito} agregarAlCarrito={agregarAlCarrito}/>} />
          <Route path="/laptop" element={<Laptop carrito={carrito} agregarAlCarrito={agregarAlCarrito}/>} />

          <Route path="/tienda" element={<Tienda carrito={carrito} agregarAlCarrito={agregarAlCarrito} />} />

          <Route path="/tablas" element={<Tablas />} />
          <Route path="/categorias/:id" element={<Categorias carrito={carrito} agregarAlCarrito={agregarAlCarrito}/>} />
          <Route path="/detalle/:id/:nombre" element={<Detalle />} />
          <Route path="/busquedas" element={<Busquedas carrito={carrito} agregarAlCarrito={agregarAlCarrito}/>} />
           <Route path="/resumen" element={<Resumen/>} />
           <Route path="/glosario" element={<Glosario/>} />
           <Route path="/autoevaluacion" element={<Autoevaluacion/>} />

          <Route path="*" element={<Inicio />} />

         </Routes>

        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App