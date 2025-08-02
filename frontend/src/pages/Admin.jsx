import React, { useState } from 'react';
import axios from 'axios';

const AdminArticleForm = () => {
    const [form, setForm] = useState({
        title: '',
        content: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const BASE_URL = 'https://trendwise-p440.onrender.com';

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token'); // token must be set on login

            const res = await axios.post(`${BASE_URL}/api/generates`, form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage('✅ Article created successfully!');
            setForm({ title: '', content: '' });
        } catch (err) {
            console.error(err);
            setMessage('❌ Failed to create article. Make sure you are admin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow dark:bg-gray-900 dark:text-white">
            <h2 className="text-2xl font-bold mb-4">Create New Article</h2>

            {message && <p className="mb-4 text-sm text-center">{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded dark:bg-gray-800"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Content (HTML supported)</label>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        required
                        rows="10"
                        className="w-full p-2 border rounded dark:bg-gray-800"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    {loading ? 'Posting...' : 'Post Article'}
                </button>
            </form>
        </div>
    );
};

export default AdminArticleForm;
