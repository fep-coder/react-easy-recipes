import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetRecipesQuery } from "../slices/recipesApiSlice";
import { useSelector } from "react-redux";

function RecipeList() {
    const filter = useSelector((state) => state.filter);
    const { data: recipes, error, isLoading } = useGetRecipesQuery(filter);

    return (
        <div className="col position-relative">
            {isLoading ? (
                <Loader />
            ) : error ? (
                <p>Something went wrong...</p>
            ) : (
                <>
                    {recipes.map((recipe) => (
                        <div className="row mb-5" key={recipe._id}>
                            <div className="col-4">
                                <Link to={`/recipes/${recipe._id}`}>
                                    <img
                                        className="img-fluid px-3"
                                        src={`/images/${recipe.image}`}
                                        alt={recipe.name}
                                    />
                                </Link>
                            </div>
                            <div className="col-8">
                                <h5 className="card-title">
                                    {recipe.name}{" "}
                                    <span className="badge bg-success">
                                        {recipe.author}
                                    </span>
                                </h5>
                                <p>{recipe.description}</p>
                                <Link
                                    className="btn btn-warning mt-2"
                                    to={`/recipes/${recipe._id}`}
                                >
                                    View Recipe
                                </Link>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default RecipeList;
