import { apiSlice } from "./apiSlice";

const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: () => "/api/recipes",
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
    }),
});

export const {
    useGetRecipesQuery,
    useCreateRecipeMutation,
    useUploadImageMutation,
} = recipesApiSlice;
