import * as types from '../actions/ActionTypes';

const initialState = {
    color: [255, 255, 255]
};


const ui = (state = initialState, action) => {

    if(action.type === types.SET_COLOR){
        return{
            color : action.color
        }
    }
    else return state;
}

export default ui;