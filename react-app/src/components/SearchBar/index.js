import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('')
    const history = useHistory()




    const handleSearch = (e) => {
        e.preventDefault()
        history.push({
            pathname: '/search',
            search: `?query=${searchValue}`,
            state: {detail: searchValue}
        })
    }
    return (
        <div className="search-bar-div">
            <form className="search-bar-div" onSubmit={handleSearch}>
                <input
                className="search-bar-input"
                placeholder="Search..."
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                required
                ></input>
                <button className="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
    )
}

export default SearchBar
