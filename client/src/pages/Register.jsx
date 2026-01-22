import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', fullName: '', hostel: '', department: ''
    });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({
                ...formData,
                collegeContext: { hostel: formData.hostel, department: formData.department }
            });
            navigate('/');
        } catch (err) {
            console.error("Registration Error:", err);
            setError(err.response?.data?.message || 'Server Error. Check console logs.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-24 px-4 pb-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
                    <p className="text-center text-gray-500 mb-8">Join your college marketplace today</p>
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input type="text" required className="auth-input" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" required className="auth-input" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" required className="auth-input" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" required className="auth-input" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hostel</label>
                                <input type="text" className="auth-input" onChange={(e) => setFormData({ ...formData, hostel: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <input type="text" className="auth-input" onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md mt-4">
                            Sign Up
                        </button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
