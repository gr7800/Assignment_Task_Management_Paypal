import React from 'react'
import { ADD_SPRINTS_FAILURE, ADD_SPRINTS_REQUEST, ADD_SPRINTS_SUCCESS, ADD_SPRINT_FAILURE, ADD_SPRINT_REQUEST, ADD_SPRINT_SUCCESS } from './actionTypes';

const initialState={
    sprints:[],
    isLoading:false,
    loading_msg:"",
    isError:false,
    err_msg:""
}

const reducer = (state=initialState,action) => {
    const {type,payload}=action;
     switch (type){
        case ADD_SPRINT_REQUEST:
            return {
                ...state,
                isLoading:true,
                loading_msg:payload
            }

        case ADD_SPRINT_SUCCESS:
            return {
                ...state,
                sprints:[...state.sprints,payload],
                isLoading:false
            }

        case ADD_SPRINT_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true,
                err_msg:payload
            }
        
            case ADD_SPRINTS_REQUEST:
                return {
                    ...state,
                    isLoading:true,
                    loading_msg:payload
                }
    
            case ADD_SPRINTS_SUCCESS:
                return {
                    ...state,
                    sprints:payload,
                    isLoading:false
                }
    
            case ADD_SPRINTS_FAILURE:
                return {
                    ...state,
                    isLoading:false,
                    isError:true,
                    err_msg:payload
                }
        default:
            return state
     }
}

export  {reducer}