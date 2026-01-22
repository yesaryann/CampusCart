import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { Upload } from 'lucide-react';

const PostAd = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Books',
        condition: 'Used',
        imageUrl: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // In a real app, we would upload the image file here.
            // For now, we take a URL or use a placeholder if empty.
            const productData = {
                ...formData,
                images: formData.imageUrl ? [formData.imageUrl] : []
            };

            await api.post('/products', productData);
            navigate('/marketplace');
        } catch (err) {
            console.error(err);
            alert('Failed to post ad');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="pt-24 text-center">Please login to post an ad.</div>;
    }

    return (
        <div className="pt-24 pb-12 min-h-screen flex justify-center px-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Sell an Item</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            required
                            className="auth-input"
                            placeholder="e.g. Engineering Mathematics by H.K. Dass"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input
                                type="number"
                                required
                                className="auth-input"
                                placeholder="500"
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                className="auth-input"
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Books</option>
                                <option>Electronics</option>
                                <option>Stationary</option>
                                <option>Clothing</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Condition</label>
                        <div className="mt-2 flex gap-4">
                            {['New', 'Like New', 'Used', 'Damaged'].map(cond => (
                                <label key={cond} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="condition"
                                        value={cond}
                                        checked={formData.condition === cond}
                                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                        className="text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-600">{cond}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            required
                            rows="4"
                            className="auth-input"
                            placeholder="Describe the item condition, reason for selling..."
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                className="auth-input"
                                placeholder="https://example.com/image.jpg"
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Paste a direct image link. (Upload feature coming soon)</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md flex justify-center items-center gap-2"
                    >
                        {loading ? 'Posting...' : <><Upload size={20} /> Post Ad</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostAd;
