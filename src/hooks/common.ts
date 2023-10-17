import { useEffect, useState } from "react";

interface IDebounceProps {
  searchQuery: string;
  delay: number;
}

export const useDebounce = ({ searchQuery, delay }: IDebounceProps) => {
  const [debounceQuery, setDebounceQuery] = useState<string>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchQuery, delay]);

  return debounceQuery;
};
