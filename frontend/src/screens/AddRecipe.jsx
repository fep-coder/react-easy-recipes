import { useEffect, useRef, useState } from "react";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import {
    useCreateRecipeMutation,
    useUploadImageMutation,
} from "../slices/recipesApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import JoditEditor from "jodit-react";

function AddRecipe() {
    const editor = useRef(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("noimage.jpg");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const { data: categories } = useGetCategoriesQuery();
    const [createRecipe] = useCreateRecipeMutation();
    const [uploadImage, { isLoading: loadingUpload }] =
        useUploadImageMutation();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRecipe({
                name,
                description,
                body,
                image,
                category,
                difficulty,
            }).unwrap();
            toast.success("Recipe created successfully");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error.data.message);
        }
    };

    const uploadFileHandler = async (e) => {
        // console.log(e.target.files[0]);
        setImage(e.target.files[0].name);
        setSelectedFile(e.target.files[0]);

        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {
            const res = await uploadImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <div className="col">
            <h2>Add Recipe</h2>

            <form onSubmit={handleSubmit} className="mb-5">
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
                    {/* <textarea
                        className="form-control"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    /> */}
                    <JoditEditor
                        ref={editor}
                        value={body}
                        onChange={(newContent) => setBody(newContent)}
                    />
                </div>
                <div className="mb-3 position-relative">
                    <label>Image</label>
                    <input
                        className="form-control"
                        type="file"
                        onChange={uploadFileHandler}
                    />
                    {loadingUpload && <Loader />}
                    {selectedFile && (
                        <div className="mt-3">
                            <img
                                src={preview}
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    marginTop: "10px",
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label>Category</label>
                    <select
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
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
