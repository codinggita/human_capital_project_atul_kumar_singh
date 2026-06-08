import { useState, useEffect } from 'react';
export function useFetch(fetchFn) { const [data, setData] = useState(null); useEffect(() => { fetchFn().then(setData); }, []); return { data }; }