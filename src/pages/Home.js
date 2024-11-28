import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [ofertas1, setOfertas1] = useState([]);
    const [ofertas2, setOfertas2] = useState([]);
    const [ofertas3, setOfertas3] = useState([]);
    const navigate = useNavigate();

    // Detectar cambio de tamaño de pantalla
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Asegurar que las listas estén colapsadas en móvil
    useEffect(() => {
        if (isMobile) {
            setIsOpen1(false);
            setIsOpen2(false);
            setIsOpen3(false);
        } else {
            setIsOpen1(true);
            setIsOpen2(true);
            setIsOpen3(true);
        }
    }, [isMobile]);

    const fetchOfertas = async () => {
        try {
            const response1 = await fetch('/api/ofertas/Ingeniería Informática');
            const response2 = await fetch('/api/ofertas/Ingeniería Civil Informática');
            const response3 = await fetch('/api/ofertas/Ingeniería Civil en Ciencia de Datos');

            if (!response1.ok || !response2.ok || !response3.ok) {
                throw new Error('Error al obtener las ofertas activas');
            }

            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();

            setOfertas1(data1);
            setOfertas2(data2);
            setOfertas3(data3);
        } catch (error) {
            console.error('Error al obtener las ofertas activas:', error);
        }
    };

    useEffect(() => {
        fetchOfertas(); // Cargar las ofertas al montar el componente
    }, []);

    const toggleOpen1 = () => setIsOpen1(!isOpen1);
    const toggleOpen2 = () => setIsOpen2(!isOpen2);
    const toggleOpen3 = () => setIsOpen3(!isOpen3);

    const handleOfferClick = (ramoId, carreraId) => {
        if (ramoId && carreraId) {
            navigate(`/formulario/verificar/${ramoId}/${carreraId}`);
        }
    };

    return (
        <div className="container mx-auto py-4 w-full">
            <h1 className="text-3xl font-bold text-orange-500 text-center mb-10">Ofertas Ayudantías Primer Semestre 2025</h1>

            <div className="flex flex-col md:flex-row justify-center">
                <div className="w-full md:w-1/3 flex flex-col mx-4 mb-6">
                    <div className="bg-white p-2 rounded-lg shadow-md max-w-xl">
                        <div className="mb-2 title-container flex justify-between items-center">
                            <h2 className="text-lg font-bold text-blue-500 text-center flex-1">Ingeniería Informática</h2>
                            {isMobile && (
                                <span onClick={toggleOpen1} className="cursor-pointer  text-cyan-500 ml-2">
                                    {isOpen1 ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            )}
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ${isOpen1 ? 'max-h-80' : 'max-h-0'}`}>
                            <div className="rounded p-4 bg-white list-container">
                                <ul className="text-left list-disc list-inside">
                                    {ofertas1.length > 0 ? (
                                        ofertas1.map((oferta, index) => (
                                            <li key={index} className="my-2">
                                                <button
                                                    onClick={() => handleOfferClick(oferta.ramo_id, oferta.carrera_id)}
                                                    className="text-cyan-500 hover:underline"
                                                >
                                                    {`${oferta.sigla} - ${oferta.nombre}`}
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-black">No hay ofertas activas.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex flex-col mx-4 mb-6">
                    <div className="bg-white p-2 rounded-lg shadow-md max-w-xl">
                        <div className="mb-2 title-container flex justify-between items-center">
                            <h2 className="text-lg font-bold text-blue-500 text-center flex-1">Ingeniería Civil Informática</h2>
                            {isMobile && (
                                <span onClick={toggleOpen2} className="cursor-pointer text-cyan-500 ml-2">
                                    {isOpen2 ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            )}
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ${isOpen2 ? 'max-h-80' : 'max-h-0'}`}>
                            <div className="rounded p-4 bg-white list-container">
                                <ul className="text-left list-disc list-inside">
                                    {ofertas2.length > 0 ? (
                                        ofertas2.map((oferta, index) => (
                                            <li key={index} className="my-2">
                                                <button
                                                    onClick={() => handleOfferClick(oferta.ramo_id, oferta.carrera_id)}
                                                    className="text-cyan-500 hover:underline"
                                                >
                                                    {`${oferta.sigla} - ${oferta.nombre}`}
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-black">No hay ofertas activas.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex flex-col mx-4 mb-6">
                    <div className="bg-white p-2 rounded-lg shadow-md max-w-xl">
                        <div className="mb-2 title-container flex justify-between items-center">
                            <h2 className="text-lg font-bold text-blue-500 text-center flex-1">Ingeniería Civil en Ciencia de Datos</h2>
                            {isMobile && (
                                <span onClick={toggleOpen3} className="cursor-pointer text-cyan-500 ml-2">
                                    {isOpen3 ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            )}
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ${isOpen3 ? 'max-h-80' : 'max-h-0'}`}>
                            <div className="rounded p-4 bg-white list-container">
                                <ul className="text-left list-disc list-inside">
                                    {ofertas3.length > 0 ? (
                                        ofertas3.map((oferta, index) => (
                                            <li key={index} className="my-2">
                                                <button
                                                    onClick={() => handleOfferClick(oferta.ramo_id, oferta.carrera_id)}
                                                    className="text-cyan-500 hover:underline"
                                                >
                                                    {`${oferta.sigla} - ${oferta.nombre}`}
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-black">No hay ofertas activas.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
