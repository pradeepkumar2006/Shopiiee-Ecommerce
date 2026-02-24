
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase = null;

const isValidUrl = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

if (supabaseUrl && isValidUrl(supabaseUrl) && supabaseKey && supabaseKey !== 'your_supabase_anon_key_here') {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
        console.log('✅ Connected to Supabase');
    } catch (error) {
        console.error('❌ Failed to initialize Supabase:', error.message);
    }
} else {
    console.warn('⚠️  Supabase Credentials missing or invalid in .env. Using in-memory fallback.');
}

module.exports = supabase;
