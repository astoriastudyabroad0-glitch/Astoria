import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, Save, X, ArrowLeft, MessageSquare, Newspaper, CheckCircle, User, Phone, Mail, Globe, BookOpen, Star, ExternalLink, Upload, Loader2, Image as ImageIcon, Bold, Italic, Link as LinkIcon, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, Type, Eye, ChevronDown, ChevronRight, MapPin, Hash, Calendar as CalendarIcon, History } from 'lucide-react';
import { BlogService } from '../../services/BlogService';
import { MessageService } from '../../services/MessageService';
import { ReviewService } from '../../services/ReviewService';
import { SettingsService } from '../../services/SettingsService';
import { CountryService } from '../../services/CountryService';


import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/Button';
import WordEditor from '../../components/admin/WordEditor';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('blogs'); // 'blogs', 'messages', 'reviews', 'countries', 'settings'
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [countries, setCountries] = useState([]);
    const [settings, setSettings] = useState({
        phone: '',
        email: '',
        address: '',
        google_maps_url: '',
        instagram_username: '',
        instagram_url: '',
        office_hours: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingCountry, setIsEditingCountry] = useState(false);
    const [currentCountry, setCurrentCountry] = useState(null);


    const [currentPost, setCurrentPost] = useState(null);
    const [viewingMessage, setViewingMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialFormState = {
        title: '',
        subtitle: '',
        image: '',
        content: '',
        labels: '',
        slug: '',
        location: '',
        published_at: new Date().toISOString().split('T')[0]
    };
    const [formData, setFormData] = useState(initialFormState);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Initial Form State
    const countryInitialState = {
        name: '',
        flag: '',
        description: '',
        highlights: '',
        popular_items: '',
        average_tuition: '',
        order_index: 0
    };
    const [countryForm, setCountryForm] = useState(countryInitialState);
    const [activeSettingTab, setActiveSettingTab] = useState('labels'); // 'labels', 'permalink', 'location', 'published'
    const [slugModified, setSlugModified] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const publicUrl = await BlogService.uploadImage(file);
            setFormData({ ...formData, image: publicUrl });
        } catch (err) {
            console.error(err);
            alert('Failed to upload image. Please ensure the storage bucket "blog-images" exists in your Supabase project.');
        } finally {
            setUploadingImage(false);
        }
    };

    // Auto-generate slug from title
    useEffect(() => {
        if (!slugModified && formData.title) {
            const generatedSlug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [formData.title, slugModified]);



    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/admin');
            } else {
                setLoading(false);
                loadData();
            }
        };
        checkAuth();
    }, [navigate]);

    const loadData = async () => {
        const [blogData, messageData, reviewData, countryData, settingsData] = await Promise.all([
            BlogService.getAll(),
            MessageService.getAll(),
            ReviewService.getAllFromAdmin(),
            CountryService.getAll(),
            SettingsService.getSettings()
        ]);
        setPosts(blogData);
        setMessages(messageData);
        setReviews(reviewData);
        setCountries(countryData);
        setSettings(settingsData);
    };



    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin');
    };

    // Blog Actions
    const handleDeletePost = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            await BlogService.delete(id);
            loadData();
        }
    };

    const startEdit = (post) => {
        console.log("Editing post:", post);
        setCurrentPost(post);
        setFormData({
            title: post.title || '',
            subtitle: post.subtitle || '',
            image: post.image || '',
            content: post.content || '',
            slug: post.slug || '',
            published_at: post.date || post.published_at || new Date().toISOString().split('T')[0],
            labels: post.labels || ''
        });
        setIsEditing(true);
    };

    const startCreate = () => {
        setCurrentPost(null);
        setFormData(initialFormState);
        setIsEditing(true);
    };

    const handleSavePost = async (e) => {
        e.preventDefault();
        const dataToSave = { 
            title: formData.title,
            subtitle: formData.subtitle,
            image: formData.image,
            content: formData.content,
            slug: formData.slug,
            date: formData.published_at,
            labels: formData.labels
        };

        if (currentPost) {
            await BlogService.update(currentPost.id, dataToSave);
        } else {
            await BlogService.create(dataToSave);
        }
        setIsEditing(false);
        loadData();
    };

    // Message Actions
    const handleDeleteMessage = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            await MessageService.delete(id);
            setViewingMessage(null);
            loadData();
        }
    };

    const handleMarkAsRead = async (id) => {
        await MessageService.markAsRead(id);
        loadData();
    };

    const openMessage = async (message) => {
        setViewingMessage(message);
        if (!message.isRead) {
            await handleMarkAsRead(message.id);
        }
    };

    // Settings Actions
    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        await SettingsService.updateSettings(settings);
        alert('Settings updated successfully!');
        loadData();
    };

    // Country Actions
    const handleDeleteCountry = async (id) => {
        if (window.confirm('Are You sure you want to delete this study destination?')) {
            await CountryService.delete(id);
            loadData();
        }
    };

    const startEditCountry = (country) => {
        setCurrentCountry(country);
        setCountryForm({
            name: country.name,
            flag: country.flag,
            description: country.description,
            highlights: Array.isArray(country.highlights) ? country.highlights.join('\n') : '',
            popular_items: Array.isArray(country.popular_items) ? country.popular_items.join('\n') : '',
            average_tuition: country.average_tuition,
            order_index: country.order_index
        });
        setIsEditingCountry(true);
    };

    const startCreateCountry = () => {
        setCurrentCountry(null);
        setCountryForm(countryInitialState);
        setIsEditingCountry(true);
    };

    const handleSaveCountry = async (e) => {
        e.preventDefault();
        const formattedCountry = {
            ...countryForm,
            highlights: countryForm.highlights.split('\n').filter(h => h.trim() !== ''),
            popular_items: countryForm.popular_items.split('\n').filter(p => p.trim() !== '')
        };

        if (currentCountry) {
            await CountryService.update(currentCountry.id, formattedCountry);
        } else {
            await CountryService.create(formattedCountry);
        }
        setIsEditingCountry(false);
        loadData();
    };


    // Review Actions
    const handleApproveReview = async (id) => {
        await ReviewService.approve(id);
        loadData();
    };

    const handleDeleteReview = async (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            await ReviewService.delete(id);
            loadData();
        }
    };


    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-blue"></div>
        </div>;
    }

    // Render Logic
    if (isEditing && activeTab === 'blogs') {
        return (
            <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden font-sans">
                <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between z-50">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <Newspaper className="w-5 h-5 text-primary-red" />
                            <span className="text-gray-700 font-bold">
                                {currentPost ? 'Edit Post' : 'New Post'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={handleSavePost}
                            className="bg-primary-red hover:bg-primary-red-hover text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-red-500/20 transition-all flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {currentPost ? 'Update' : 'Publish'}
                        </button>
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto bg-gray-50 pb-20">
                    <div className="container-custom py-10 max-w-4xl">
                        {/* Main Settings Card */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8 mb-8">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Post Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    placeholder="Enter a catchy title..."
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full text-4xl font-bold text-secondary-blue outline-none border-b-2 border-gray-50 focus:border-primary-red transition-all pb-4 placeholder:text-gray-100"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Master Cover Image</label>
                                    <div className="flex flex-col space-y-4">
                                        <div className="relative aspect-video rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group">
                                            {formData.image ? (
                                                <img src={formData.image} alt="Cover" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-12 h-12 text-gray-200" />
                                            )}
                                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                                <div className="bg-white p-3 rounded-full shadow-xl">
                                                    <Upload className="w-6 h-6 text-primary-red" />
                                                </div>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Permalink (Slug)</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={formData.slug}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, slug: e.target.value });
                                                    setSlugModified(true);
                                                }}
                                                placeholder="url-friendly-slug"
                                                className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-red font-mono"
                                            />
                                            <div className="mt-2 text-[10px] text-blue-500 italic truncate">
                                                Final URL: /blogs/{formData.slug || 'your-slug'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Date</label>
                                            <input
                                                type="date"
                                                value={formData.published_at}
                                                onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                                                className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-red"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Meta Labels</label>
                                            <input
                                                type="text"
                                                value={formData.labels}
                                                onChange={(e) => setFormData({ ...formData, labels: e.target.value })}
                                                placeholder="e.g., Canada, Study Abroad"
                                                className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-red"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <WordEditor 
                            content={formData.content} 
                            onChange={(html) => setFormData({ ...formData, content: html })} 
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 bg-secondary-blue text-white lg:min-h-screen p-6 shadow-xl z-10">
                <div className="mb-10 text-center lg:text-left">
                    <h1 className="text-xl font-bold tracking-tight">Astoria Admin</h1>
                    <p className="text-xs text-blue-300 mt-1">Management Portal</p>
                </div>

                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'blogs' ? 'bg-white text-secondary-blue shadow-lg font-semibold' : 'hover:bg-blue-800 text-blue-100'}`}
                    >
                        <Newspaper className="w-5 h-5" />
                        <span>Blog Posts</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'messages' ? 'bg-white text-secondary-blue shadow-lg font-semibold' : 'hover:bg-blue-800 text-blue-100'}`}
                    >
                        <div className="relative">
                            <MessageSquare className="w-5 h-5" />
                            {messages.some(m => !m.isRead) && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </div>
                        <span>Messages</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'reviews' ? 'bg-white text-secondary-blue shadow-lg font-semibold' : 'hover:bg-blue-800 text-blue-100'}`}
                    >
                        <div className="relative">
                            <Star className="w-5 h-5" />
                            {reviews.some(r => r.status === 'pending') && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                            )}
                        </div>
                        <span>Reviews</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('countries')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'countries' ? 'bg-white text-secondary-blue shadow-lg font-semibold' : 'hover:bg-blue-800 text-blue-100'}`}
                    >
                        <Globe className="w-5 h-5" />
                        <span>Destinations</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-white text-secondary-blue shadow-lg font-semibold' : 'hover:bg-blue-800 text-blue-100'}`}
                    >
                        <Plus className="w-5 h-5 rotate-45" /> {/* Using Plus rotated as a settings-ish icon */}
                        <span>Settings</span>
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all hover:bg-blue-800 text-blue-100 mt-4 border-t border-blue-800/50 pt-6"
                    >
                        <ExternalLink className="w-5 h-5" />
                        <span>View Website</span>
                    </button>


                </nav>

                <div className="mt-auto pt-10 border-t border-blue-800 hidden lg:block">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-blue-200 hover:text-white hover:bg-red-500/20 transition-all hover:bg-opacity-100"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
                
                {/* Mobile Sign Out */}
                <button
                    onClick={handleLogout}
                    className="lg:hidden fixed top-6 right-6 p-2 bg-red-500 text-white rounded-lg shadow-lg"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 lg:p-10 overflow-x-hidden">
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {
                                activeTab === 'blogs' ? 'Blog Management' : 
                                activeTab === 'messages' ? 'Candidate Inquiries' : 
                                activeTab === 'reviews' ? 'Success Stories' :
                                activeTab === 'countries' ? 'Study Destinations' :
                                'Global Settings'
                            }
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {
                                activeTab === 'blogs' ? `Manage your educational updates and success stories (${posts.length} posts)` : 
                                activeTab === 'messages' ? `Review and respond to student messages (${messages.length} total)` :
                                activeTab === 'reviews' ? `Approve or manage student testimonials (${reviews.length} total)` :
                                activeTab === 'countries' ? `Manage available study abroad countries (${countries.length} total)` :
                                'Update site-wide contact information and office hours'
                            }
                        </p>
                    </div>

                    {activeTab === 'countries' && (
                        <Button onClick={startCreateCountry} variant="primary" className="shadow-lg">
                            <Plus className="w-5 h-5 mr-2" />
                            Add Country
                        </Button>
                    )}


                    {activeTab === 'blogs' && (
                        <Button onClick={startCreate} variant="primary" className="shadow-lg">
                            <Plus className="w-5 h-5 mr-2" />
                            New Blog Post
                        </Button>
                    )}
                </header>

                {activeTab === 'blogs' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Article Details</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{post.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-sm">{post.subtitle}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-[10px] font-bold uppercase tracking-tighter">
                                                    Live
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{post.date}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end space-x-1">
                                                    <button
                                                        onClick={() => startEdit(post)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePost(post.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {posts.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center">
                                                    <Newspaper className="w-12 h-12 text-gray-200 mb-4" />
                                                    <p className="text-gray-400 font-medium">No blog posts found</p>
                                                    <button onClick={startCreate} className="mt-2 text-sm text-blue-600 font-bold hover:underline">
                                                        Write your first post
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Message List */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-250px)]">
                            <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700 text-sm">Inbox</h3>
                                <div className="text-[10px] text-gray-400 font-bold uppercase">Click to Read</div>
                            </div>
                            <div className="overflow-y-auto h-full pb-20">
                                {messages.map((msg) => (
                                    <button
                                        key={msg.id}
                                        onClick={() => openMessage(msg)}
                                        className={`w-full text-left p-4 border-b border-gray-50 transition-all hover:bg-blue-50 flex items-start space-x-4 ${viewingMessage?.id === msg.id ? 'bg-blue-50/50 border-l-4 border-l-secondary-blue' : ''} ${!msg.isRead ? 'bg-white' : 'opacity-70'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!msg.isRead ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <div className="flex justify-between items-start">
                                                <span className={`text-sm truncate ${!msg.isRead ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                                                    {msg.name}
                                                </span>
                                                <span className="text-[10px] text-gray-400 whitespace-nowrap">{msg.date}</span>
                                            </div>
                                            <div className="text-xs text-blue-600 font-medium truncate mb-1">{msg.country}</div>
                                            <p className="text-xs text-gray-500 truncate">{msg.message}</p>
                                        </div>
                                        {!msg.isRead && (
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                                        )}
                                    </button>
                                ))}
                                {messages.length === 0 && (
                                    <div className="py-20 text-center text-gray-400">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No messages yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Message Preview */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-250px)]">
                            {viewingMessage ? (
                                <>
                                    <div className="p-6 border-b border-gray-50 flex justify-between items-start bg-gray-50/30">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-secondary-blue text-white rounded-2xl flex items-center justify-center shadow-lg">
                                                <span className="text-xl font-bold">{viewingMessage.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{viewingMessage.name}</h3>
                                                <p className="text-xs text-gray-500">Student Applicant</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteMessage(viewingMessage.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                            title="Delete Message"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="p-6 overflow-y-auto flex-grow space-y-8">
                                        {/* Contact Badges */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                <Phone className="w-4 h-4 text-blue-600" />
                                                <div className="overflow-hidden">
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Phone</p>
                                                    <p className="text-xs font-semibold text-gray-700 truncate">{viewingMessage.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                <Mail className="w-4 h-4 text-blue-600" />
                                                <div className="overflow-hidden">
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email</p>
                                                    <p className="text-xs font-semibold text-gray-700 truncate">{viewingMessage.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                <Globe className="w-4 h-4 text-primary-red" />
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Interest</p>
                                                    <p className="text-xs font-semibold text-gray-700">{viewingMessage.country}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                <BookOpen className="w-4 h-4 text-green-600" />
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">IELTS</p>
                                                    <p className="text-xs font-semibold text-gray-700">
                                                        {viewingMessage.ieltsTaken === 'yes' ? `Score: ${viewingMessage.ieltsScore}` : 'Not Taken'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3 flex items-center">
                                                <MessageSquare className="w-3 h-3 mr-2" />
                                                Message Content
                                            </h4>
                                            <div className="bg-blue-50/50 p-6 rounded-2xl text-gray-700 text-sm leading-relaxed border border-blue-100/50 italic">
                                                "{viewingMessage.message}"
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                                        <a
                                            href={`mailto:${viewingMessage.email}`}
                                            className="inline-flex items-center justify-center px-8 py-3 bg-secondary-blue text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-secondary-blue/40 transition-all hover:-translate-y-0.5"
                                        >
                                            <Mail className="w-4 h-4 mr-2" />
                                            Reply via Email
                                        </a>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10 text-center">
                                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100">
                                        <MessageSquare className="w-10 h-10 opacity-20" />
                                    </div>
                                    <h3 className="font-bold text-gray-700">Select a message</h3>
                                    <p className="text-sm max-w-xs mt-2">Pick an inquiry from the list on the left to view applicant details and response options.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4">Review</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {reviews.map((review) => (
                                        <tr key={review.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{review.name}</div>
                                                <div className="text-xs text-blue-600">{review.country}</div>
                                                <div className="flex mt-1 text-yellow-400">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star key={i} className="w-3 h-3 fill-current" />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 max-w-md line-clamp-2 italic">
                                                    "{review.text}"
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {review.status === 'pending' ? (
                                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-[10px] font-bold uppercase tracking-tighter animate-pulse">
                                                        Pending Approval
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-[10px] font-bold uppercase tracking-tighter">
                                                        Approved & Live
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    {review.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleApproveReview(review.id)}
                                                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteReview(review.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {reviews.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-20 text-center text-gray-400">
                                                <Star className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                                <p>No success stories found yet</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {activeTab === 'countries' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Country</th>
                                        <th className="px-6 py-4 text-center">Order</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {countries.map((country) => (
                                        <tr key={country.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-3xl">{country.flag}</span>
                                                    <div>
                                                        <div className="font-bold text-gray-900">{country.name}</div>
                                                        <div className="text-xs text-gray-500 truncate max-w-md">{country.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-500 font-mono text-sm">{country.order_index}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => startEditCountry(country)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCountry(country.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <form onSubmit={handleUpdateSettings} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="text"
                                        value={settings.phone}
                                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={settings.email}
                                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Office Address</label>
                                    <input
                                        type="text"
                                        value={settings.address}
                                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label>
                                    <input
                                        type="text"
                                        value={settings.google_maps_url}
                                        onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Username (@...)</label>
                                    <input
                                        type="text"
                                        value={settings.instagram_username}
                                        onChange={(e) => setSettings({ ...settings, instagram_username: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                                    <input
                                        type="text"
                                        value={settings.instagram_url}
                                        onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Office Hours</label>
                                    <input
                                        type="text"
                                        value={settings.office_hours}
                                        onChange={(e) => setSettings({ ...settings, office_hours: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                        placeholder="e.g., 10am to 8pm"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4 border-t border-gray-50">
                                <Button type="submit" variant="primary">
                                    <Save className="w-5 h-5 mr-2" />
                                    Save All Settings
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </main>

            {/* Country Edit Modal */}
            {isEditingCountry && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-secondary-blue">
                                    {currentCountry ? 'Edit Country' : 'Add New Destination'}
                                </h3>
                                <button onClick={() => setIsEditingCountry(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveCountry} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Country Name</label>
                                        <input
                                            type="text"
                                            value={countryForm.name}
                                            onChange={(e) => setCountryForm({ ...countryForm, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Flag Emoji</label>
                                        <input
                                            type="text"
                                            value={countryForm.flag}
                                            onChange={(e) => setCountryForm({ ...countryForm, flag: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue font-emoji text-2xl"
                                            placeholder="🇨🇦"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                                    <textarea
                                        value={countryForm.description}
                                        onChange={(e) => setCountryForm({ ...countryForm, description: e.target.value })}
                                        rows="2"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                        required
                                    ></textarea>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Why Choose This Country? (one per line)</label>
                                        <textarea
                                            value={countryForm.highlights}
                                            onChange={(e) => setCountryForm({ ...countryForm, highlights: e.target.value })}
                                            rows="5"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue text-sm"
                                            placeholder="Post-graduation work permit...\nPathway to PR..."
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Popular Items/Universities (one per line)</label>
                                        <textarea
                                            value={countryForm.popular_items}
                                            onChange={(e) => setCountryForm({ ...countryForm, popular_items: e.target.value })}
                                            rows="5"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue text-sm"
                                            placeholder="University of Toronto\nMcGill University"
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Average Tuition</label>
                                        <input
                                            type="text"
                                            value={countryForm.average_tuition}
                                            onChange={(e) => setCountryForm({ ...countryForm, average_tuition: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                            placeholder="e.g., $15,000 - $35,000 CAD/year"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                                        <input
                                            type="number"
                                            value={countryForm.order_index}
                                            onChange={(e) => setCountryForm({ ...countryForm, order_index: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                                    <Button type="button" variant="outline" onClick={() => setIsEditingCountry(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary">
                                        <Save className="w-5 h-5 mr-2" />
                                        Save Destination
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Dashboard;
