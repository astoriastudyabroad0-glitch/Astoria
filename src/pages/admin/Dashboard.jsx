import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, Save, X, ArrowLeft } from 'lucide-react';
import { BlogService } from '../../services/BlogService';
import Button from '../../components/Button';

const Dashboard = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    // Initial Form State
    const initialFormState = {
        title: '',
        subtitle: '',
        image: '',
        content: ''
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        // Check Auth
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }
        loadPosts();
    }, [navigate]);

    const loadPosts = () => {
        setPosts(BlogService.getAll());
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            BlogService.delete(id);
            loadPosts();
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

    const handleSave = (e) => {
        e.preventDefault();
        if (currentPost) {
            // Update
            BlogService.update(currentPost.id, formData);
        } else {
            // Create
            BlogService.create(formData);
        }
        setIsEditing(false);
        loadPosts();
    };

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

                    <form onSubmit={handleSave} className="space-y-6">
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
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-secondary-blue">Admin Dashboard</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Local Mode</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                </button>
            </nav>

            <div className="container-custom py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-gray-700">All Posts ({posts.length})</h2>
                    <Button onClick={startCreate} variant="primary">
                        <Plus className="w-5 h-5 mr-2" />
                        New Post
                    </Button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{post.title}</div>
                                        <div className="text-sm text-gray-500 truncate max-w-sm">{post.subtitle}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{post.date}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => startEdit(post)}
                                            className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                        No posts yet. Create your first one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
