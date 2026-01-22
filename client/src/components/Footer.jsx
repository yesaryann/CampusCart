import { Github, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-12 pb-8 mt-auto text-slate-300">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                            CollegeMart
                        </h2>
                        <p className="text-slate-400 text-sm max-w-xs">
                            The seamless marketplace for your campus needs. Buy, sell, and connect instantly.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/yesaryann"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-slate-800 text-slate-400 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow-indigo-500/20"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/raj-aryan20/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-slate-800 text-slate-400 rounded-full hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm hover:shadow-blue-500/20"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 my-8"></div>

                {/* Credits */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; 2025 CollegeMart. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> by
                        <a
                            href="https://www.linkedin.com/in/raj-aryan20/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-slate-200 hover:text-indigo-400 transition-colors"
                        >
                            Raj Aryan
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
