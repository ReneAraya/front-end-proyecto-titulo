import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

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

    const toggleOpen1 = () => setIsOpen1(!isOpen1);
    const toggleOpen2 = () => setIsOpen2(!isOpen2);
    const toggleOpen3 = () => setIsOpen3(!isOpen3);

    const ofertas1 = [
        'Oferta 1.1', 'Oferta 1.2', 'Oferta 1.3', 'Oferta 1.4',
        'Oferta 1.5', 'Oferta 1.6', 'Oferta 1.7', 'Oferta 1.8',
        'Oferta 1.9', 'Oferta 1.10'
    ];
    const ofertas2 = [
        'Oferta 2.1', 'Oferta 2.2', 'Oferta 2.3', 'Oferta 2.4',
        'Oferta 2.5', 'Oferta 2.6', 'Oferta 2.7', 'Oferta 2.8'
    ];
    const ofertas3 = [
        'Oferta 3.1', 'Oferta 3.2', 'Oferta 3.3', 'Oferta 3.4',
        'Oferta 3.5', 'Oferta 3.6', 'Oferta 3.7', 'Oferta 3.8', 'Oferta 3.9', 'Oferta 3.10'
    ];

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-3xl font-bold text-orange-500 text-center mb-10">Ofertas Ayudantías Primer Semestre 2025</h1>

            <div className="flex flex-col md:flex-row justify-center">
                <div className="w-full md:w-1/3 flex flex-col mx-4 mb-6"> {/* Agregado mb-6 */}
                    <div className="bg-white p-2 rounded-lg shadow-md max-w-xl">
                        <div className="mb-2 title-container flex justify-between items-center">
                            <h2 className="text-lg font-bold text-blue-500 text-center flex-1">Ingeniería Informática</h2>
                            {isMobile && (
                                <span onClick={toggleOpen1} className="cursor-pointer text-cyan-500 ml-2">
                                    {isOpen1 ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            )}
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ${isOpen1 ? 'max-h-80' : 'max-h-0'}`}>
                            <div className="rounded p-4 bg-white list-container"> {/* Eliminada clase "border" */}
                                <ul className="list-disc list-inside">
                                    {ofertas1.map((oferta, index) => (
                                        <li key={index} className="my-2">
                                            <a href={`/formulario/${index}`} className="text-cyan-500 hover:underline">
                                                {oferta}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex flex-col mx-4 mb-6"> {/* Agregado mb-6 */}
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
                            <div className="rounded p-4 bg-white list-container"> {/* Eliminada clase "border" */}
                                <ul className="list-disc list-inside">
                                    {ofertas2.map((oferta, index) => (
                                        <li key={index} className="my-2">
                                            <a href={`/formulario/${index}`} className="text-cyan-500 hover:underline">
                                                {oferta}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex flex-col mx-4 mb-6"> {/* Agregado mb-6 */}
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
                            <div className="rounded p-4 bg-white list-container"> {/* Eliminada clase "border" */}
                                <ul className="list-disc list-inside">
                                    {ofertas3.map((oferta, index) => (
                                        <li key={index} className="my-2">
                                            <a href={`/formulario/${index}`} className="text-cyan-500 hover:underline">
                                                {oferta}
                                            </a>
                                        </li>
                                    ))}
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
