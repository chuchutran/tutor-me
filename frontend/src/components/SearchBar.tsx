import { useState, KeyboardEvent, ChangeEvent } from 'react';
import searchIcon from '../assets/searchIcon.svg';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  // Updates the `query` state whenever the input changes
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Triggers a search when the search button is clicked or Enter key is pressed
  const handleSearchSubmit = () => {
    onSearch(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="searchContainer">
      <img
        src={searchIcon}
        alt="Search Icon"
        className="searchIcon"
      />
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder='Enter a class number here (ex. CS4820)'
        className="searchInput"
      />
    </div>
  );
};

export default SearchBar;
