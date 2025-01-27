"use client";

import { useState } from "react";

interface SearchInputProps {
  initialValue?: string;
  onSearch: (query: string) => void; // Callback for search
}

const SearchInput = ({ initialValue = "", onSearch }: SearchInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setValue(query);
    onSearch(query); // Trigger the onSearch callback
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        className="border border-gray-300 rounded-lg p-2 flex-grow"
        placeholder="Search books by title..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
