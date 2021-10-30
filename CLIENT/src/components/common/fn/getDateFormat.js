import getNow from "./getNow";

/**
 * @param {param}       : typeof date
 */
const setDigits = param => {
    return param < 10 ? `0${param}` : param
}

const getDateFormat = {
    YYYYMMDD: param => {
        try {
            let _target = new Date(param);
            const returnValue = `${setDigits(_target.getFullYear())}-${setDigits(_target.getMonth() + 1)}-${setDigits(_target.getDate())}`
            return returnValue;
        } catch (error) {
            alert("날짜 형식이 아닐 확률이 높습니다.");
        }
    },
    YYYYMMDDHHMMSS_BEGIN: param => {
        try {
            let _target = new Date(param);
            const returnValue = `${setDigits(_target.getFullYear())}-${setDigits(_target.getMonth() + 1)}-${setDigits(_target.getDate())} 00:00:00`

            return returnValue;
        } catch (error) {
            alert("날짜 형식이 아닐 확률이 높습니다.");
        }
    },
    YYYYMMDDHHMMSS_END: param => {
        try {
            let _target = new Date(param);
            const returnValue = `${setDigits(_target.getFullYear())}-${setDigits(_target.getMonth() + 1)}-${setDigits(_target.getDate())} 23:59:59`

            return returnValue;
        } catch (error) {
            alert("날짜 형식이 아닐 확률이 높습니다.");
        }
    },
    TOSTRING: param => {
        try {
            const today = new Date();
            const timeValue = new Date(param);

            const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);

            if (betweenTime < 1) return '방금 전';
            if (betweenTime < 60) {
                return `${betweenTime}분 전`;
            }

            const betweenTimeHour = Math.floor(betweenTime / 60);
            console.log(betweenTimeHour);
            if (betweenTimeHour < 24) {
                return `${betweenTimeHour}시간 전`;
            }

            const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
            console.log(betweenTimeDay);
            if (betweenTimeDay < 7) {
                return `${betweenTimeDay}일 전`;
            }

            const betweenTimeWeek = Math.floor(betweenTime / 60 / 24 / 7);
            console.log(betweenTimeWeek);
            if (betweenTimeWeek < 5) {
                return `${betweenTimeWeek + 1}주 전`;
            }

            return `${setDigits(timeValue.getFullYear())}-${setDigits(timeValue.getMonth() + 1)}-${setDigits(timeValue.getDate())}`
        } catch (error) {

        }
    }
}

export default getDateFormat;