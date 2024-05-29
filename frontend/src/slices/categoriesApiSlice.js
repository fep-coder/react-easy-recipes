import { apiSlice } from "./apiSlice";

const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "/api/categories",
            providesTags: ["Category"],
        }),
    }),
});

export const { useGetCategoriesQuery } = recipesApiSlice;
