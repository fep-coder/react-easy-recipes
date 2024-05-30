import { apiSlice } from "./apiSlice";

const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: (keyword) => ({
                url: `/api/recipes`,
                params: { keyword },
            }),
            providesTags: ["Recipe"],
        }),
        createRecipe: builder.mutation({
            query: (recipe) => ({
                url: "/api/recipes",
                method: "POST",
                body: recipe,
            }),
            invalidatesTags: ["Recipe"],
        }),
        uploadImage: builder.mutation({
            query: (image) => ({
                url: "/api/recipes/upload",
                method: "POST",
                body: image,
            }),
        }),
        getRecipeDetails: builder.query({
            query: (id) => `/api/recipes/${id}`,
            providesTags: ["Recipe"],
        }),
    }),
});

export const {
    useGetRecipesQuery,
    useCreateRecipeMutation,
    useUploadImageMutation,
    useGetRecipeDetailsQuery,
} = recipesApiSlice;
