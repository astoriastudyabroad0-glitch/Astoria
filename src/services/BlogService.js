import { supabase } from '../lib/supabaseClient';

export const BlogService = {
    // Get all posts, ordered by date (newest first)
    getAll: async () => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .order('date', { ascending: false });

            if (error) {
                console.error('Error fetching blog posts:', error.message);
                return [];
            }
            return data;
        } catch (err) {
            console.error('Unexpected error fetching blog posts:', err);
            return [];
        }
    },

    // Get single post by Slug
    getBySlug: async (slug) => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                console.error(`Error fetching blog post ${slug}:`, error.message);
                return null;
            }
            return data;
        } catch (err) {
            console.error(`Unexpected error fetching blog post ${slug}:`, err);
            return null;
        }
    },

    // Create new post
    create: async (post) => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .insert([
                    {
                        ...post,
                        date: post.date || new Date().toISOString().split('T')[0],
                        published_at: post.published_at || new Date().toISOString()
                    }
                ])
                .select();

            if (error) {
                console.error('Error creating blog post:', error.message);
                throw error;
            }
            return data[0];
        } catch (err) {
            console.error('Unexpected error creating blog post:', err);
            throw err;
        }
    },

    // Update existing post
    update: async (id, updatedData) => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .update(updatedData)
                .eq('id', id)
                .select();

            if (error) {
                console.error(`Error updating blog post ${id}:`, error.message);
                return null;
            }
            return data[0];
        } catch (err) {
            console.error(`Unexpected error updating blog post ${id}:`, err);
            return null;
        }
    },

    // Delete post
    delete: async (id) => {
        try {
            const { error } = await supabase
                .from('blogs')
                .delete()
                .eq('id', id);

            if (error) {
                console.error(`Error deleting blog post ${id}:`, error.message);
                return false;
            }
            return true;
        } catch (err) {
            console.error(`Unexpected error deleting blog post ${id}:`, err);
            return false;
        }
    },

    // Upload image to storage
    uploadImage: async (file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (error) {
                throw error;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (err) {
            console.error('Error uploading image:', err.message);
            throw err;
        }
    }
};
