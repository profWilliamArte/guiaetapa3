

const Glosario = () => {
  return (


  <div className="container my-5">
    <div className="hero">
      <h1>Glosario de Términos</h1>
      <p className="lead">Una guía de referencia rápida para las tecnologías, hooks y funciones utilizadas en este proyecto.</p>
    </div>
    {/* Categoría: Hooks de React */}
    <div className="category">
      <h3>Hooks de React</h3>
      <dl>
        <dt>useState</dt>
        <dd>Permite a los componentes funcionales tener su propio estado. Se usa para guardar datos que cambian con el tiempo, como la entrada de un usuario en un formulario, la lista de productos de la API o el estado de carga. Cada vez que el estado cambia, el componente se vuelve a renderizar.</dd>
        <dt>useEffect</dt>
        <dd>Permite realizar "efectos secundarios" en componentes funcionales. Su uso principal en este proyecto es para hacer peticiones a la API (fetch) después de que el componente se haya renderizado. El array de dependencias (segundo argumento) controla cuándo se vuelve a ejecutar el efecto.</dd>
      </dl>
    </div>
    {/* Categoría: Hooks de React Router */}
    <div className="category">
      <h3>Hooks de React Router</h3>
      <dl>
        <dt>useParams</dt>
        <dd>Extrae parámetros dinámicos de la URL. Esencial para las páginas de Categorías y Detalle, ya que permite saber qué categoría o producto específico se debe mostrar.</dd>
        <dt>useNavigate</dt>
        <dd>Proporciona una función para navegar programáticamente. Se utiliza en el Header para redirigir al usuario a la página de búsqueda después de enviar el formulario.</dd>
        <dt>useLocation</dt>
        <dd>Devuelve el objeto de ubicación actual, que contiene información sobre la URL. En este proyecto, se usa en la página de Búsquedas para recibir el término de búsqueda que se pasó a través del estado de la navegación.</dd>
      </dl>
    </div>
    {/* Categoría: Componentes de React Router */}
    <div className="category">
      <h3>Componentes de React Router</h3>
      <dl>
        <dt>BrowserRouter</dt>
        <dd>Envuelve la aplicación principal para habilitar el enrutamiento basado en la URL del navegador.</dd>
        <dt>Routes</dt>
        <dd>Contenedor para todas las rutas individuales de la aplicación.</dd>
        <dt>Route</dt>
        <dd>Define la correspondencia entre una ruta de URL y el componente que debe renderizarse.</dd>
        <dt>Link</dt>
        <dd>Crea enlaces de navegación declarativos, similares a la etiqueta <code>&lt;a&gt;</code> de HTML, pero sin recargar la página.</dd>
      </dl>
    </div>
    {/* Categoría: APIs y Métodos de JavaScript */}
    <div className="category">
      <h3>APIs y Métodos de JavaScript</h3>
      <dl>
        <dt>fetch</dt>
        <dd>La API del navegador para realizar peticiones de red (HTTP). Es la base para consumir la API de <code>dummyjson</code> y obtener todos los datos de los productos.</dd>
        <dt>async / await</dt>
        <dd>Sintaxis que simplifica el trabajo con promesas (como las que devuelve <code>fetch</code>), haciendo que el código asíncrono parezca síncrono y sea más fácil de leer.</dd>
        <dt>.json()</dt>
        <dd>Método que se aplica a la respuesta de una petición <code>fetch</code> para convertir el cuerpo de la respuesta (que está en formato JSON) en un objeto de JavaScript con el que podemos trabajar.</dd>
        <dt>.map()</dt>
        <dd>Método de los arrays en JavaScript que permite iterar sobre cada elemento de una lista y devolver un nuevo array. En React, es la forma estándar de renderizar una lista de componentes a partir de un array de datos.</dd>
      </dl>
    </div>
    {/* Categoría: Rutas de la API (dummyjson) */}
    <div className="category">
      <h3>Rutas de la API (dummyjson)</h3>
      <dl>
        <dt>.../products/category-list</dt>
        <dd>Devuelve una lista con todas las nombres de las categorías de productos disponibles. Se usa en el componente <strong>Filtrocategorias</strong> para construir el menú de navegación de categorías.</dd>
        <dt>.../products/category/[nombre-categoria]</dt>
        <dd>Obtiene todos los productos que pertenecen a una categoría específica. Se usa de forma dinámica en la página <strong>Categorias.jsx</strong> (p. ej., <code>/products/category/fragrances</code>) y de forma estática en las páginas <strong>Movil.jsx</strong> (<code>/products/category/smartphones</code>) y <strong>Laptop.jsx</strong> (<code>/products/category/laptops</code>).</dd>
        <dt>.../products/[id]</dt>
        <dd>Recupera los detalles completos de un único producto usando su ID. Es la base de la página de <strong>Detalle</strong>.</dd>
        <dt>.../products?limit=12&amp;skip=[numero]</dt>
        <dd>Obtiene una lista paginada de productos. El parámetro <code>limit</code> controla cuántos productos se reciben y <code>skip</code> cuántos se saltan. Se usa en la página <strong>Tienda</strong>.</dd>
        <dt>.../products/search?q=[termino]</dt>
        <dd>Busca productos que coincidan con un término de búsqueda. Se utiliza en la página de <strong>Busquedas</strong> para mostrar los resultados.</dd>
      </dl>
    </div>
  </div>


  )
}

export default Glosario