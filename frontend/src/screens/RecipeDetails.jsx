import { Link, useParams } from "react-router-dom";
import { useGetRecipeDetailsQuery } from "../slices/recipesApiSlice";
import Loader from "../components/Loader";
import HTMLReactParser from "html-react-parser";

function RecipeDetails() {
    const { id } = useParams();

    const { data: recipe, isLoading, error } = useGetRecipeDetailsQuery(id);

    return (
        <div className="col">
            {isLoading ? (
                <Loader />
            ) : error ? (
                <p>{error.data.message}</p>
            ) : (
                <>
                    <h1>{recipe.name}</h1>
                    <p>
                        <b>Author: </b> {recipe.author}
                    </p>
                    <p>
                        <b>Difficulty: </b> {recipe.difficulty}
                    </p>
                    <img
                        className="img-fluid mb-3 w-50"
                        src={`/images/${recipe.image}`}
                        alt={recipe.name}
                    />
                    <p>{recipe.description}</p>
                    <div>{HTMLReactParser(recipe.body)}</div>
                </>
            )}
            <Link to="/" className="btn btn-info mt-3">
                Back to all recipes
            </Link>
        </div>
    );
}

export default RecipeDetails;
