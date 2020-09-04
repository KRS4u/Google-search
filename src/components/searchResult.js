import React, { useState, useEffect } from 'react';
import { ENGINE_ID, KEY } from '../utils/constants';
import './searchResult.css';

function SearchResult(props) {
    const searchTerm = props.searchTerm;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch(`https://www.googleapis.com/customsearch/v1?key=${KEY}&cx=${ENGINE_ID}&q=${searchTerm}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result ? result.items : []);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="Container">
                {items ? items.map(item => (
                    <div className="ItemContainer">
                        <img src={item.pagemap.cse_image[0].src} className="Thumbnail"></img>
                        <div className="TextGrid">
                            {item.link}
                            <h3>{item.title}</h3>
                            {item.snippet}
                        </div>
                    </div>
                )) : <></>}
            </div>
        );
    }

}
export default SearchResult;