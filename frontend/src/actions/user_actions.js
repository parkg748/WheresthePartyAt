import * as userAPI from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    };
};

export const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users
    };
};

export const fetchUsers = () => dispatch => {
    return userAPI.fetchUsers().then(res => dispatch(receiveUsers(res)));
}

export const fetchUser = (id) => (dispatch) => {
    return userAPI.fetchUser(id).then(res => dispatch(receiveUser(res)));
};

export const updateUser = (user) => (dispatch) => {
    return userAPI.updateUser(user).then(res => dispatch(receiveUser(res)));
};