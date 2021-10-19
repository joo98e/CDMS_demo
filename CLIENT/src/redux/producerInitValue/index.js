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
};

export const initAgencyValue = {
    start_date: today(),
    end_date: today(),
    name: '',
    desc: '',
    biz_area: '',
    person: [],
    additionalInfo: []
};

export const initProjectValue = {
    start_date: today(),
    end_date: today(),
    name: '',
    desc: '',
    person: [],
    additionalInfo: []
};

export const initProcessValue = {
    start_date: today(),
    end_date: today(),
    name: '',
    desc: '',
    mainPerson: false,
    subPerson: [],
    additionalInfo: []
};