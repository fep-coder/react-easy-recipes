import { useGetRecipesQuery } from "../slices/recipesApiSlice";

function RecipeList() {
    const { data: recipes, error, isLoading } = useGetRecipesQuery();

    return (
        <div className="row">
            <h1 className="text-center">Browse Recipes</h1>

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Something went wrong...</p>
            ) : (
                recipes.map((recipe) => (
                    <div className="row mb-3" key={recipe._id}>
                        <div className="col-4">
                            <img
                                className="img-fluid"
                                src={`/images/${recipe.image}`}
                                alt={recipe.name}
                            />
                        </div>
                        <div className="col-8">
                            <h5 className="card-title">{recipe.name}</h5>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default RecipeList;
