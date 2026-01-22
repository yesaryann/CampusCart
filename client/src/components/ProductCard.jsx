import { Link } from 'react-router-dom';
import { MessageCircle, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group">
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                    src={product.images && product.images.length > 0 ? product.images[0] : "https://placehold.co/400x400?text=No+Image"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full cursor-pointer hover:text-red-500 transition-colors">
                    <Heart size={18} />
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.title}</h3>
                    <span className="text-primary font-bold">₹{product.price}</span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <img
                            src={product.seller.avatar || "https://ui-avatars.com/api/?name=" + product.seller.username}
                            alt={product.seller.username}
                            className="w-6 h-6 rounded-full"
                        />
                        <span>{product.seller.collegeContext?.hostel || "Campus"}</span>
                    </div>
                    <Link to={`/product/${product._id}`} className="p-2 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors">
                        <MessageCircle size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
