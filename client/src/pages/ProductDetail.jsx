import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { MessageCircle, MapPin, User, Clock, ShieldCheck } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChat = async () => {
        if (!user) return navigate('/login');
        if (user._id === product.seller._id) return alert("You can't chat with yourself!");

        try {
            await api.post('/chat', { userId: product.seller._id, productId: product._id });
            navigate('/chat');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="pt-24 text-center">Loading...</div>;
    if (!product) return <div className="pt-24 text-center">Product not found.</div>;

    return (
        <div className="pt-24 pb-12 min-h-screen bg-white">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 aspect-square">
                        <img
                            src={product.images.length > 0 ? product.images[0] : "https://placehold.co/600x600?text=No+Image"}
                            alt={product.title}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Details Section */}
                    <div>
                        <div className="mb-6">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                {product.category}
                            </span>
                            <span className="ml-3 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                                {product.condition}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
                        <p className="text-3xl text-primary font-bold mb-6">₹{product.price}</p>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{product.description}</p>
                        </div>

                        {/* Seller Info */}
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl mb-8">
                            <div className="flex items-center gap-4">
                                <img
                                    src={product.seller.avatar || "https://ui-avatars.com/api/?name=" + product.seller.username}
                                    alt="Seller"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">{product.seller.username}</p>
                                    <div className="flex items-center text-sm text-gray-500 gap-1">
                                        <MapPin size={14} />
                                        {product.seller.collegeContext?.hostel || "Campus Student"}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right text-sm text-gray-500">
                                <div className="flex items-center gap-1"><Clock size={14} /> Posted {new Date(product.createdAt).toLocaleDateString()}</div>
                                <div className="flex items-center gap-1 text-green-600"><ShieldCheck size={14} /> Verified Student</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={handleChat}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        >
                            <MessageCircle /> Chat with Seller
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
