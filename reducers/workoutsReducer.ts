import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Accelerometer_Data {
  x_acc: number;
  y_acc: number;
  z_acc: number;
  x_vel: number;
  y_vel: number;
  z_vel: number;
  x: number;
  y: number;
  z: number;
  time: number;
}
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
  accelerometerData: Accelerometer_Data[];
  selected?: boolean;
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
        selected: false,
      });
    },
    updateWorkout(state, action: PayloadAction<WorkoutData>) {
      return state.map((workout) =>
        action.payload.id === workout.id ? action.payload : workout
      );
    },
    setWorkoutSelected(
      state,
      action: PayloadAction<{ id: string; selected: boolean }>
    ) {
      return state.map((workout) =>
        workout.id === action.payload.id
          ? { ...workout, selected: action.payload.selected }
          : workout
      );
    },
    deleteWorkout(state, action: PayloadAction<string>) {
      return state.filter((workout) => workout.id !== action.payload);
    },
    deleteSelected(state) {
      return state.filter((workout) => !workout.selected);
    },
    unselectAll(state) {
      return state.map((workout) => {
        return { ...workout, selected: false };
      });
    },
  },
});

export const {
  setWorkouts,
  addWorkout,
  updateWorkout,
  setWorkoutSelected,
  deleteWorkout,
  deleteSelected,
  unselectAll,
} = workoutsSlice.actions;
export default workoutsSlice.reducer;
