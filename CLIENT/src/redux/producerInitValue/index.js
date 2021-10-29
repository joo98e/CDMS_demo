const today = () => {
    const _now = new Date();
    const _fullYear = String(_now.getFullYear());
    const _getMonth = String(_now.getMonth() + 1);
    const _getDate = String(_now.getDate());
    return `${_fullYear}-${_getMonth < 10 ? "0" + _getMonth : _getMonth}-${_getDate < 10 ? "0" + _getDate : _getDate}`
}

export const initProjectMemberValue = [];

export const initRegisterValue = {
    id: '',
    idCheck: false,
    password: '',
    passwordCheck: '',
    first_name: '',
    last_name: '',
    nickName: '',
    phone: '',
    email : "mirimmedialab.co.kr"
};

export const initAgencyValue = {
    name: '',
    biz_area: '',
    desc: '',
    start_date: null,
    end_date: null,
    person: [],
    addInfo: [],
};

export const initProjectValue = {
    start_date: null,
    end_date: null,
    name: '',
    desc: '',
    person: [],
    addInfo: []
};

export const initProcessValue = {
    start_date: null,
    end_date: null,
    name: '',
    desc: '',
    mainPerson: false,
    subPerson: [],
    addInfo: [],
    total_task: 0,
    rating : 0
};