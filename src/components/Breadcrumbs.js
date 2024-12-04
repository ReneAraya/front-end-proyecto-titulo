import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ paths = [] }) => {
  return (
    <nav className="breadcrumb mb-4">
      {paths.map((path, index) => (
        <span key={index}>
          {path.path ? (
            <>
              <Link to={path.path} className="text-blue-500 hover:underline">{path.name}</Link>
              <span className="mx-2">{'>'}</span>
            </>
          ) : (
            <span className="text-gray-500">{path.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
