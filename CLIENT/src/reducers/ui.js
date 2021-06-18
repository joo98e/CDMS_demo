import * as types from '../actions/ActionTypes';

const initialState = {
    color: 'default'
};


const ui = (state = initialState, action) => {
    if(action.type === types.SET_COLOR){
        return{
            color : state.color === 'default' ? 'primary' : 'default'
        }
    }
    else return state;
}

export default ui;