import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";


export const bookingApi = createApi({
        reducerPath: 'bookingApi',
        baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/'}),
        endpoints: (builder) => ({

        }),
    }
)

export const {useGetPokemonByNameQuery} = bookingApi