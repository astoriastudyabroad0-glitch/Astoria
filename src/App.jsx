import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Countries from './pages/Countries';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/countries" element={<Countries />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Public Blog Routes */}
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:id" element={<BlogDetail />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
