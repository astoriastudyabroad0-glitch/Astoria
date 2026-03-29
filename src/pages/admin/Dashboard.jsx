import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, Save, X, ArrowLeft, MessageSquare, Newspaper, CheckCircle, User, Phone, Mail, Globe, BookOpen } from 'lucide-react';
import { BlogService } from '../../services/BlogService';
import { MessageService } from '../../services/MessageService';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/Button';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' or 'messages'
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [viewingMessage, setViewingMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial Form State
    const initialFormState = {
        title: '',
        subtitle: '',
        image: '',
        content: ''
    };
    const [formData, setFormData] = useState(initialFormState);

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
        const [blogData, messageData] = await Promise.all([
            BlogService.getAll(),
            MessageService.getAll()
        ]);
        setPosts(blogData);
        setMessages(messageData);
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
        setCurrentPost(post);
        setFormData({
            title: post.title,
            subtitle: post.subtitle,
            image: post.image,
            content: post.content
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
        if (currentPost) {
            await BlogService.update(currentPost.id, formData);
        } else {
            await BlogService.create(formData);
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

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-blue"></div>
        </div>;
    }

    // Render Logic
    if (isEditing) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center text-gray-500 hover:text-secondary-blue"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Dashboard
                        </button>
                        <h2 className="text-2xl font-bold text-secondary-blue">
                            {currentPost ? 'Edit Post' : 'Create New Post'}
                        </h2>
                    </div>

                    <form onSubmit={handleSavePost} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (Short Description)</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue"
                                placeholder="e.g., /assets/study-malta.png or https://..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Use specific image paths or external URLs.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content (Markdown Supported)</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows="12"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-blue font-mono text-sm"
                                placeholder="# Heading\n\nWrite your content here..."
                                required
                            ></textarea>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                <Save className="w-5 h-5 mr-2" />
                                Save Post
                            </Button>
                        </div>
                    </form>
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
                            {activeTab === 'blogs' ? 'Blog Management' : 'Candidate Inquiries'}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {activeTab === 'blogs'
                                ? `Manage your educational updates and success stories (${posts.length} posts)`
                                : `Review and respond to student messages (${messages.length} total)`}
                        </p>
                    </div>

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
            </main>
        </div>
    );
};

export default Dashboard;
