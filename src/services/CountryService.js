import { supabase } from '../lib/supabaseClient';

export const CountryService = {
    // Get all countries (for display)
    async getAll() {
        const { data, error } = await supabase
            .from('countries')
            .select('*')
            .order('order_index', { ascending: true });
        if (error) throw error;
        return data;
    },

    // Admin action: Create a new country
    async create(countryData) {
        const { data, error } = await supabase
            .from('countries')
            .insert([countryData])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Admin action: Update a country
    async update(id, countryData) {
        const { data, error } = await supabase
            .from('countries')
            .update(countryData)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Admin action: Delete a country
    async delete(id) {
        const { error } = await supabase
            .from('countries')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }
};
