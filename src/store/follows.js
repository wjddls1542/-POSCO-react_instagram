import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteFollowing, getFollowerByMe, getFollowingByMe, getFollowingByMeOne, postFollower } from './followAPi';
import { Follow } from '../data/Follow';
const initialState = {
   follows: Follow,
   myFollowing: {
      follows: [],
      leading: false,
      message: '',
   },
   myFollower: {
      follows: [],
      leading: false,
      message: '',
   },
};

const SELECT_MY_FOLLOWER = 'SELECT_MY_FOLLOWER';
const SELECT_MY_FOLLOWERING = 'SELECT_MY_FOLLOWERING';
const DELETE_FOLLOWING = 'DELETE_FOLLOWING';
const INSERT_FOLLOWING = 'INSERT_FOLLOWING';
const SELECT_MY_FOLLOWERING_ONE = 'SELECT_MY_FOLLOWERING_ONE';

export const selectMyFollower = createAsyncThunk(SELECT_MY_FOLLOWER, async (payload, thunkAPI) => {
   const { myId } = thunkAPI.getState().users;
   const { follows } = thunkAPI.getState().follows;
   if (myId) {
      const myfollows = await getFollowerByMe(follows, Number(myId));
      return myfollows;
   } else if (myId === 0 || myId === '0') {
      const myfollows = await getFollowerByMe(follows, Number(myId));
      return myfollows;
   }
   return;
});

export const selectMyFollowing = createAsyncThunk(SELECT_MY_FOLLOWERING, async (payload, thunkAPI) => {
   const { myId } = thunkAPI.getState().users;
   const { follows } = thunkAPI.getState().follows;
   if (myId) {
      const myfollows = await getFollowingByMe(follows, Number(myId));
      return myfollows;
   } else if (myId === 0 || myId === '0') {
      const myfollows = await getFollowingByMe(follows, Number(myId));
      return myfollows;
   }
   return;
});

export const deleteFollow = createAsyncThunk(DELETE_FOLLOWING, async (payload, thunkAPI) => {
   const { follows } = thunkAPI.getState().follows;
   const { myId } = thunkAPI.getState().users;
   return await deleteFollowing(follows, Number(myId), payload);
});

export const insertFollowing = createAsyncThunk(INSERT_FOLLOWING, async (payload, thunkAPI) => {
   const { myId } = thunkAPI.getState().users;
   if (myId) {
      const myfollows = await postFollower(Number(myId), payload);
      return myfollows;
   } else if (myId === 0 || myId === '0') {
      const myfollows = await postFollower(Number(myId), payload);
      return myfollows;
   } else {
      return;
   }
});

export const selectMyFollowingOne = createAsyncThunk(SELECT_MY_FOLLOWERING_ONE, async (payload, thunkAPI) => {
   const { myId } = thunkAPI.getState().users;
   const { follows } = thunkAPI.getState().follows;
   const userId = payload;
   if (myId) {
      const myfollows = await getFollowingByMeOne(follows, Number(myId), userId);
      return myfollows ? true : false;
   } else if (myId === 0 || myId === '0') {
      const myfollows = await getFollowingByMeOne(follows, Number(myId), userId);
      return myfollows ? true : false;
   } else {
      return;
   }
});

export const followsSlice = createSlice({
   name: 'follows',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(insertFollowing.fulfilled, (state, { payload }) => {
            const newFollows = [...state.follows, payload];
            return { ...state, follows: newFollows };
         })
         .addCase(insertFollowing.rejected, (state, { error }) => {
            return { ...state };
         })
         .addCase(deleteFollow.fulfilled, (state, { payload }) => {
            return { ...state, follows: payload };
         })
         .addCase(deleteFollow.rejected, (state, { error }) => {
            return { ...state };
         })
         .addCase(selectMyFollower.pending, (state, { payload }) => {
            const newMyFollower = { ...state.myFollower };
            newMyFollower.loading = true;
            return { ...state, myFollower: newMyFollower };
         })
         .addCase(selectMyFollower.fulfilled, (state, { payload }) => {
            const newMyFollowers = { ...state.myFollower };
            newMyFollowers.loading = false;
            if (payload) {
               newMyFollowers.follows = payload;
               return { ...state, myFollower: newMyFollowers };
            }
            return { ...state, myFollower: newMyFollowers };
         })
         .addCase(selectMyFollowing.pending, (state, { payload }) => {
            const newFollowing = { ...state.myFollowing };
            newFollowing.loading = false;
            return { ...state, myFollowing: newFollowing };
         })
         .addCase(selectMyFollowing.fulfilled, (state, { payload }) => {
            const newFollowing = { ...state.myFollowing };
            newFollowing.loading = false;
            if (payload) {
               newFollowing.follows = payload;
               return { ...state, myFollowing: newFollowing };
            } else {
               return { ...state, myFollowing: newFollowing };
            }
         })
         .addCase(selectMyFollowing.rejected, (state, { error }) => {
            const newFollowing = { ...state.myFollowing };
            newFollowing.loading = false;
            newFollowing.message = error.message;
            return { ...state, myFollowing: newFollowing };
         });
   },
});

export default followsSlice.reducer;
