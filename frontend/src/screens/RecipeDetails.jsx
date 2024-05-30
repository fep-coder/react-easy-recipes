import { Link, useParams } from "react-router-dom";
import { useGetRecipeDetailsQuery } from "../slices/recipesApiSlice";
import Loader from "../components/Loader";

function RecipeDetails() {
    const { id } = useParams();

    const { data: recipe, isLoading, error } = useGetRecipeDetailsQuery(id);

    return (
        <div className="row">
            <div className="col">
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <p>{error.data.message}</p>
                ) : (
                    <>
                        <img
                            className="img-fluid"
                            src={`/images/${recipe.image}`}
                            alt={recipe.name}
                        />
                        <h1>{recipe.name}</h1>
                        <p>{recipe.description}</p>
                        <div>{recipe.body}</div>
                    </>
                )}
            </div>
            <Link to="/" className="btn btn-info">
                Back to List
            </Link>
        </div>
    );
}

export default RecipeDetails;
