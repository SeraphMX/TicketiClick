// hooks/useCategories.ts
// Hook para manejar las categorías de eventos

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { EventCategory } from '@/lib/types';

export const useCategories = () => {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('event_categories')
          .select('*')
          .order('name');

        if (supabaseError) {
          throw supabaseError;
        }

        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error al cargar las categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    getCategoryBySlug: (slug: string) => categories.find(cat => cat.slug === slug)
  };
};