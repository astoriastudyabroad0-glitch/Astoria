import { supabase } from '../lib/supabaseClient';

export const SettingsService = {
    // Get all settings (from the single row with id=1)
    async getSettings() {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('id', 1)
            .single();
        if (error) throw error;
        return data;
    },

    // Update settings (always for id=1)
    async updateSettings(settingsData) {
        const { data, error } = await supabase
            .from('site_settings')
            .update(settingsData)
            .eq('id', 1)
            .select()
            .single();
        if (error) throw error;
        return data;
    }
};
