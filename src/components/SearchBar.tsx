import React, { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, 300),
    [onSearch]
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };
  return (
    <div className="flex space-x-2 mb-4">
      <Input
        type="text"
        placeholder="Search by name and surname"
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};
export default SearchBar;
