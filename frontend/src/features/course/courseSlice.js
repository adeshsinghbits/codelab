import { createSlice } from "@reduxjs/toolkit";
import {
  createCourseThunk,
  fetchCoursesThunk,
  fetchSingleCourseThunk,
  updateCourseThunk,
  deleteCourseThunk,
  searchCoursesThunk,
  joinCourseThunk,
  leaveCourseThunk,
  fetchCreatorCoursesThunk,
  fetchJoinedCoursesThunk,
  isCourseJoinedThunk,
  fetchCourseAttendeesThunk,
  fetchCourseCreatorThunk,
} from "./courseThunk";

const initialState = {
  courses: [],
  totalPages: 0,
  page: 1,
  limit: 10,

  joinedCourses: [],
  creatorCourses: [],
  currentCourse: null,
  courseAttendees: [],
  courseCreator: null,
  isJoined: false,

  loading: false,
  error: null,
  success: false,
  message: "",
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourseState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createCourseThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.courses.unshift(action.payload); // Optional: insert at top
        state.message = "Course created";
      })
      .addCase(createCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchCoursesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = Math.ceil(action.payload.totalCourses / action.payload.limit);
      })
      .addCase(fetchCoursesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SINGLE COURSE
      .addCase(fetchSingleCourseThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchSingleCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateCourseThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentCourse = action.payload;
        state.message = "Course updated";
      })
      .addCase(updateCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteCourseThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.courses = state.courses.filter(c => c._id !== action.payload.courseId);
      })
      .addCase(deleteCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SEARCH
      .addCase(searchCoursesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(searchCoursesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // JOIN
      .addCase(joinCourseThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Course joined";
        state.isJoined = true;
        state.currentCourse = action.payload;
      })
      .addCase(joinCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LEAVE
      .addCase(leaveCourseThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Course left";
        state.isJoined = false;
        state.currentCourse = action.payload;
      })
      .addCase(leaveCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH CREATOR COURSES
      .addCase(fetchCreatorCoursesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreatorCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.creatorCourses = action.payload;
      })
      .addCase(fetchCreatorCoursesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH JOINED COURSES
      .addCase(fetchJoinedCoursesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJoinedCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.joinedCourses = action.payload;
      })
      .addCase(fetchJoinedCoursesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHECK IS JOINED
      .addCase(isCourseJoinedThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(isCourseJoinedThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isJoined = action.payload.joined;
      })
      .addCase(isCourseJoinedThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ATTENDEES
      .addCase(fetchCourseAttendeesThunk.fulfilled, (state, action) => {
        state.courseAttendees = action.payload;
      })

      // CREATOR DETAILS
      .addCase(fetchCourseCreatorThunk.fulfilled, (state, action) => {
        state.courseCreator = action.payload;
      });
  },
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
