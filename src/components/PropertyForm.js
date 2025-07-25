import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const PropertyForm = () => {
    const [property, setProperty] = useState({ title: '', description: '', price: '', location: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            API.get(`/properties/${id}`).then(res => setProperty(res.data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty({
            ...property,
            [name]: name === 'price' ? parseFloat(value) : value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...property,
            price: parseFloat(property.price) // ✅ force numeric
        };

        if (id) {
            API.put(`/properties/${id}`, payload).then(() => navigate('/'));
        } else {
            API.post('/properties', payload).then(() => navigate('/'));
        }
    };


    return (
        <div className="property-form">
            <h3>{id ? 'Edit Property' : 'Add New Property'}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={property.title}
                    onChange={handleChange}
                    required
                />
                <input
                    name="description"
                    placeholder="Description"
                    value={property.description}
                    onChange={handleChange}
                    required
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={property.price}
                    onChange={handleChange}
                    required
                />
                <input
                    name="location"
                    placeholder="Location"
                    value={property.location}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{id ? 'Update Property' : 'Add Property'}</button>
            </form>
        </div>

    );
};

export default PropertyForm;
