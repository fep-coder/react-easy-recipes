import { useDispatch } from "react-redux";
import { setCategory, setSearchTerm } from "../slices/filterSlice";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";

function Filters() {
    const dispatch = useDispatch();
    const { data: categories } = useGetCategoriesQuery();

    return (
        <div className="col-4">
            <div>
                <h3>Filters</h3>
                <label htmlFor="search">Search</label>
                <input
                    className="form-control"
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                    id="search"
                />
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <select
                    className="form-control"
                    id="category"
                    defaultValue="all"
                    onChange={(e) => dispatch(setCategory(e.target.value))}
                >
                    <option value="all">All</option>
                    {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Filters;
