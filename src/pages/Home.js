import React from 'react';

const Home = () => {
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
        'Oferta 3.5', 'Oferta 3.6', 'Oferta 3.7', 'Oferta 3.8',
        'Oferta 3.9', 'Oferta 3.10'
    ];

    return (
        <div className="container mx-auto py-4">
            <div className="flex justify-center">
                {/* Contenedor 1 */}
                <div className="w-1/3 flex flex-col mx-4 bg-white p-4 rounded">
                    <div className="mb-2 title-container text-orange-500">
                        <h2 className="text-lg font-bold text-center">Ingeniería Informática</h2>
                    </div>
                    <div className="overflow-y-auto flex-1 border rounded p-4 max-h-50 bg-white">
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

                {/* Contenedor 2 */}
                <div className="w-1/3 flex flex-col mx-4 bg-white p-4 rounded">
                    <div className="mb-2 title-container text-orange-500">
                        <h2 className="text-lg font-bold text-center">Ingeniería Civil Informática</h2>
                    </div>
                    <div className="overflow-y-auto flex-1 border rounded p-4 max-h-50 bg-white">
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

                {/* Contenedor 3 */}
                <div className="w-1/3 flex flex-col mx-4 bg-white p-4 rounded">
                    <div className="mb-2 title-container text-orange-500">
                        <h2 className="text-lg font-bold text-center">Ingeniería Civil en Ciencia de Datos</h2>
                    </div>
                    <div className="overflow-y-auto flex-1 border rounded p-4 max-h-50 bg-white">
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
    );
};

export default Home;
