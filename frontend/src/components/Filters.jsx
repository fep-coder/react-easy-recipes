import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSerchTerm } from "../slices/searchSlice";

function Filters() {
    const searchTerm = useSelector((state) => state.search.searchTerm);
    // console.log(searchTerm);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(searchTerm);
    }, [searchTerm]);

    return (
        <div className="col-4">
            <h3>Filters</h3>
            <label htmlFor="search">Search</label>
            <input
                onChange={(e) => dispatch(setSerchTerm(e.target.value))}
                id="search"
            />
        </div>
    );
}

export default Filters;
