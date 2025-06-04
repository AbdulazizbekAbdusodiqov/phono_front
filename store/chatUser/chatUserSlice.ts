import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../gql/graphql'

interface UserState {
  id: number | undefined
  profile_img: string | null
  first_name: string
}

const initialState: UserState = {
  id: undefined,
  profile_img: null,
  first_name: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfileImage: (state, action: PayloadAction<string>) => {
      state.profile_img = action.payload
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.first_name = action.payload
    },
    setUser: (state, action: PayloadAction<User>) => {
      const user = action.payload
      state.id = user.id || undefined
      state.profile_img = user.profile_img ? user.profile_img : null
      state.first_name = user.first_name
    },
  },
})

export const {
  updateProfileImage,
  updateUsername,
  setUser,
} = userSlice.actions

export default userSlice.reducer