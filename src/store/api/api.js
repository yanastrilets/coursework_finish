import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//import * as url from "url";


export const bookingApi = createApi({
        reducerPath: 'bookingApi',
        baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
        tagTypes: ['Tenant', 'Apartment', 'Landlord', 'Booking'],
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
                    method: 'GET',
                    providesTags: ['Apartment'],
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
                    url: `/tenant`,
                    method: 'POST',
                    body: tenantData,
                }),
                invalidatesTags: ['Tenant'],
            }),

            getTenantsFromOneUser: builder.query({
                query: ({id, sortField, sortOrder}) => ({
                    url: `/tenant/user/${id}?sortField=${sortField}&sortOrder=${sortOrder}`,
                    method: 'GET',
                }),
                providesTags: ['Tenant'],
            }),
            createBooking: builder.mutation({
                query: (bookingData) => ({
                    url: `/booking`,
                    method: 'POST',
                    body: bookingData
                }),
                providesTags: ['Booking']
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
                    method: 'GET',

                }),
                providesTags: ['Landlord'],
            }),
            getBookingsFromOneUser: builder.query({
                query: (id) => ({
                    url: `/booking/user/${id}`,
                    method: 'GET'
                }),
                providesTags: ['Booking'],
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
                invalidatesTags: ['Landlord'],
            }),
            createApartment: builder.mutation({
                query: (apartmentData) => ({
                    url: `/apartment`,
                    method: 'POST',
                    body: apartmentData
                }),
                invalidatesTags: ['Apartment'],
            }),
            getAllCountries: builder.query({
                query: (id) => ({
                    url: `/address/countries`,
                    method: 'GET'
                }),
            }),
            getAllCities: builder.query({
                query: (id) => ({
                    url: `/address/cities`,
                    method: 'GET'
                }),
            }),
            getAvailableApartments: builder.query({
                query: ({minPrice, maxPrice, city, checkIn, checkOut}) => ({
                    url: '/apartment/available',
                    params: {minPrice, maxPrice, city, checkIn, checkOut},
                }),
            }),
            getSortedApartments: builder.query({
                query: ({sortField, sortOrder}) => ({
                    url: `/apartment/sorted?sortField=${sortField}&sortOrder=${sortOrder}`,
                    method: 'GET',
                }),
                //providesTags: ['Apartment'],
            }),
            getSortedLandlords: builder.query({
                query: ({sortField, sortOrder}) => ({
                    url: `/landlord/sorted?sortField=${sortField}&sortOrder=${sortOrder}`,
                    method: 'GET',
                }),
                //providesTags: ['Landlord'],
            }),
            getApartmentCSV: builder.query({
                query: () => ({
                    url: `/apartments/export-csv`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        if (response.ok) {
                            return await response.blob(); // або response.arrayBuffer() для отримання буфера
                        } else {
                            throw new Error('Network response was not ok.');
                        }
                    }
                }),
            }),
            getLastIncomes: builder.query({
                query: () => ({
                    url: '/payment/get-last',
                    method: 'GET'
                }),
            }),
            getReview: builder.query({
                query: (idbook) => ({
                    url: `/review/${idbook}`,
                    method: 'GET'
                }),
            }),
            getReviewsByUserId: builder.query({
                query: (userId) => `reviews/user/${userId}`,
            }),
            createRefund: builder.mutation({
                query: (refundData) => ({
                    url: `/refund`,
                    method: 'POST',
                    body: refundData,
                }),
                //invalidatesTags: ['Tenant'],
            }),
            updateBookingStatus: builder.mutation({
                query: ({ id }) => ({
                    url: `/booking/reject/${id}`,
                    method: 'PATCH'
                }),
                //invalidatesTags: ['Booking'],
            }),
        }),

    }
)

export const {
    useGetAuthTokenMutation, useGetUserQuery, useGetApartmentsQuery,
    useGetApartmentByIdQuery, useGetApartmentsByRatingQuery, useCreateUserMutation,
    useGetReserveStatusesQuery, useCreateTenantMutation, useGetTenantsFromOneUserQuery,
    useCreateBookingMutation, useGetReservedDatesFromHouseQuery, useGetLandlordsQuery,
    useGetBookingsFromOneUserQuery, useCreatePaymentMutation, useCreateLandlordMutation,
    useCreateApartmentMutation, useGetAllCountriesQuery, useGetAllCitiesQuery,
    useGetAvailableApartmentsQuery, useGetSortedApartmentsQuery, useGetSortedLandlordsQuery,
    useGetApartmentCSVQuery, useGetLastIncomesQuery, useGetReviewQuery, useGetReviewsByUserIdQuery,
    useCreateRefundMutation, useUpdateBookingStatusMutation
} = bookingApi