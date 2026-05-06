import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { filterProjects, sortShowcase } from '@/lib/filter';

/**
 * Manages category + debounced search query for a project list.
 *
 * @param {Array} allProjects
 */
export function useProjectFilter(allProjects) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 200);

  const filtered = useMemo(
    () => sortShowcase(filterProjects(allProjects, { category, query: debouncedQuery })),
    [allProjects, category, debouncedQuery],
  );

  const reset = () => {
    setCategory('all');
    setQuery('');
  };

  return { filtered, category, query, setCategory, setQuery, reset };
}
