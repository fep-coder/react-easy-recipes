function App() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h1>Easy Recipes</h1>
                </div>
                <div className="col-6">
                    <a href="#">Add new</a> |<a href="#">Log in</a> |{" "}
                    <a href="#">Register</a>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <h3>Filters</h3>
                    <label>Search</label>
                    <input />
                </div>
                <div className="col">RecipeList</div>
            </div>
        </div>
    );
}

export default App;
