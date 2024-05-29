import { apiSlice } from "./apiSlice";

const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: () => "/api/recipes",
            providesTags: ["Recipe"],
        }),
        addRecipe: builder.mutation({
            query: (recipe) => ({
                url: "/api/recipes",
                method: "POST",
                body: recipe,
            }),
            invalidatesTags: ["Recipe"],
        }),
    }),
});

export const { useGetRecipesQuery, useAddRecipeMutation } = recipesApiSlice;
