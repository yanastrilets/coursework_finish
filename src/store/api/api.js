import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//import * as url from "url";


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
            createUser: builder.mutation({
                query: (body) => ({
                    url: `/user`,
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
            getReserveStatuses: builder.query({
                query: () => ({
                    url: `/reserve-status`,
                    method: 'GET'
                }),
            }),
            createTenant: builder.mutation({
                query: (tenantData) => ({
                    url: `/tenant`,  // Переконайтеся, що URL відповідає вашому backend endpoint
                    method: 'POST',
                    body: tenantData  // Тіло запиту буде містити дані нового тенанта
                }),
            }),

            getTenantsFromOneUser: builder.query({
                query: (id) => ({
                    url: `/tenant/user/${id}`,
                    method: 'GET'
                }),
            }),
            createBooking: builder.mutation({
                query: (bookingData) => ({
                    url: `/booking`,  // Переконайтеся, що URL відповідає вашому backend endpoint
                    method: 'POST',
                    body: bookingData  // Тіло запиту буде містити дані нового тенанта
                }),
            }),
            getReservedDatesFromHouse: builder.query({
                query: (id) => ({
                    url: `/booking/${id}/reserved-dates`,
                    method: 'GET'
                }),
            }),
            getLandlords: builder.query({
                query: (id) => ({
                    url: `/landlord`,
                    method: 'GET'
                }),
            }),
            getBookingsFromOneUser: builder.query({
                query: (id) => ({
                    url: `/booking/user/${id}`,
                    method: 'GET'
                }),
            }),
            createPayment: builder.mutation({
                query: (paymentData) => ({
                    url: `/payment`,
                    method: 'POST',
                    body: paymentData
                }),
            }),
            createLandlord: builder.mutation({
                query: (landlordData) => ({
                    url: `/landlord`,
                    method: 'POST',
                    body: landlordData
                }),
            }),
        }),

    }
)

export const {useGetAuthTokenMutation, useGetUserQuery, useGetApartmentsQuery,
    useGetApartmentByIdQuery, useGetApartmentsByRatingQuery, useCreateUserMutation,
    useGetReserveStatusesQuery, useCreateTenantMutation, useGetTenantsFromOneUserQuery,
    useCreateBookingMutation, useGetReservedDatesFromHouseQuery, useGetLandlordsQuery,
    useGetBookingsFromOneUserQuery, useCreatePaymentMutation, useCreateLandlordMutation} = bookingApi