import { useState } from "react";

function AddRecipe() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    return (
        <div>
            <h2>Add Recipe</h2>

            <form className="mb-5">
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Body</label>
                    <textarea
                        className="form-control"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <input
                        className="form-control"
                        type="file"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Category</label>
                    <select
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="dessert">Dessert</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Difficulty</label>
                    <select
                        className="form-control"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="">Select a difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    );
}

export default AddRecipe;
