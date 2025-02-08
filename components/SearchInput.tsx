"use client";

import { useEffect, useState } from "react";

interface SearchInputProps {
  initialValue: string;
  onSearch: (query: string) => void;
}

const SearchInput = ({ initialValue, onSearch }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue, onSearch]);

  return (
    <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search books..."
      className="w-full p-3 rounded-lg bg-gray-800 text-white"
    />
  );
};

export default SearchInput;