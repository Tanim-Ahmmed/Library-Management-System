
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://bookbuddy-server-chi.vercel.app/api"}),
    tagTypes: ["books", "borrow"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["books"],
        }),
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: "/books",
                method: "POST",
                body: newBook,
            }),
             invalidatesTags: ["books"],
        }),
        updateBook: builder.mutation({
            query: ({ id, ...updatedBook }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: updatedBook,
            }),
             invalidatesTags: ["books"],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["books"],
        }),
        getBorrow: builder.query({
            query: () => "/borrow",
            providesTags: ["borrow"],
        }),
        createBorrow: builder.mutation({
            query: (newBorrow) => ({
                url: "/borrow",
                method: "POST",
                body: newBorrow,
            }),
            invalidatesTags: ["borrow"],
        })
    }),
});

 export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
    useGetBorrowQuery,
    useCreateBorrowMutation,
 } = baseApi;





