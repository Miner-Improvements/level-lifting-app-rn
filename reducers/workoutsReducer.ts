import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WorkoutData {
  id?: string;
  name: string;
  date: string;
  reps: number;
  sets: number;
  maxAcceleration: number;
  maxForce: number;
  balanceRating: string;
  avgSetDuration: number;
}

const workoutsSlice = createSlice({
  name: "workouts",
  initialState: [] as WorkoutData[],
  reducers: {
    setWorkouts(state, action: PayloadAction<WorkoutData[]>) {
      return action.payload;
    },
    addWorkout(state, action: PayloadAction<WorkoutData>) {
      state.push({
        ...action.payload,
        id:
          action.payload.id ??
          Math.random().toString(36).substr(2) + Date.now().toString(36),
      });
    },
    deleteWorkout(state, action: PayloadAction<string>) {
      return state.filter((workout) => workout.id !== action.payload);
    },
  },
});

export const { setWorkouts, addWorkout, deleteWorkout } = workoutsSlice.actions;
export default workoutsSlice.reducer;
