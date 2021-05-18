import React, { useState } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import { FiSearch } from 'react-icons/fi';
import SearchResult from './components/searchResult';
import './App.css';


function App() {
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [finalSearchText, setFinalSearchText] = useState(null)
  const onClick = () => {
    setFinalSearchText(searchText);
    setButtonClicked(true);
  }
  return (
    <div>
      <h2 className="Heading PageName">Oh.search</h2>
      <div className="SearchBar">
        <InputGroup className="MainInput">
          <Button onClick={onClick} className="SearchButton"><FiSearch className="SearchIcon" /></Button>
          <Input placeholder="search" className="TextInput" id="searchBar" onChange={(event) => setSearchText(event.target.value)} />
        </InputGroup>
      </div>
      {
        isButtonClicked ? <SearchResult searchTerm={finalSearchText} /> : <></>
      }
    </div >
  );
}

export default App;
