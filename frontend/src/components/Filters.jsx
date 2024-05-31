import { useDispatch } from "react-redux";
import {
    setCategory,
    setDifficulty,
    setSearchTerm,
} from "../slices/filterSlice";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import { useState } from "react";

function Filters() {
    const dispatch = useDispatch();
    const { data: categories } = useGetCategoriesQuery();

    const checkboxes = ["easy", "medium", "hard"];
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        setSelectedItems(
            e.target.checked
                ? [...selectedItems, value]
                : selectedItems.filter((item) => item !== value)
        );

        dispatch(
            setDifficulty(
                e.target.checked
                    ? [...selectedItems, value]
                    : selectedItems.filter((item) => item !== value)
            )
        );
    };

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

            <div className="mt-3">
                <label htmlFor="category">Category</label>
                <select
                    className="form-control"
                    id="category"
                    onChange={(e) => dispatch(setCategory(e.target.value))}
                >
                    <option value="">All</option>
                    {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-3 form-check">
                <label>Choose Difficulty</label>
                {checkboxes.map((difficulty) => (
                    <div key={difficulty}>
                        <label htmlFor={difficulty}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={difficulty}
                                value={difficulty}
                                onChange={handleCheckboxChange}
                            />
                            {difficulty}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filters;
