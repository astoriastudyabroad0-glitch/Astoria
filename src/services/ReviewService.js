import { supabase } from '../lib/supabaseClient';

export const ReviewService = {
    // Get all reviews for admin dashboard (pending/approved)
    async getAllFromAdmin() {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    // Get only approved reviews for the home page
    async getApproved() {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    // Save a new student review (defaults to 'pending')
    async save(reviewData) {
        const { data, error } = await supabase
            .from('reviews')
            .insert([{ ...reviewData, status: 'pending' }]);
        if (error) throw error;
        return data;
    },

    // Admin action: Approve a review
    async approve(id) {
        const { data, error } = await supabase
            .from('reviews')
            .update({ status: 'approved' })
            .eq('id', id);
        if (error) throw error;
        return data;
    },

    // Admin action: Delete a review
    async delete(id) {
        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }
};
