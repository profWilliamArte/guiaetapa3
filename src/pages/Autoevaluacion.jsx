import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Autoevaluacion = () => {
  const [currentModule, setCurrentModule] = useState(1);
  const totalModules = 11;
  const [quizResults, setQuizResults] = useState({});
  const navigate = useNavigate();

  // Respuestas correctas mejor organizadas
  const correctAnswers = {
    1: { q1_1: 'b', q1_2: 'a' },
    2: { q2_1: 'b' },
    3: { q3_1: 'a' },
    4: { q4_1: 'b' },
    5: { q5_1: 'b' },
    6: { q6_1: 'b' },
    7: { q7_1: 'b', q7_2: 'b' },
    8: { q8_1: 'b', q8_2: 'a', q8_3: 'b' },
    9: { q9_1: 'b', q9_2: 'a' },
    10: { q10_1: 'b', q10_2: 'a', q10_3: 'a' },
    11: { q11_1: 'b', q11_2: 'a', q11_3: 'a' }
  };

  // Calcula el progreso de manera más segura
  const progress = totalModules <= 1 ? 0 : Math.round(((currentModule - 1) / (totalModules - 1)) * 100);

  // Manejo de navegación mejorado
  const handleNavigate = (direction) => {
    const newModule = currentModule + direction;
    if (newModule >= 1 && newModule <= totalModules) {
      setCurrentModule(newModule);
      window.scrollTo(0, 0); // Scroll al inicio al cambiar de módulo
    }
  };

  // Función para verificar las respuestas del quiz
  const checkQuiz = (moduleNumber) => {
    const answers = correctAnswers[moduleNumber];
    if (!answers) return;

    let score = 0;
    const totalQuestions = Object.keys(answers).length;

    Object.entries(answers).forEach(([question, correctAnswer]) => {
      const selected = document.querySelector(`input[name="${question}"]:checked`);
      if (selected && selected.value === correctAnswer) {
        score++;
      }
    });

    const isPerfect = score === totalQuestions;
    setQuizResults(prev => ({
      ...prev,
      [moduleNumber]: {
        message: `Tu puntuación es: ${score} de ${totalQuestions}`,
        type: isPerfect ? 'success' : 'danger',
        perfect: isPerfect
      }
    }));
  };

  // Renderizado modular mejorado
  const renderModule = () => {
    const modules = {
      1: (
        <>
          <h2 className='hero'>Módulo 1: Instalación y Dependencias</h2>
          <p>En este módulo aprenderás a inicializar un proyecto de React con Vite y a instalar las dependencias básicas.</p>
          <pre><code>{`# Crear el proyecto en la carpeta actual
npm create vite@latest .

# Instalar dependencias del proyecto
npm install

# Instalar dependencias adicionales
npm install react-router-dom bootstrap@5.3.3 react-icons`}</code></pre>
          <div className="quiz mt-4">
            <h4>Autoevaluación</h4>
            <div className="quiz-question">
              <p>1. ¿Qué comando se usa para crear un nuevo proyecto de Vite en el directorio actual?</p>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="q1_1" value="a" id="q1_1_a" />
                <label className="form-check-label" htmlFor="q1_1_a">npm new vite</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="q1_1" value="b" id="q1_1_b" />
                <label className="form-check-label" htmlFor="q1_1_b">npm create vite@latest .</label>
              </div>
            </div>
            <div className="quiz-question mt-3">
              <p>2. ¿Para qué se utiliza <code>react-router-dom</code>?</p>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="q1_2" value="a" id="q1_2_a" />
                <label className="form-check-label" htmlFor="q1_2_a">Para gestionar rutas y navegación.</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="q1_2" value="b" id="q1_2_b" />
                <label className="form-check-label" htmlFor="q1_2_b">Para estilos.</label>
              </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={() => checkQuiz(1)}>Revisar</button>
            {quizResults[1] && (
              <div className={`alert alert-${quizResults[1].type} mt-2`}>
                {quizResults[1].message}
                {quizResults[1].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
              </div>
            )}
          </div>
        </>
      ),
      
      2: (
        <>
          <h2 className='hero'>Módulo 2: Configuración de Bootstrap</h2>
          <p>Hay dos formas de integrar Bootstrap. Puedes agregarlo en <code>index.html</code> o importarlo en <code>main.jsx</code>.</p>

          <h5>Método 1: En <code>index.html</code></h5>
          <pre><code>{`
      <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">

      <script type="module" src="node_modules/bootstrap/dist/js/bootstrap.bundle.js"></script>`}</code></pre>

          <h5>Método 2: En <code>main.jsx</code></h5>
          <pre><code>{`
      import 'bootstrap/dist/css/bootstrap.min.css';
      import 'bootstrap/dist/js/bootstrap.bundle.min.js';`}</code></pre>

          <div className="quiz mt-4">
            <h4>Autoevaluación</h4>
            <div className="quiz-question">
              <p>1. ¿En qué archivo se importa Bootstrap si se usa el segundo método?</p>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="q2_1" value="a" id="q2_1_a" />
                <label className="form-check-label" htmlFor="q2_1_a">App.jsx</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="q2_1" value="b" id="q2_1_b" />
                <label className="form-check-label" htmlFor="q2_1_b">main.jsx</label>
              </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={() => checkQuiz(2)}>Revisar</button>
            {quizResults[2] && (
              <div className={`alert alert-${quizResults[2].type} mt-2`}>
                {quizResults[2].message}
                {quizResults[2].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
              </div>
            )}
          </div>
        </>
      ),
      3: (
        <>
          <h2 className='hero'>Módulo 3: Limpieza y Configuración del Tema</h2>
              <p>Para empezar, es buena práctica limpiar los estilos por defecto y configurar el tema de la aplicación.</p>
              <ul>
                <li>Limpiar <code>App.css</code> y <code>index.css</code>.</li>
                <li>Limpiar <code>App.jsx</code> y usar la extensión <code>ES7+ React/Redux/React-Native snippets</code> para generar un componente base con <code>rafce</code>.</li>
                <li>Añadir un tema oscuro en <code>index.html</code>: <code>{`<body data-bs-theme="dark">`}</code>.</li>
              </ul>

              <div className="quiz mt-4">
                <h4>Autoevaluación</h4>
                <div className="quiz-question">
                  <p>1. ¿Qué snippet se usa para crear un componente funcional de React rápidamente?</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q3_1" value="a" id="q3_1_a" />
                    <label className="form-check-label" htmlFor="q3_1_a">rafce</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q3_1" value="b" id="q3_1_b" />
                    <label className="form-check-label" htmlFor="q3_1_b">react-component</label>
                  </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => checkQuiz(3)}>Revisar</button>
                {quizResults[3] && (
                  <div className={`alert alert-${quizResults[3].type} mt-2`}>
                    {quizResults[3].message}
                    {quizResults[3].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
                  </div>
                )}
              </div>
            </>
      ),
      4: (
        <>
          <h2 className='hero'>Módulo 4: Estructura de Carpetas</h2>
          <p>Organizar el código es clave. Crearemos carpetas para los componentes reutilizables y las páginas de la aplicación.</p>
          <ul>
            <li><code>src/components</code>: Para componentes como Header, Footer, etc.</li>
            <li><code>src/pages</code>: Para las páginas principales como Inicio, Tienda, etc.</li>
          </ul>

          <div className="quiz mt-4">
            <h4>Autoevaluación</h4>
            <div className="quiz-question">
              <p>1. ¿Dónde colocarías un componente de <code>TarjetaProducto</code>?</p>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="q4_1" value="a" id="q4_1_a" />
                <label className="form-check-label" htmlFor="q4_1_a">src/pages</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="q4_1" value="b" id="q4_1_b" />
                <label className="form-check-label" htmlFor="q4_1_b">src/components</label>
              </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={() => checkQuiz(4)}>Revisar</button>
            {quizResults[4] && (
              <div className={`alert alert-${quizResults[4].type} mt-2`}>
                {quizResults[4].message}
                {quizResults[4].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
              </div>
            )}
          </div>
        </>
      ),
      5: (
          <>
            <h2 className='hero'>Módulo 5: Sistema de Rutas</h2>
            <p>Usando <code>react-router-dom</code>, configuramos la navegación de nuestra aplicación.</p>
            <pre><code>{`import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

        // En tu componente de menú
        <Link to="/inicio">Inicio</Link>

        // En App.jsx
        <BrowserRouter>
          <Header /> // ruta estatica
          <Routes> // las rutas dinamicas
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda />} />
          </Routes>
          <Footer /> // ruta estatica
        </BrowserRouter>`}</code></pre>

            <div className="quiz mt-4">
              <h4>Autoevaluación</h4>
              <div className="quiz-question">
                <p>1. ¿Qué componente de <code>react-router-dom</code> se usa para crear enlaces de navegación?</p>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q5_1" value="a" id="q5_1_a" />
                  <label className="form-check-label" htmlFor="q5_1_a">Route</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q5_1" value="b" id="q5_1_b" />
                  <label className="form-check-label" htmlFor="q5_1_b">Link</label>
                </div>
              </div>
              <button className="btn btn-primary mt-3" onClick={() => checkQuiz(5)}>Revisar</button>
              {quizResults[5] && (
                <div className={`alert alert-${quizResults[5].type} mt-2`}>
                  {quizResults[5].message}
                  {quizResults[5].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
                </div>
              )}
            </div>
          </>
        ),
      6: (
          <>
            <h2 className='hero'>Módulo 6: Componente Dinámico con <code>dummyjson</code></h2>
            <p>Aprende a traer datos de una API externa y mostrarlos en tu aplicación.</p>
            <pre><code>{`import { useEffect, useState } from "react";

        const [datos, setDatos] = useState([]);

          const [datos, setDatos] = useState([]);
          const getDatos = async () => {
              const response = await fetch('https://dummyjson.com/products/category/smartphones');
              const data = await response.json();
              setDatos(data.products);
          };

          useEffect(() => {
              getDatos();
          }, []);

        `}</code></pre>

            <div className="quiz mt-4">
              <h4>Autoevaluación</h4>
              <div className="quiz-question">
                <p>1. ¿Qué hook de React se usa para realizar efectos secundarios, como un fetch de datos?</p>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q6_1" value="a" id="q6_1_a" />
                  <label className="form-check-label" htmlFor="q6_1_a">useState</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q6_1" value="b" id="q6_1_b" />
                  <label className="form-check-label" htmlFor="q6_1_b">useEffect</label>
                </div>
              </div>
              <button className="btn btn-primary mt-3" onClick={() => checkQuiz(6)}>Revisar</button>
              {quizResults[6] && (
                <div className={`alert alert-${quizResults[6].type} mt-2`}>
                  {quizResults[6].message}
                  {quizResults[6].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
                </div>
              )}
            </div>
          </>
        ),
      7: (
            <>
              <h2 className='hero'>Módulo 7: Anatomía de un Componente Dinámico</h2>
              <p>Este es el corazón de nuestras páginas de contenido. Analicemos el componente <code>Movil.jsx</code>.</p>

              <h5>1. Importaciones</h5>
              <p>Se importan los hooks <code>useEffect</code> y <code>useState</code> de React, y el componente <code>Cardprod</code> que se usará para mostrar cada producto.</p>
              <pre><code>{`
          import { useEffect, useState } from "react";
          import Cardprod from "../components/Cardprod";`}</code></pre>

              <h5>2. Constante de la API</h5>
              <p>Se define la URL de la API de donde se obtendrán los datos.</p>
              <pre><code>{`const API = 'https://dummyjson.com/products/category/smartphones';`}</code></pre>

              <h5>3. Estados del Componente</h5>
              <p>Se utilizan tres estados:</p>
              <ul>
                <li><b>datos:</b> Para almacenar los productos obtenidos de la API.</li>
                <li><b>loading:</b> Para saber si la carga de datos está en curso.</li>
                <li><b>error:</b> Para almacenar cualquier error que ocurra durante la carga.</li>
              </ul>
              <pre><code>{`
          const [datos, setDatos] = useState([]);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState(null);`}
          
          </code></pre>
                <br/>
              <h5>4. Carga de Datos (<code>getDatos</code> y <code>useEffect</code>)</h5>
              <p>La función <code>getDatos</code> es una función asíncrona que hace la petición a la API. El hook <code>useEffect</code> se asegura de que esta función se llame solo una vez, cuando el componente se monta por primera vez.</p>
              <pre><code>{`
          useEffect(() => {
              getDatos();
          }, []);`}</code></pre>
        <br/>
              <h5>5. Renderizado Condicional</h5>
              <p>Mientras se cargan los datos (<code>loading === true</code>), se muestra un spinner. Si hay un error, se muestra un mensaje de error. Esto mejora la experiencia del usuario.</p>
          <br/>
              <h5>6. Renderizado de la Lista</h5>
              <p>Una vez que los datos se han cargado, se utiliza <code>.map()</code> para recorrer el array <code>datos</code> y renderizar un componente <code>Cardprod</code> por cada elemento.</p>
              <pre><code>{`{
              datos.map((item) => (
                <Cardprod item={item} key={item.id} />
              ))}`}</code></pre>

              <div className="quiz mt-4">
                <h4>Autoevaluación</h4>
                <div className="quiz-question">
                  <p>1. ¿Qué hook se usa para guardar los datos de la API?</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q7_1" value="a" id="q7_1_a" />
                    <label className="form-check-label" htmlFor="q7_1_a">useEffect</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q7_1" value="b" id="q7_1_b" />
                    <label className="form-check-label" htmlFor="q7_1_b">useState</label>
                  </div>
                </div>
                <div className="quiz-question mt-3">
                  <p>2. ¿Para qué sirve el segundo argumento <code>[]</code> en <code>useEffect</code>?</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q7_2" value="a" id="q7_2_a" />
                    <label className="form-check-label" htmlFor="q7_2_a">Para que se ejecute en cada render.</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q7_2" value="b" id="q7_2_b" />
                    <label className="form-check-label" htmlFor="q7_2_b">Para que se ejecute solo una vez.</label>
                  </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => checkQuiz(7)}>Revisar</button>
                {quizResults[7] && (
                  <div className={`alert alert-${quizResults[7].type} mt-2`}>
                    {quizResults[7].message}
                    {quizResults[7].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
                  </div>
                )}
              </div>
            </>
        ), 
      8: (
            <>
              <h2 className='hero'>Módulo 8: Rutas Dinámicas y Componentes Reutilizables</h2>
              <p>Vamos a ver cómo crear páginas que cambian según la URL y cómo reutilizar componentes para ser más eficientes.</p>

              <h5>1. El Componente <code>FiltroCategorias.jsx</code></h5>
              <p>Este componente es un buen ejemplo de reutilización. Su única responsabilidad es obtener la lista de todas las categorías de productos y mostrarlas como una lista de enlaces. La ventaja es que podemos usar este componente en cualquier parte de la aplicación (por ejemplo, en un menú de navegación) sin tener que reescribir la lógica.</p>
              <pre><code>{`// En FiltroCategorias.jsx
          {datos && datos.map((item, index) => (
            <li key={index}>
              <Link to={\`/categorias/\${item}\`}>{item}</Link>
            </li>
          ))}`}</code></pre>
              <br/>
              <h5>2. Rutas con Parámetros</h5>
              <p>En nuestro sistema de rutas (<code>App.jsx</code>), definimos una ruta que acepta un parámetro dinámico. La sintaxis <code>:id</code> le dice a React Router que esa parte de la URL puede variar.</p>
              <pre><code>{`// En App.jsx
          <Route path="/categorias/:id" element={<Categorias />} />`}</code></pre>
              <p>Cuando un usuario hace clic en un enlace generado por <code>FiltroCategorias</code>, navega a una URL como <code>/categorias/smartphones</code>. El valor <code>smartphones</code> es el parámetro.</p>
              <br/>
              <h5>3. Accediendo al Parámetro con <code>useParams</code></h5>
              <p>El componente <code>Categorias.jsx</code> necesita saber qué categoría mostrar. Para ello, usa el hook <code>useParams</code> de React Router, que devuelve un objeto con los parámetros de la URL.</p>
              <pre><code>{`// En Categorias.jsx
          import { useParams } from "react-router-dom";

          const params = useParams(); // params será { id: 'smartphones' }
          const URI = API + params.id; // Se construye la URL de la API dinámicamente`}</code></pre>
              <br/>
          <h5>4. Re-ejecutando el Efecto</h5>
              <p>Queremos que los productos se actualicen cada vez que el usuario elija una nueva categoría. Para lograrlo, añadimos <code>params.id</code> al array de dependencias del hook <code>useEffect</code>. Esto le indica a React que debe volver a ejecutar el efecto (y por lo tanto, hacer una nueva petición a la API) cada vez que el valor de <code>params.id</code> cambie.</p>
              <pre><code>{`// En Categorias.jsx
          useEffect(() => {
              getDatos();
          }, [params.id]); // Se ejecuta cada vez que cambia el id de la categoría`}</code></pre>

              <div className="quiz mt-4">
                <h4>Autoevaluación</h4>
                <div className="quiz-question">
                  <p>1. ¿Qué hook de React Router se usa para leer parámetros de la URL?</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q8_1" value="a" id="q8_1_a" />
                    <label className="form-check-label" htmlFor="q8_1_a">useState</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q8_1" value="b" id="q8_1_b" />
                    <label className="form-check-label" htmlFor="q8_1_b">useParams</label>
                  </div>
                </div>
                <div className="quiz-question mt-3">
                  <p>2. ¿Qué significa la sintaxis <code>:id</code> en la definición de una ruta?</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q8_2" value="a" id="q8_2_a" />
                    <label className="form-check-label" htmlFor="q8_2_a">Es un parámetro dinámico.</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q8_2" value="b" id="q8_2_b" />
                    <label className="form-check-label" htmlFor="q8_2_b">Es una ruta estática.</label>
                  </div>
                </div>
                <div className="quiz-question mt-3">
                  <p>3. ¿Por qué se añade <code>params.id</code> al array de dependencias de <code>useEffect</code> en <code>Categorias.jsx</code>?</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q8_3" value="a" id="q8_3_a" />
                    <label className="form-check-label" htmlFor="q8_3_a">Para que los datos se carguen solo una vez.</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q8_3" value="b" id="q8_3_b" />
                    <label className="form-check-label" htmlFor="q8_3_b">Para que los datos se recarguen si la categoría cambia.</label>
                  </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => checkQuiz(8)}>Revisar</button>
                {quizResults[8] && (
                  <div className={`alert alert-${quizResults[8].type} mt-2`}>
                    {quizResults[8].message}
                    {quizResults[8].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
                  </div>
                )}
              </div>
            </>
        ),
      9: (
            <>
              <h2 className='hero'>Módulo 9: Rutas con Múltiples Parámetros y Página de Detalle</h2>
              <p>Aprenderemos a pasar múltiples parámetros a una ruta y cómo la página de detalle los recibe para mostrar información específica.</p>

              <h5>1. Definición de la Ruta en <code>App.jsx</code></h5>
              <p>Para que nuestra aplicación pueda manejar URLs con múltiples datos, como el ID y el nombre de un producto, debemos definir la ruta en <code>App.jsx</code> de la siguiente manera:</p>
              <pre><code>{`// En App.jsx
          <Route path="/detalle/:id/:nombre" element={<Detalle />} />`}</code></pre>
              <p>La sintaxis <code>:id</code> y <code>:nombre</code> indica que esas partes de la URL son parámetros dinámicos que React Router capturará.</p>
              <br/>
              <h5>2. Navegación a la Página de Detalle</h5>
              <p>Desde cualquier componente, como <code>Cardprod.jsx</code>, podemos crear un enlace que incluya estos parámetros. Usaremos el componente <code>Link</code> de <code>react-router-dom</code>:</p>
              <pre><code>{`// En Cardprod.jsx (o donde se genere el enlace)
          <Link to={\`/detalle/\${item.id}/\${item.title}\`} className="btn btn-info btn-sm">Detalle</Link>`}</code></pre>
              <p>Aquí, <code>item.id</code> y <code>item.title</code> son los valores que se pasarán como <code>id</code> y <code>nombre</code> respectivamente.</p>
                <br/>
              <h5>3. Recepción de Parámetros en <code>Detalle.jsx</code></h5>
              <p>En la página <code>Detalle.jsx</code>, utilizaremos el hook <code>useParams</code> para acceder a los valores de <code>id</code> y <code>nombre</code> que vienen en la URL.</p>
              <pre><code>{`// En Detalle.jsx
          import { useParams } from "react-router-dom";

          const Detalle = () => {
              const { id } = useParams(); // Obtenemos el ID 
              const {nombre } = useParams(); // Obtenemos el nombre
              const URI = API+ id
              // ... lógica para usar id y nombre
          };`}</code></pre>
              <br/>
              <h5>4. Uso de los Parámetros para Fetch de Datos</h5>
              <p>Una vez que tenemos el <code>id</code>, podemos usarlo para hacer una petición a la API y obtener los detalles específicos de ese producto. Para mantener la consistencia con el resto del curso, utilizaremos una función asíncrona <code>getProduct</code>.</p>
              <pre><code>{`// En Detalle.jsx
          const getProduct = async () => {
              try {
                  const res = await fetch(URI); // https://dummyjson.com/products/1 
                  if (!res.ok) throw new Error(\`Error al cargar datos (status: \${res.status})\`);
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
          }, [id]); // El efecto se re-ejecuta si el id cambia`}</code></pre>

              <div className="quiz mt-4">
                <h4>Autoevaluación</h4>
                <div className="quiz-question">
                  <p>1. ¿Qué hook se usa para obtener múltiples parámetros de la URL?</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q9_1" value="a" id="q9_1_a" />
                    <label className="form-check-label" htmlFor="q9_1_a">useState</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q9_1" value="b" id="q9_1_b" />
                    <label className="form-check-label" htmlFor="q9_1_b">useParams</label>
                  </div>
                </div>
                <div className="quiz-question mt-3">
                  <p>2. ¿Cómo se define una ruta con dos parámetros dinámicos, <code>id</code> y <code>nombre</code>?</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q9_2" value="a" id="q9_2_a" />
                    <label className="form-check-label" htmlFor="q9_2_a"><code>/ruta/:id/:nombre</code></label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="q9_2" value="b" id="q9_2_b" />
                    <label className="form-check-label" htmlFor="q9_2_b"><code>/ruta?id&nombre</code></label>
                  </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => checkQuiz(9)}>Revisar</button>
                {quizResults[9] && (
                  <div className={`alert alert-${quizResults[9].type} mt-2`}>
                    {quizResults[9].message}
                    {quizResults[9].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
                  </div>
                )}
              </div>
            </>
        ),
      10: (
          <>
            <h2 className='hero'>Módulo 10: Paginación de Resultados</h2>
            <p>Cuando trabajamos con grandes cantidades de datos, es fundamental paginar los resultados para mejorar el rendimiento y la experiencia de usuario.</p>

            <h5>1. Nuevos Estados para la Paginación</h5>
            <p>En <code>Tienda.jsx</code>, añadimos tres nuevos estados para controlar la paginación:</p>
            <ul>
              <li><b>skip:</b> Indica cuántos productos se deben "saltar" o ignorar al principio de la lista. Es el punto de partida para cada página.</li>
              <li><b>total:</b> Almacena el número total de productos disponibles en la API. Es crucial para saber cuándo detener la paginación.</li>
              <li><b>pagina:</b> Define cuántos productos queremos mostrar por página (en este caso, 12).</li>
            </ul>
            <pre><code>{`
        const [skip, setSkip] = useState(0);
        const [total, setTotal] = useState(0);
        const [pagina, setPagina] = useState(12);`}</code></pre>
            <br/>
            <h5>2. API con Parámetros <code>limit</code> y <code>skip</code></h5>
            <p>La API de <code>dummyjson</code> nos permite controlar la paginación mediante parámetros en la URL. La URL se construye dinámicamente usando el estado <code>skip</code>.</p>
            <pre><code>{`const API = 'https://dummyjson.com/products?limit=12&skip=';
        const URI = API + skip; // Ejemplo: ...?limit=12&skip=0, ...?limit=12&skip=12, etc.`}</code></pre>
            <p><code>limit=12</code> le dice a la API que solo nos devuelva 12 productos, y <code>skip=...</code> le indica desde qué punto empezar.</p>
            <br/>
            <h5>3. Lógica de los Botones de Paginación</h5>
            <p>Los botones "Anterior" y "Siguiente" modifican el estado <code>skip</code> para cambiar de página.</p>
            <h6>Botón Anterior:</h6>
            <pre><code>{`
            onClick={() => {
              if (skip >= pagina) { // Comprueba si no estamos en la primera página
                  setSkip(skip - pagina); // Resta 12 a skip para ir a la página anterior
              }
            }}`}</code></pre>
            <h6>Botón Siguiente:</h6>
            <pre><code>{`onClick={() => {
            if (skip + pagina < total) { // Comprueba si hay más productos para mostrar
                setSkip(skip + pagina); // Suma 12 a skip para ir a la página siguiente
            }
        }}`}</code></pre>
            <br/>
            <h5>4. <code>useEffect</code> y la Dependencia de <code>skip</code></h5>
            <p>Al igual que en el módulo anterior, usamos el array de dependencias de <code>useEffect</code>. Esta vez, le pasamos <code>[skip]</code>. Esto hace que cada vez que <code>skip</code> cambie (es decir, cada vez que el usuario pulse un botón de paginación), el efecto se vuelva a ejecutar, realizando una nueva petición a la API para obtener los productos de la nueva página.</p>
            <pre><code>{`
            useEffect(() => {
                getDatos();
            }, [skip]);`}</code></pre>

            <div className="quiz mt-4">
              <h4>Autoevaluación</h4>
              <div className="quiz-question">
                <p>1. ¿Qué estado se modifica para cambiar de página?</p>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q10_1" value="a" id="q10_1_a" />
                  <label className="form-check-label" htmlFor="q10_1_a">total</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q10_1" value="b" id="q10_1_b" />
                  <label className="form-check-label" htmlFor="q10_1_b">skip</label>
                </div>
              </div>
              <div className="quiz-question mt-3">
                <p>2. ¿Qué parámetro de la URL de la API define cuántos productos obtener?</p>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q10_2" value="a" id="q10_2_a" />
                  <label className="form-check-label" htmlFor="q10_2_a">limit</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q10_2" value="b" id="q10_2_b" />
                  <label className="form-check-label" htmlFor="q10_2_b">skip</label>
                </div>
              </div>
              <div className="quiz-question mt-3">
                <p>3. ¿Por qué es importante el estado <code>total</code>?</p>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q10_3" value="a" id="q10_3_a" />
                  <label className="form-check-label" htmlFor="q10_3_a">Para saber cuándo deshabilitar el botón "Siguiente".</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q10_3" value="b" id="q10_3_b" />
                  <label className="form-check-label" htmlFor="q10_3_b">Para saber cuántos productos saltar.</label>
                </div>
              </div>
              <button className="btn btn-primary mt-3" onClick={() => checkQuiz(10)}>Revisar</button>
              {quizResults[10] && (
                <div className={`alert alert-${quizResults[10].type} mt-2`}>
                  {quizResults[10].message}
                  {quizResults[10].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
                </div>
              )}
            </div>
          </>
        ),
      11: (
        <>
          <h2 className='hero'>Módulo 11: Implementando Búsquedas</h2>
          <p>Una funcionalidad clave en muchas aplicaciones es la búsqueda. Veremos cómo implementarla comunicando dos componentes a través del estado de la ruta.</p>

          <h5>1. El Formulario en <code>Header.jsx</code></h5>
          <p>El `Header` contiene el campo de búsqueda. Para que funcione, necesitamos:</p>
          <ul>
              <li><b>Un estado para el input:</b> Se usa <code>useState</code> para guardar lo que el usuario escribe.</li>
              <li><b>Un manejador de eventos:</b> La función <code>manejoEnvio</code> se ejecuta cuando el usuario envía el formulario.</li>
              <li><b>Navegación programática:</b> Se usa el hook <code>useNavigate</code> para redirigir al usuario a la página de resultados.</li>
          </ul>
<pre>
  <code>{`// En Header.jsx
const [txtbuscar, setTxtbuscar] = useState('');
const navigate = useNavigate();

const manejoEnvio = (event) => {
  event.preventDefault();
  navigate('/busquedas', { state: txtbuscar });
};`}</code>
</pre>
          <p>Lo más importante aquí es <code></code>. No solo cambiamos de página, sino que también pasamos el término de búsqueda (<code>txtbuscar</code>) a través del objeto <code>state</code> de la navegación.</p>

          <h5>2. La Página de Resultados <code>Busquedas.jsx</code></h5>
          <p>Esta página debe recibir el término de búsqueda y mostrar los resultados.</p>
          
          <h6>Recepción de datos con <code>useLocation</code></h6>
          <p>El hook <code>useLocation</code> nos da acceso a la información de la ruta actual, incluyendo el objeto <code>state</code> que enviamos desde el `Header`.</p>
          <pre><code>{`// En Busquedas.jsx
import { useLocation } from 'react-router-dom';

const location = useLocation();
const txtBuscar = location.state; // Recuperamos el término de búsqueda`}</code></pre>

          <h6>API de Búsqueda de `dummyjson`</h6>
          <p>La API de `dummyjson` ofrece un endpoint específico para búsquedas. La consulta se pasa como un parámetro `q` en la URL.</p>
          <pre><code>{`const API = 'https://dummyjson.com/products/search?q=';
const URI = API + txtBuscar; // Se construye la URL final`}</code></pre>

          <h6>Disparando la Búsqueda</h6>
          <p>Finalmente, al igual que en módulos anteriores, <code>useEffect</code> se encarga de llamar a la API. Se ejecuta cada vez que <code>txtBuscar</code> cambia, asegurando que se realice una nueva búsqueda si el usuario decide buscar otra cosa.</p>
          <pre><code>{`useEffect(() => {
    getDatos();
}, [txtbuscar]);`}</code></pre>

          <div className="quiz mt-4">
              <h4>Autoevaluación</h4>
              <div className="quiz-question">
                <p>1. ¿Qué hook se usa para navegar a otra ruta y pasarle datos?</p>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q11_1" value="a" id="q11_1_a" />
                  <label className="form-check-label" htmlFor="q11_1_a">useLocation</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q11_1" value="b" id="q11_1_b" />
                  <label className="form-check-label" htmlFor="q11_1_b">useNavigate</label>
                </div>
              </div>
              <div className="quiz-question mt-3">
                <p>2. ¿Cómo se pasan datos de una ruta a otra al navegar?</p>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q11_2" value="a" id="q11_2_a" />
                  <label className="form-check-label" htmlFor="q11_2_a">A través del objeto `state`.</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q11_2" value="b" id="q11_2_b" />
                  <label className="form-check-label" htmlFor="q11_2_b">A través de parámetros en la URL.</label>
                </div>
              </div>
              <div className="quiz-question mt-3">
                <p>3. ¿Qué hook se usa en la página de destino para leer los datos pasados?</p>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q11_3" value="a" id="q11_3_a" />
                  <label className="form-check-label" htmlFor="q11_3_a">useLocation</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="q11_3" value="b" id="q11_3_b" />
                  <label className="form-check-label" htmlFor="q11_3_b">useParams</label>
                </div>
              </div>
              <button className="btn btn-primary mt-3" onClick={() => checkQuiz(11)}>Revisar</button>
              {quizResults[11] && (
                <div className={`alert alert-${quizResults[11].type} mt-2`}>
                  {quizResults[11].message}
                  {quizResults[11].perfect && <div className="mt-1">¡Perfecto! 🎉</div>}
                </div>
              )}
          </div>
        </>
      )
    };

    return modules[currentModule] || <p>Módulo {currentModule} en desarrollo...</p>;
  };

  return (
    <div className='mt-5'>
      {/* Navbar mejorado con accesibilidad */}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Curso React</Link>
          <div className="d-flex align-items-center w-50">
            <span className="text-white me-2 d-none d-md-inline">Progreso:</span>
            <div className="progress flex-grow-1" style={{ height: '25px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`Progreso del curso: ${progress}%`}
              >
                {progress}%
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal con mejor estructura */}
      <main className="container mt-4">
        <div id="courseContent" className="course-module">
          {renderModule()}
        </div>

        {/* Botones de navegación con mejor accesibilidad */}
        <div className="d-flex justify-content-between mt-4 mb-5">
          <button
            className="btn btn-secondary"
            onClick={() => handleNavigate(-1)}
            disabled={currentModule === 1}
            aria-disabled={currentModule === 1}
          >
            &larr; Anterior
          </button>
          <span className="d-flex align-items-center">
            Módulo {currentModule} de {totalModules}
          </span>
          <button
            className="btn btn-primary"
            onClick={() => handleNavigate(1)}
            disabled={currentModule === totalModules}
            aria-disabled={currentModule === totalModules}
          >
            Siguiente &rarr;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Autoevaluacion;