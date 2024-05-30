import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeList from "./screens/RecipeList";
import { Provider } from "react-redux";
import store from "./store";
import AddRecipe from "./screens/AddRecipe";
import RecipeDetails from "./screens/RecipeDetails";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<RecipeList />} />
                        <Route path="/add" element={<AddRecipe />} />
                        <Route
                            path="/recipes/:id"
                            element={<RecipeDetails />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
