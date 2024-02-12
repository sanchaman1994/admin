
import { useEffect, useState } from "react";
import "./search.scss";

const Search = ({ users, setLoading, setUser, fetchUsers }) => {
    const [searchItem, setSearchItem] = useState("");
    const [debounce, setDebounce] = useState();
    const [status, setStatus] = useState("");




    const debounceSearch = (event, debounceTimeout) => {
        setLoading(true);
        if (debounce) {
            clearTimeout(debounce);
        }
        const debounceCall = setTimeout(() => {
            const searchResult = users.filter((item) => {
                return (
                    item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
                    item.email.toLowerCase().includes(searchItem.toLowerCase()) ||
                    item.role.toLowerCase().includes(searchItem.toLowerCase())
                )
            });
            if (searchResult.length === 0) {
                setStatus("No user found!");
            }
            if (event.target.value === "") {
                setUser(fetchUsers());
                setStatus('');
            }
            setUser(searchResult);
        }, debounceTimeout);
        setDebounce(debounceCall);
        setLoading(false);
    };


    const search = (e) => {
        setSearchItem(e.target.value);
        debounceSearch(e, 500);
    };


    return (
        <div className="searchBar">
            <input
                placeholder="Search by name, email or role..."
                onChange={search}
            />
            <div className="status">
                {status.length > 0 ? <p className="red">{status}</p> : null}
            </div>
        </div>
    );
};

export default Search;