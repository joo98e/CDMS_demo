/**
 * 
 * @param {valueName} 속성
 * @param {value} 속성 값
 * @returns Boolean    
 */

const FNValidator = (valueName, value) => {
    let isConfirmed = false;

    switch (valueName.toUpperCase()) {
        // ID / 영문, 숫자만 사용하여 4 ~ 20글자
        case "ID":
            const email = new RegExp( /^[A-za-z0-9]{5,15}$/g);

            if (!email.test(value) || value === '') {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        case "PASSWORD":
            const password = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/);

            if (!password.test(value) || value === '') {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 성명 / 한글만 사용 가능 / 1글자 이상
        case "NAME":
            // TODO
            // 특수문자 픽스해야함

            if (!/^[가-힣]/.test(value) || value.length === 0) {
                return false;
            } else {
                isConfirmed = true;
            }

            break;

        case "FIRST_NAME":

            if (!/^[가-힣]/.test(value) || value.length === 0) {
                return false;
            } else {
                isConfirmed = true;
            }

            break;

        case "LAST_NAME":
            // TODO
            // 특수문자 픽스해야함

            if (!/^[가-힣]/.test(value) || value.length === 0) {

                return false;
            } else {
                isConfirmed = true;
            }

            break;

        // 닉네임 / 한글 영문만 사용 가능
        case "NICKNAME":
            if (!/^[가-힣a-zA-Z]+$/.test(value)) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 기관명 / 한글 혹은 영문이 반드시 1자 이상 포함, 한영숫 사용 가능
        case "AGCYNAME":
            if (!/^[A-za-zㄱ-ㅎ가-힣0-9]+[가-힣|ㄱ-ㅎ||A-Z|a-z]{1}/gi.test(value)) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 프로젝트명 / 한글 혹은 영문이 반드시 1자 이상 포함, 한영숫 사용 가능
        case "PROJNAME":
            if (!/^[A-za-zㄱ-ㅎ가-힣0-9]+[가-힣|ㄱ-ㅎ||A-Z|a-z]{1}/gi.test(value)) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 프로세스명 / 한글 혹은 영문이 반드시 1자 이상 포함, 한영숫 사용 가능
        case "PROCNAME":
            if (!/^[A-za-zㄱ-ㅎ가-힣0-9]+[가-힣|ㄱ-ㅎ||A-Z|a-z]{1}/gi.test(value)) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 이메일 
        case "EMAIL":
            if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(value)) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 이메일 
        case "DOMAIN":
            if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9]{2,})+(?:\:[0-9]{1,})*$/i.test(value)) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 연락처 형식 ( - 포함 )
        case "PHONE":
            if (value !== '') {
                if (!/^\d{3}-\d{3,4}-\d{4}$/.test(value)) {
                    if (!/^01[0-9]{9}/.test(value)) {
                        return false;
                    } else {
                        isConfirmed = true;
                    }
                } else {
                    isConfirmed = true;
                }
            }
            break;

        case "DEPT_NO":
            if (value === '' || value === undefined) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        case "RANK":
            if (value === '' || value === undefined) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        case "TOTAL_TASK":
            if (value === '' || value === undefined || value === 0) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        case "RATING":
            if (value === '' || value === undefined || value === 0) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        case "EMPTY":
            const _value = value.constructor;
            if (_value === Array) {
                console.log("Array");
                for (let i = 0; i < value.length; i++) {
                    return (!value[i].key || !value[i].value) ? false : isConfirmed = true;
                }
            }
            else if (_value === Object) {
                if (Object.keys(value).length === 0) {
                    return false;
                } else {
                    isConfirmed = true;
                }
            }
            break;

        default:
            console.log("정규식을 거치지 않았음");
            break;
    }
    return isConfirmed;
}

export default FNValidator;