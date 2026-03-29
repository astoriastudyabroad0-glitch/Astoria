import { supabase } from '../lib/supabaseClient';

export const MessageService = {
    // Get all messages, ordered by creation date (newest first)
    getAll: async () => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching messages:', error.message);
                return [];
            }
            
            // Map created_at to date for UI consistency
            return data.map(msg => ({
                ...msg,
                date: msg.created_at ? new Date(msg.created_at).toISOString().split('T')[0] : 'N/A'
            }));
        } catch (err) {
            console.error('Unexpected error fetching messages:', err);
            return [];
        }
    },

    // Save a new message
    save: async (message) => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .insert([
                    {
                        ...message,
                        isRead: false
                    }
                ])
                .select();

            if (error) {
                console.error('Error saving message:', error.message);
                throw error;
            }
            return data[0];
        } catch (err) {
            console.error('Unexpected error saving message:', err);
            throw err;
        }
    },

    // Delete a message
    delete: async (id) => {
        try {
            const { error } = await supabase
                .from('messages')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting message:', error.message);
                return false;
            }
            return true;
        } catch (err) {
            console.error('Unexpected error deleting message:', err);
            return false;
        }
    },

    // Mark as read
    markAsRead: async (id) => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .update({ isRead: true })
                .eq('id', id)
                .select();

            if (error) {
                console.error('Error marking message as read:', error.message);
                return null;
            }
            return data[0];
        } catch (err) {
            console.error('Unexpected error marking message as read:', err);
            return null;
        }
    }
};
