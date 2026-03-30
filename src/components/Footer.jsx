import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { SettingsService } from '../services/SettingsService';
import logo from '../assets/logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await SettingsService.getSettings();
                setSettings(data);
            } catch (err) {
                console.error('Error fetching footer settings:', err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="bg-secondary-blue text-white">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <img
                                src={logo}
                                alt="Astoria Study Abroad Logo"
                                className="h-10 w-auto object-contain"
                            />
                            <div className="flex flex-col">
                                <span className="font-montserrat font-bold text-xl leading-none">
                                    Astoria
                                </span>
                                <span className="text-xs text-gray-300">Study Abroad</span>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm">
                            Your trusted partner for international education. We help students achieve their dreams of studying abroad.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-montserrat font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-primary-red transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-primary-red transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-300 hover:text-primary-red transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/countries" className="text-gray-300 hover:text-primary-red transition-colors">
                                    Countries
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-primary-red transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Study Destinations */}
                    <div>
                        <h3 className="font-montserrat font-semibold text-lg mb-4">Study Destinations</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>Canada</li>
                            <li>Australia</li>
                            <li>United Kingdom</li>
                            <li>United States</li>
                            <li>Europe</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-montserrat font-semibold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-2">
                                <Phone className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                                <a href={`tel:${settings?.phone?.replace(/-/g, '') || ''}`} className="text-gray-300 hover:text-primary-red transition-colors">
                                    {settings?.phone || 'Loading...'}
                                </a>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                                <a
                                    href={settings?.google_maps_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-primary-red transition-colors text-sm"
                                >
                                    {settings?.address || 'Loading...'}
                                </a>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Clock className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">
                                    Open hours: {settings?.office_hours || 'Loading...'}
                                </span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Instagram className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                                <a
                                    href={settings?.instagram_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-primary-red transition-colors"
                                >
                                    {settings?.instagram_username || 'Loading...'}
                                </a>
                            </li>
                        </ul>

                        {/* Social Links */}
                        <div className="flex space-x-4 mt-6">
                            <a
                                href={settings?.instagram_url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center hover:bg-primary-red transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center hover:bg-primary-red transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href={`mailto:${settings?.email || ''}`}
                                className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center hover:bg-primary-red transition-colors"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 text-sm">
                    <p>&copy; {currentYear} Astoria Study Abroad. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

