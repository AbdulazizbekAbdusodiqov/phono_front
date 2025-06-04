import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isProfileSettingsModalOpen: false,
  isCreateRoomModalOpen: false,
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    toggleProfileSettingsModal: (state) => {
      state.isProfileSettingsModalOpen = !state.isProfileSettingsModalOpen
    },

    toggleCreateRoomModal: (state) => {
      state.isCreateRoomModalOpen = !state.isCreateRoomModalOpen
    },
  },
})

export const {
  toggleProfileSettingsModal,
  toggleCreateRoomModal,
} = generalSlice.actions

export default generalSlice.reducer