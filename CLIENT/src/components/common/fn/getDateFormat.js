/**
 * @param {param}       : typeof date
 */
const setDigits = param => {
    return param < 10 ? `0${param}` : param
}

const getDateFormat = {
    YYYYMMDD : param => {
        try {
            let _target = new Date(param);
            const returnValue = `${setDigits(_target.getFullYear())}-${setDigits(_target.getMonth() + 1)}-${setDigits(_target.getDate())}`

            return returnValue;
        } catch (error) {
            alert("날짜 형식이 아닐 확률이 높습니다.");
        }
    }
}

export default getDateFormat;