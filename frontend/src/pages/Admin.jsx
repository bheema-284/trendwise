import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminArticleForm = () => {
    const [mode, setMode] = useState('manual'); // 'manual' or 'generate'
    const [form, setForm] = useState({ title: '', slug: '' });
    const [prompt, setPrompt] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const BASE_URL = 'http://localhost:10000';

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const token = localStorage.getItem('auth_token');

            if (mode === 'manual') {
                const res = await axios.post(`${BASE_URL}/api/articles`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage('✅ Article created manually!');
                setForm({ title: '', slug: '' });
            } else {
                const res = await axios.post(`${BASE_URL}/api/generates`, { prompt }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage('✅ Article generated!');
                setPrompt('');
            }
            navigate("/articles")
        } catch (err) {
            console.error(err);
            setMessage('❌ Failed to submit. Check permissions or input.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow dark:bg-gray-900 dark:text-white">
            <h2 className="text-2xl font-bold mb-4">Create or Generate Article</h2>

            {/* Mode Toggle */}
            <div className="flex items-center mb-4 gap-4">
                <label className="flex items-center gap-1">
                    <input
                        type="radio"
                        name="mode"
                        value="manual"
                        checked={mode === 'manual'}
                        onChange={() => setMode('manual')}
                    />
                    <span>Manual</span>
                </label>
                <label className="flex items-center gap-1">
                    <input
                        type="radio"
                        name="mode"
                        value="generate"
                        checked={mode === 'generate'}
                        onChange={() => setMode('generate')}
                    />
                    <span>Generate</span>
                </label>
            </div>

            {message && <p className="mb-4 text-sm text-center">{message}</p>}

            <form onSubmit={handleSubmit}>
                {mode === 'manual' ? (
                    <>
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
                            <label className="block text-sm font-semibold mb-1">Slug</label>
                            <textarea
                                name="slug"
                                value={form.slug}
                                onChange={handleChange}
                                required
                                rows="10"
                                className="w-full p-2 border rounded dark:bg-gray-800"
                            />
                        </div>
                    </>
                ) : (
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Prompt to Generate Article</label>
                        <textarea
                            name="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            required
                            rows="6"
                            placeholder="e.g. Write an article about the future of AI in healthcare"
                            className="w-full p-2 border rounded dark:bg-gray-800"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    {loading ? 'Submitting...' : mode === 'manual' ? 'Post Article' : 'Generate Article'}
                </button>
            </form>
        </div>
    );
};

export default AdminArticleForm;
