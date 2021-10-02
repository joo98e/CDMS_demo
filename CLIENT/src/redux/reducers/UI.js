import * as types from '../types';
import Themes from '../../components/common/Theme'

const message = function () {
    const date = new Date();
    let greeting = date.getHours();

    return greeting >= 20 ? '편안한 밤 되세요.'
        : greeting >= 18 ? '맛있는 식사 하세요!'
            : greeting >= 13 ? '오후도 힘내세요.'
                : greeting >= 12 ? '식사 맛있게 하세요!'
                    : greeting >= 10 ? '오전 힘내세요!'
                        : greeting >= 9 ? '좋은 아침입니다.'
                            : greeting >= 6 ? '너무 이른데요..' : '굿밤!'
}

const test = () => {
    let tested = null;

    isProdEnv()
        .then(data => {
            console.log(data);
            tested = data;
        });

    return tested;
}


const isProdEnv = async () => {
    const config = {
        method: "GET",
        header: {
            'content-type': "application/json"
        }
    }
    let data = null;

    await fetch('/api/util/process/isProd', config)
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
            data = res;
            sssss(data)
        });
    
    return data;
}

const sssss = data => {
    
    console.log(data);
}

const initialState = {
    color: 'default',
    nowThemeNum: 0,
    theme: Themes.dark,
    bgColor: "#424242",
    hourlyGreetings: message(),
    menuAppearPosition: 'left',
    isProd: sssss()
};

const UI = (state = initialState, action) => {

    switch (action.type) {

        case types.SET_MENU_APPEAR_POSITION:
            return {
                ...state,
                menuAppearPosition:
                    (state.menuAppearPosition === 'left') ? 'top' :
                        (state.menuAppearPosition === 'top') ? 'right' :
                            (state.menuAppearPosition === 'right') ? 'bottom' : 'left'
            };

        case types.SET_THEME:
            return {
                ...state,
                theme: state.nowThemeNum === 0 ? Themes.white : Themes.dark,
                nowThemeNum: state.nowThemeNum === 0 ? 1 : 0
            }

        // if(state.nowThemeNum === Object.keys(Themes).length - 1){
        //     return {
        //         ...state,
        //         nowThemeNum : 0,
        //         theme: Themes[Object.keys(Themes)[0]]
        //     }
        // }else{
        //     return {
        //         ...state,
        //         nowThemeNum : state.nowThemeNum + 1,
        //         theme: Themes[Object.keys(Themes)[state.nowThemeNum + 1]]
        //     };
        // }

        default:
            return state;
    }
}

export default UI;