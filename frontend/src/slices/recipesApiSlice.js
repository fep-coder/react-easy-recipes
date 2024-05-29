import { apiSlice } from "./apiSlice";

const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: () => "/api/recipes",
            providesTags: ["Recipe"],
        }),
    }),
});

export const { useGetRecipesQuery } = recipesApiSlice;
