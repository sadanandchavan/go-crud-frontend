import React, { useEffect, useState } from 'react';
import API from '../api';
import '../App.css'; // ✅ should already be present in default template


import { Link } from 'react-router-dom';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        API.get('/properties')
            .then(res => setProperties(res.data))
            .catch(err => console.error(err));
    }, []);

    const deleteProperty = (id) => {
        API.delete(`/properties/${id}`)
            .then(() => setProperties(properties.filter(p => p.ID !== id)));
    };
    const [filters, setFilters] = useState({ location: '', maxPrice: '' });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredProperties = properties.filter(p =>
        (!filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.maxPrice || p.price <= parseFloat(filters.maxPrice))
    );




    return (

        <div>
            <h2>All Properties</h2>
            <Link to="/add" className="add-new-button">Add New</Link>

            <div className="filters">
                <input
                    type="text"
                    name="location"
                    placeholder="Filter by location"
                    value={filters.location}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                />
            </div>
            <ul className="property-list">
                {filteredProperties.map(p => (
                    <li key={p.ID}>
                        <img
                            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
                            alt="Property"
                            className="property-image"
                        />
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        <p><strong>Price:</strong> ₹{p.price.toLocaleString()}</p>
                        <p><strong>Location:</strong> {p.location}</p>
                        <div className="card-actions">
                            <Link to={`/edit/${p.ID}`}>Edit</Link>
                            <button onClick={() => deleteProperty(p.ID)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );

};

export default PropertyList;
