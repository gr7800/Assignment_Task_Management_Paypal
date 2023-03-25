import { ADD_SPRINTS_FAILURE, ADD_SPRINTS_REQUEST, ADD_SPRINTS_SUCCESS, ADD_SPRINT_FAILURE, ADD_SPRINT_REQUEST, ADD_SPRINT_SUCCESS } from "./actionTypes"

export const addSprintRequest=(payload)=>{
    return {type:ADD_SPRINT_REQUEST,payload}
}

export const addSprintSuccess=(payload)=>{
    return {type:ADD_SPRINT_SUCCESS,payload}
}

export const addSprintFailure=(payload)=>{
    return {type:ADD_SPRINT_FAILURE,payload}
}

export const addSprintsRequest=(payload)=>{
    return {type:ADD_SPRINTS_REQUEST,payload}
}

export const addSprintsSuccess=(payload)=>{
    return {type:ADD_SPRINTS_SUCCESS,payload}
}

export const addSprintsFailure=(payload)=>{
    return {type:ADD_SPRINTS_FAILURE,payload}
}