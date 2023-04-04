import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface TreeIdsState {
  value: string[]
}

// Define the initial state using that type
const initialState: TreeIdsState = {
  value: ['1'],
}

export const treeIdsSlice = createSlice({
  name: 'treeIds',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setArrayIds: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    },
  },
})

export const { setArrayIds } = treeIdsSlice.actions

export default treeIdsSlice.reducer

// // Использование в компоненте пример
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { setArrayIds } from '@/redux/features/treeIdsArray/treeIdsArray.slice';

// const treeIds = useAppSelector((state) => state.treeIds.value);
// const dispatch = useAppDispatch();