import React from 'react';
import './styles.css';

const ContactPage = () => {
    return (
        <div className='contact-page bg-black min-h-screen text-white' style={{ 
            width: '100%', 
            height: '100%', 
            position: 'fixed',
            top: 0,
            left: 0,
            overflow: 'auto'
        }}>
            <div className="contact-container max-w-7xl mx-auto px-4 py-20">
                {/* Header Section */}
                <div className="header-section mb-20">
                    
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                        Let's create something extraordinary together. Reach out to us for collaborations, inquiries, or just to say hello.
                    </p>
                </div>

                {/* Main Content */}
                <div className="content-grid grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="form-section">
                        <form className="space-y-6">
                            <div className="form-group">
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea 
                                    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors h-32"
                                    placeholder="Your message"
                                ></textarea>
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-white text-black py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="info-section space-y-12">
                        <div className="contact-info">
                            <h2 className="text-2xl md:text-3xl font-['dirty'] mb-6">Get in Touch</h2>
                            <div className="space-y-4">
                                <p className="flex items-center space-x-3">
                                    <span className="text-gray-400">Email:</span>
                                    <a href="mailto:roshni@rgbdesign.in" className="text-white hover:text-gray-300 transition-colors">
                                        roshni@rgbdesign.in
                                    </a>
                                </p>
                                <p className="flex items-center space-x-3">
                                    <span className="text-gray-400">Phone:</span>
                                    <a href="tel:+1234567890" className="text-white hover:text-gray-300 transition-colors">
                                        +1 (234) 567-890
                                    </a>
                                </p>
                                <p className="flex items-center space-x-3">
                                    <span className="text-gray-400">Location:</span>
                                    <span className="text-white">New York, NY</span>
                                </p>
                            </div>
                        </div>

                        <div className="social-links">
                            <h2 className="text-2xl md:text-3xl font-['dirty'] mb-6">Follow Us</h2>
                            <div className="flex space-x-8">
                                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                    <i className="fab fa-instagram text-3xl"></i>
                                </a>
                                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                    <i className="fab fa-twitter text-3xl"></i>
                                </a>
                                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                    <i className="fab fa-linkedin text-3xl"></i>
                                </a>
                            </div>
                        </div>

                        <div className="availability">
                            <h2 className="text-2xl md:text-3xl font-['dirty'] mb-6">Availability</h2>
                            <p className="text-gray-400">
                                We're currently accepting new projects for Q2 2024. 
                                Let's discuss your ideas and create something amazing together.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
