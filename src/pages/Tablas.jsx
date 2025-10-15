import { useEffect, useState, useMemo } from "react";

import {
    FaSort,
    FaSortUp,
    FaSortDown,
    FaAngleDoubleLeft,
    FaAngleLeft,
    FaAngleRight,
    FaAngleDoubleRight,
    FaEye,
    FaInfoCircle,

} from 'react-icons/fa';
import Cardprod from "../components/Cardprod";
import { Link } from "react-router-dom";
import ModalProd from "../components/ModalProd";
const API = 'https://dummyjson.com/products?limit=300';

const Tablas = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //filtros con input
    const [searchTerm, setSearchTerm] = useState('');

    // ordenamientos
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // paginacion 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Puedes cambiarlo a 20, 25, etc.


    // combo para filtrar por categorias
    const [selectedCategory, setSelectedCategory] = useState('');


    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.products);

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // filtro para titulo, marca y categoria
    /*
    const filteredData = datos.filter(item =>
        (item.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (item.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (item.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())

    );
*/
    // este filtro se usara cuando se agregue el combo por categorias
    const filteredData = useMemo(() => {
        return datos.filter(item => {
            const matchesSearch =
                (item.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (item.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (item.category?.toLowerCase() || '').includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || item.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [datos, searchTerm, selectedCategory]);


    // Resúmenes globales (asegurando que sean números)
    const totalStock = filteredData.reduce((sum, item) => sum + Number(item.stock), 0);
    const totalInventoryValue = filteredData.reduce((sum, item) => sum + Number(item.price) * Number(item.stock), 0);

    // ordenamiento
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue === bValue) return 0;

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue, 'es', { numeric: true })
                    : bValue.localeCompare(aValue, 'es', { numeric: true });
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Después de sortedData
    // Datos ya ordenados y filtrados
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);


    // paginacion  despues de obtener sortedData 
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    //Funciones de navegación
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const getPageNumbers = () => {
        const delta = 2; // Cuántos botones a cada lado de la página actual
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
            range.push(i);
        }

        if (range[0] > 1) {
            rangeWithDots.push(1);
            if (range[0] > 2) rangeWithDots.push('...');
        }

        rangeWithDots.push(...range);

        if (range[range.length - 1] < totalPages) {
            if (range[range.length - 1] < totalPages - 1) rangeWithDots.push('...');
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };


    // para el filtro con combo para categorias
    const categories = useMemo(() => {
        const cats = datos.map(item => item.category);
        return ['Todas', ...new Set(cats)].sort(); // 'Todas' al inicio
    }, [datos]);


    // para el total

    const categorySummary = useMemo(() => {
        const summary = {};
        datos.forEach(item => {
            if (!summary[item.category]) {
                summary[item.category] = {
                    category: item.category,
                    productCount: 0,
                    totalStock: 0,
                    totalValue: 0,
                    percent: 0
                };
            }
            summary[item.category].productCount += 1;
            summary[item.category].totalStock += Number(item.stock);
            summary[item.category].totalValue += Number(item.price) * Number(item.stock);
        });

        const totalValue = Object.values(summary).reduce((acc, cat) => acc + cat.totalValue, 0);

        Object.values(summary).forEach(cat => {
            cat.percent = (cat.totalValue / totalValue) * 100;
        });

        return Object.values(summary).sort((a, b) => a.category.localeCompare(b.category));
    }, [datos]);

    const formatCurrency = (value) => {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
            return '0,00';
        }
        // Forzar formato con separador de miles siempre
        const parts = numericValue.toFixed(2).split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const decimalPart = parts[1];

        return `${integerPart},${decimalPart}`;
    };
    const formatNumber = (value) => {
        const numericValue = Number(value);

        if (isNaN(numericValue)) {
            return '0';
        }

        // Formato sin decimales
        const integerValue = Math.round(numericValue);
        return integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Totales GLOBALES (sin filtros, para el modal)
    const globalTotals = useMemo(() => {
        let productCount = 0;
        let totalStock = 0;
        let totalValue = 0;

        datos.forEach(item => {
            productCount++;
            totalStock += Number(item.stock);
            totalValue += Number(item.price) * Number(item.stock);
        });

        return { productCount, totalStock, totalValue };
    }, [datos]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los Productos</h4>
                <p>{error}</p>
            </div>
        );
    }
    return (
        <div className="container">
            <h4 className="text-center py-4">Lista de Productos</h4>
            <div className="text-end my-3">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Total por Categorias
                </button>
            </div>

            <div className="row ">
                <div className="col-md-6">
                    <div className="d-flex justify-content-between">
                        <nav>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => goToPage(1)} disabled={currentPage === 1}>
                                        <FaAngleDoubleLeft />
                                    </button>
                                </li>
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
                                        <FaAngleLeft />
                                    </button>
                                </li>

                                {getPageNumbers().map((pageNum, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''
                                            }`}
                                    >
                                        {pageNum === '...' ? (
                                            <span className="page-link">...</span>
                                        ) : (
                                            <button
                                                className="page-link"
                                                onClick={() => goToPage(pageNum)}
                                            >
                                                {pageNum}
                                            </button>
                                        )}
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
                                        <FaAngleRight />
                                    </button>
                                </li>
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => goToPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <FaAngleDoubleRight />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((cat, index) => (
                            <option key={index} value={cat === 'Todas' ? '' : cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control "
                        placeholder="Buscar por nombre, marca o categoría..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

            </div>

            <table className="table table-dark table-striped table-hover table-bordered">
                <thead >
                    <tr className="text-center ">
                        <th scope="col">#</th>
                        <th scope="col">Img</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Marca</th>
                        <th scope="col" style={{ cursor: 'pointer' }} onClick={() => handleSort('title')}>
                            Nombre
                            {sortConfig.key === 'title' ? (
                                sortConfig.direction === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                            ) : (
                                <FaSort className="ms-1 text-muted" />
                            )}
                        </th>


                        <th scope="col" style={{ cursor: 'pointer' }} onClick={() => handleSort('price')}>
                            Precio
                            {sortConfig.key === 'price' ? (
                                sortConfig.direction === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                            ) : (
                                <FaSort className="ms-1 text-muted" />
                            )}
                        </th>
                        <th
                            scope="col"
                            className="text-center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSort('stock')}
                        >
                            Stock
                            {sortConfig.key === 'stock' ? (
                                sortConfig.direction === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                            ) : (
                                <FaSort className="ms-1 text-muted" />
                            )}
                        </th>
                        <th scope="col">Total</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {paginatedData.map((item) => (

                        <>
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td><img src={item.thumbnail} alt="" width={50} /></td>
                                <td>{item.category}</td>
                                <td>{item.brand}</td>
                                <td>{item.title}</td>
                                <td className="text-end">{formatCurrency(item.price)} </td>
                                <td className="text-center">{formatNumber(item.stock)}</td>
                                <td className="text-end">{formatCurrency(item.price * item.stock)}</td>
                                <td className="text-center">
                                    <Link to={`/detalle/${item.id}/${item.title}`} href="#"
                                        className="btn btn-sm btn-outline-primary me-2"
                                        title="Ver detalle"

                                    >
                                        <FaEye />
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        title="Más información"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#modal-${item.id}`}
                                    >
                                        <FaInfoCircle />
                                    </button>
                                </td>

                            </tr>
                            <ModalProd item={item} />
                        </>

                    ))}
                </tbody>
                <tfoot>
                    <tr className="table-light text-dark">
                        <td colSpan="6" className="text-end fw-bold">Valor Total del Inventario:</td>
                        <td className="text-center fw-bold">{formatNumber(totalStock)}</td>
                        <td className="text-end fw-bold">{formatCurrency(totalInventoryValue)}</td>
                        <td></td>
                    </tr>
                </tfoot>

            </table>



            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Total por Categorias</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div className="modal-body">

                            <table className="table table-sm table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>Categoría</th>
                                        <th className="text-center">Productos</th>
                                        <th className="text-center">Stock Total</th>
                                        <th className="text-end">Valor del Inventario</th>
                                        <th className="text-end">%</th> {/* Nueva columna */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorySummary.map((cat, index) => (
                                        <tr key={index}>
                                            <td><strong>{cat.category}</strong></td>
                                            <td className="text-center">{cat.productCount}</td>
                                            <td className="text-center">{formatNumber(cat.totalStock)}</td>
                                            <td className="text-end">{formatCurrency(cat.totalValue)}</td>
                                            <td className="text-end">{cat.percent.toFixed(2)}%</td> {/* Muestra porcentaje */}
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="table-light fw-bold">
                                    <tr>
                                        <td>Total General</td>
                                        <td className="text-center">{globalTotals.productCount}</td>
                                        <td className="text-center">{formatNumber(globalTotals.totalStock)}</td>
                                        <td className="text-end">{formatCurrency(globalTotals.totalValue)}</td>
                                        <td></td> {/* Columna % vacía para total */}
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default Tablas