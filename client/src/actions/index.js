import {SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM} from './types'
import streams from '../api/stream';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN, 
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = (formvalue) => {
    return async (dispatch, getState) => {
        const {userId} = getState().auth
        /* Extra Login written by me */
        //---------------------------------------------------------------------
        if(userId === null){
            const result = await streams.post('/streams', {...formvalue})
            dispatch({type: CREATE_STREAM, payload: result.data})
        }
        else{
            const result = await streams.post('/streams', {...formvalue, userId})
            dispatch({type: CREATE_STREAM, payload: result.data})
        }
        history.push("/")
        //---------------------------------------------------------------------
        /* Login written by udemy */
        /* const result = await streams.post('/streams', {...formvalue, userId})
           dispatch({type: CREATE_STREAM, payload: result.data}) */
    }
}

export const fetchStreams = () => {
    return async (dispatch, getState) => {
        const result = await streams.get('/streams')
        dispatch({type: FETCH_STREAMS, payload: result.data})
    }
}

export const fetchStream = (id) => {
    return async (dispatch, getState) => {
        const result = await streams.get(`/streams/${id}`)
        dispatch({type: FETCH_STREAM, payload: result.data})
    }
}

export const deleteStream = (id) => {
    return async (dispatch, getState) => {
        await streams.delete(`/streams/${id}`)
        dispatch({type: DELETE_STREAM, payload: id})
        history.push("/")
    }
}

export const editStream = (id, formValue) => {
    return async (dispatch, getState) => {
        const result = await streams.patch(`/streams/${id}`, formValue)
        dispatch({type: EDIT_STREAM, payload: result.data})
        history.push("/")
    }
}