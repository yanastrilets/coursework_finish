import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const bookingApi = createApi({
        reducerPath: 'bookingApi',
        baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
        endpoints: (builder) => ({
            getAuthToken: builder.mutation({
                query: (body) => ({
                    url: `/auth/login`,
                    method: 'POST',
                    body
                }),
            }),
            getUser: builder.query({
                query: () => ({
                    url: `/auth/profile`,
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }),
            }),
            getApartments: builder.query({
                query: () => ({
                    url: `/apartment`,
                    method: 'GET'
                }),
            }),
            getApartmentById: builder.query({
                query: (id) => ({
                    url: `/apartment/${id}`,
                    method: 'GET'
                }),
            }),
            getApartmentsByRating: builder.query({
                query: () => ({
                    url: `/apartment/rating`,
                    method: 'GET'
                }),
            }),
        }),

    }
)

export const {useGetAuthTokenMutation, useGetUserQuery, useGetApartmentsQuery, useGetApartmentByIdQuery, useGetApartmentsByRatingQuery } = bookingApi