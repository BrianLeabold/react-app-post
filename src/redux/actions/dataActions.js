import { SET_POSTS, LOADING_DATA, UNLIKE_POST, LIKE_POST, CREATE_POST, LOADING_UI, STOP_LOADING_UI, SET_ERRORS, CLEAR_ERRORS, DELETE_POST, SET_POST, SUBMIT_COMMENT } from '../types';
import axios from 'axios';

//GET all posts
export const getPosts = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: null
            });
        });
};

//Create a new post
export const createPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/post', newPost)
        .then((res) => {
            dispatch({
                type: CREATE_POST,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

// GET post by postId
export const getPost = (postId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/post/${postId}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({
                type: STOP_LOADING_UI
            });
        })
        .catch(err => console.log(err));
};

// Like a post
export const likePost = (postId) => dispatch => {
    axios.get(`/post/${postId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

//Unlike a post
export const unlikePost = (postId) => (dispatch) => {
    axios
        .get(`/post/${postId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {
    axios
        .post(`/post/${postId}/comment`, commentData)
        .then((res) => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const deletePost = (postId) => (dispatch) => {
    axios
        .delete(`/post/${postId}`)
        .then(() => {
            dispatch({ type: DELETE_POST, payload: postId });
        })
        .catch((err) => console.log(err));
};

export const getUserDetails = (userName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get(`/user/${userName}`)
        .then((res) => {
            dispatch({
                type: SET_POSTS,
                payload: res.data.posts
            });
        })
        .catch(() => {
            dispatch({
                type: SET_POSTS,
                payload: null
            });
        });
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};