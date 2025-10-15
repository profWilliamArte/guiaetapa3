import React from 'react'

const Resumen = () => {
  return (
   
<div>
 
  <div className="container mt-5">
    <div className="hero mb-5">
      <h1>Tu Viaje para Crear una Tienda Online con React</h1>
      <p className="lead">Aprende paso a paso a construir una aplicación web moderna, desde la configuración inicial hasta funcionalidades avanzadas como búsquedas y paginación.</p>

    </div>
    <div className="timeline">
      {/* Etapa 1 */}
      <div className="timeline-item">
        <div className="timeline-icon">1</div>
        <div className="timeline-content">
          <h3>Etapa 1: Fundamentos y Configuración</h3>
          <p>Comenzarás desde cero, inicializando tu proyecto con <strong>Vite</strong>, una herramienta moderna y ultrarrápida. Aprenderás a instalar dependencias esenciales como <strong>React Router</strong> para la navegación y <strong>Bootstrap</strong> para dar un estilo profesional a tu aplicación desde el primer momento.</p>
          <pre><code>{"\n"}npm create vite@latest .{"\n"}npm install{"\n"}npm install react-router-dom{"\n"}npm install bootstrap@5.3.3{"\n"}npm install react-icons{"\n"}{"                    "}</code></pre>
        </div>
      </div>
      {/* Etapa 2 */}
      <div className="timeline-item">
        <div className="timeline-icon">2</div>
        <div className="timeline-content">
          <h3>Etapa 2: Estructura y Navegación</h3>
          <p>Organizar el código es clave. Crearás una estructura de carpetas lógica para tus <strong>componentes</strong> (piezas reutilizables de UI) y <strong>páginas</strong>. Implementarás un sistema de rutas para que los usuarios puedan navegar fluidamente entre las diferentes secciones de tu tienda.</p>
          <pre><code>{"\n"}src/{"\n"}├── components/{"\n"}│{"   "}├── Footer.jsx{"\n"}│{"   "}└── Header.jsx{"\n"}└── pages/{"\n"}{"    "}├── Categorias.jsx{"\n"}{"    "}├── Inicio.jsx{"\n"}{"    "}├── Laptop.jsx{"\n"}{"    "}├── Movil.jsx{"\n"}{"    "}└── Tienda.jsx{"\n"}{"                    "}</code></pre>
        </div>
      </div>
      {/* Etapa 3 */}
      <div className="timeline-item">
        <div className="timeline-icon">3</div>
        <div className="timeline-content">
          <h3>Etapa 3: Contenido Dinámico desde una API</h3>
          <p>Darás vida a tu tienda consumiendo datos de una API externa (<strong>dummyjson</strong>). Aprenderás a usar los hooks <code>useState</code> y <code>useEffect</code> de React para solicitar datos y mostrarlos dinámicamente, creando una experiencia de usuario interactiva y realista.</p>
          <pre><code>{"\n"}import {"{"} useEffect, useState {"}"} from "react";{"\n"}{"\n"}const [datos, setDatos] = useState([]);{"\n"}const getDatos = async () =&gt; {"{"}{"\n"}{"    "}const response = await fetch('https://dummyjson.com/products/category/smartphones');{"\n"}{"    "}const data = await response.json();{"\n"}{"    "}setDatos(data.products);{"\n"}{"}"};{"\n"}{"\n"}useEffect(() =&gt; {"{"}{"\n"}{"    "}getDatos();{"\n"}{"}"}, []);{"\n"}{"                    "}</code></pre>
        </div>
      </div>
      {/* Etapa 4 */}
      <div className="timeline-item">
        <div className="timeline-icon">4</div>
        <div className="timeline-content">
          <h3>Etapa 4: Componentes Reutilizables y Rutas Dinámicas</h3>
          <p>El componente <code>App.jsx</code> es el centro de control de la aplicación. Utiliza <code>useState</code> para gestionar el tema (claro/oscuro) y lo propaga a otros componentes. El enrutamiento se maneja con <code>react-router-dom</code>, definiendo rutas para cada página, incluyendo rutas dinámicas para categorías y detalles de productos que usan parámetros de URL.</p>
          <pre><code>{"\n"}// App.jsx - Resumen{"\n"}{"\n"}// Importaciones clave{"\n"}import {"{"} BrowserRouter, Routes, Route {"}"} from 'react-router-dom';{"\n"}import {"{"} useState {"}"} from 'react';{"\n"}{"\n"}// Componentes de página y layout{"\n"}import Header from './components/Header';{"\n"}import Footer from './components/Footer';{"\n"}import Inicio from './pages/Inicio';{"\n"}// ...y otras páginas{"\n"}{"\n"}function App() {"{"}{"\n"}{"  "}// Lógica para cambiar el tema{"\n"}{"  "}const [darkMode, setDarkMode] = useState('dark');{"\n"}{"  "}const toggleTheme = () =&gt; {"{"} /* ... */ {"}"};{"\n"}{"\n"}{"  "}return ({"\n"}{"    "}&lt;BrowserRouter&gt;{"\n"}{"      "}{"{"}/* Se pasa el estado del tema al Header */{"}"}{"\n"}{"      "}&lt;Header darkMode={"{"}darkMode{"}"} toggleTheme={"{"}toggleTheme{"}"} /&gt;{"\n"}{"      "}{"\n"}{"      "}&lt;Routes&gt;{"\n"}{"        "}{"{"}/* Rutas estáticas */{"}"}{"\n"}{"        "}&lt;Route path="/" element={"{"}<inicio>{"}"} /&gt;{"\n"}{"        "}&lt;Route path="/tienda" element={"{"}<tienda>{"}"} /&gt;{"\n"}{"        "}{"\n"}{"        "}{"{"}/* Rutas dinámicas con parámetros */{"}"}{"\n"}{"        "}&lt;Route path="/categorias/:id" element={"{"}<categorias>{"}"} /&gt;{"\n"}{"        "}&lt;Route path="/detalle/:id/:nombre" element={"{"}<detalle>{"}"} /&gt;{"\n"}{"\n"}{"        "}{"{"}/* Ruta para búsquedas */{"}"}{"\n"}{"        "}&lt;Route path="/busquedas" element={"{"}<busquedas>{"}"} /&gt;{"\n"}{"        "}{"\n"}{"        "}{"{"}/* Ruta comodín para páginas no encontradas */{"}"}{"\n"}{"        "}&lt;Route path="*" element={"{"}<inicio>{"}"} /&gt;{"\n"}{"      "}&lt;/Routes&gt;{"\n"}{"      "}{"\n"}{"      "}&lt;Footer /&gt;{"\n"}{"    "}&lt;/BrowserRouter&gt;{"\n"}{"  "});{"\n"}{"}"}{"\n"}{"\n"}</inicio></busquedas></detalle></categorias></tienda></inicio></code></pre>
        </div>
      </div>
      {/* Etapa 5 */}
      <div className="timeline-item">
        <div className="timeline-icon">5</div>
        <div className="timeline-content">
          <h3>Etapa 5: Página de Detalle del Producto</h3>
          <p>Crearás una página de detalle para cada producto. Aprenderás a pasar múltiples parámetros en la URL (como el ID y el nombre del producto) y a usarlos para obtener y mostrar la información detallada, completando el ciclo de compra.</p>
          <pre><code>{"\n"}&lt;Link&gt; to={"{"}`/detalle/${"{"}item.id{"}"}/${"{"}item.title{"}"}`{"}"} className="btn btn-info btn-sm"&gt;Detalle&lt;/Link&gt;{"\n"}{"\n"}// En el componente Detalle.jsx{"\n"}import {"{"} useParams {"}"} from 'react-router-dom';{"\n"}{"\n"}const {"{"} id, nombre {"}"} = useParams();{"\n"}{"                    "}</code></pre>
        </div>
      </div>
      {/* Etapa 6 */}
      <div className="timeline-item">
        <div className="timeline-icon">6</div>
        <div className="timeline-content">
          <h3>Etapa 6: Funcionalidades Avanzadas: Paginación y Búsqueda</h3>
          <p>Para manejar grandes catálogos de productos, implementarás una <strong>paginación</strong> eficiente. Finalmente, añadirás una barra de <strong>búsqueda</strong> funcional, aprendiendo a comunicar componentes y a manejar el estado de la aplicación de forma programática con <code>useNavigate</code> y <code>useLocation</code>.</p>
          <pre><code>{"\n"}import {"{"} useNavigate, useLocation {"}"} from 'react-router-dom';{"\n"}{"\n"}const navigate = useNavigate();{"\n"}const location = useLocation();{"\n"}{"\n"}// Ejemplo de uso{"\n"}navigate('/busquedas?q=laptop');{"\n"}{"                    "}</code></pre>
        </div>
      </div>
    </div>
    <div className="text-center my-5">
      <h2>¡Felicidades!</h2>
      <p>Al completar este proyecto, no solo tendrás las bases para construir una tienda online funcional, sino que habrás dominado los conceptos fundamentales y avanzados de React que son esenciales en el desarrollo web moderno.</p>
    </div>
  </div>
</div>

    

  )
}

export default Resumen