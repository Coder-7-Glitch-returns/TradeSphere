import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    fullName: '',
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { email, fullName } = action.payload
            state.email = email
            state.fullName = fullName
            state.isLoggedIn = true
        },
        loggedOutUser: (state) => {
            state.email = ''
            state.fullName = ''
            state.isLoggedIn = false
        }
    },
})

export const { setUser, loggedOutUser } = userSlice.actions

export default userSlice.reducer