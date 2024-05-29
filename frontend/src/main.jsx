import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeList from "./components/RecipeList";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<RecipeList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
