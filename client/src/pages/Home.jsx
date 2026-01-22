import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Monitor, Cpu } from 'lucide-react';

const Home = () => {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50 z-0" />
                <div className="max-w-screen-xl mx-auto px-4 py-24 lg:py-32 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
                        >
                            The Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Marketplace</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray-600 mb-10"
                        >
                            Buy and sell books, electronics, and essentials within your college community. Safe, simple, and student-focused.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex justify-center gap-4"
                        >
                            <Link to="/marketplace" className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-2">
                                Browse Items <ArrowRight size={20} />
                            </Link>
                            <Link to="/post-ad" className="px-8 py-3 bg-white text-primary border border-primary/20 rounded-full font-semibold shadow-sm hover:bg-gray-50 transition-all">
                                Sell Something
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Books & Notes', icon: <Book className="w-8 h-8 text-primary" />, desc: 'Find course materials and notes from seniors.' },
                            { title: 'Electronics', icon: <Monitor className="w-8 h-8 text-secondary" />, desc: 'Laptops, calculators, and gadgets.' },
                            { title: 'Engineering Tools', icon: <Cpu className="w-8 h-8 text-accent" />, desc: 'Drafters, lab coats, and project components.' },
                        ].map((cat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center"
                            >
                                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                                <p className="text-gray-500">{cat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
