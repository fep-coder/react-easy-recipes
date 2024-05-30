import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetRecipesQuery } from "../slices/recipesApiSlice";
import { useSelector } from "react-redux";

function RecipeList() {
    const filter = useSelector((state) => state.search);
    const {
        data: recipes,
        error,
        isLoading,
    } = useGetRecipesQuery(filter.searchTerm);

    return (
        <div className="row position-relative">
            {isLoading ? (
                <Loader />
            ) : error ? (
                <p>Something went wrong...</p>
            ) : (
                <>
                    <h1 className="text-center">Browse Recipes</h1>
                    {recipes.map((recipe) => (
                        <div className="row mb-3" key={recipe._id}>
                            <div className="col-4">
                                <Link to={`/recipes/${recipe._id}`}>
                                    <img
                                        className="img-fluid"
                                        src={`/images/${recipe.image}`}
                                        alt={recipe.name}
                                    />
                                </Link>
                            </div>
                            <div className="col-8">
                                <h5 className="card-title">{recipe.name}</h5>
                                <p>{recipe.description}</p>
                                <Link to={`/recipes/${recipe._id}`}>
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
