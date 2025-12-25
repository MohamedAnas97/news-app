import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Post, User } from './types'

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
    }),
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
    }),
  }),
})

export const { useGetPostsQuery, useGetUsersQuery, useGetPostByIdQuery } = newsApi
