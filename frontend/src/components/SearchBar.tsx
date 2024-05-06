import { useState, useEffect } from 'react';
import searchIcon from '../assets/searchIcon.svg';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;  // Ensure it can receive an initialValue
}

const SearchBar = ({ onSearch, initialValue = '' }: SearchBarProps) => {
  const [input, setInput] = useState(initialValue);

  useEffect(() => {
    setInput(initialValue);  // Update the input field whenever the initialValue changes
  }, [initialValue]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(input);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.toUpperCase());  // Example if you want to transform the input
  };

  return (
    <div className="searchContainer">
      <img src={searchIcon} alt="Search Icon" className="searchIcon" />
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a class number here (ex. CS4820)"
        className="searchInput"
      />
    </div>
  );
};

export default SearchBar;
