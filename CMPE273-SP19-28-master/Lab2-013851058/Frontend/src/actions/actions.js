export const SET_USER = 'SET_USER';
export const RESET = 'RESET';
export const LOGIN_USER = "LOGIN";

export function loginUser(data){
    return {
        type: LOGIN_USER,
        payload: data
    }
}

export function login(data){
    return {
        type: SET_USER,
        payload: data
    }
}

export function logout(data){
    return {
        type: RESET,
        payload: data
    }
}
