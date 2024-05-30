import { useDispatch } from "react-redux";
import { setSearchTerm } from "../slices/searchSlice";

function Filters() {
    const dispatch = useDispatch();

    return (
        <div className="col-4">
            <h3>Filters</h3>
            <label htmlFor="search">Search</label>
            <input
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                id="search"
            />
        </div>
    );
}

export default Filters;
