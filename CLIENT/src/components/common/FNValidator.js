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
            const email = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i);

            console.log("email.test(value)", email.test(value))
            console.log("value === ''", value === '')
            console.log("value", value);
            
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

            if (!/^[가-힣]/.test(value) && value.length >= 1) {
                
                return false;
            } else {
                isConfirmed = true;
            }

            break;

        case "FIRST_NAME":
            // TODO
            // 특수문자 픽스해야함

            if (!/^[가-힣]/.test(value) && value.length >= 1) {
                
                return false;
            } else {
                isConfirmed = true;
            }

            break;

        case "LAST_NAME":
            // TODO
            // 특수문자 픽스해야함

            if (!/^[가-힣]/.test(value) && value.length >= 1) {
                
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

        // 이메일 
        case "EMAIL":
            if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(value)) {   
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 연락처 형식 ( - 포함 )
        case "PHONE":
            if (value !== '') {
                if (!/^\d{3}-\d{3,4}-\d{4}$/.test(value)) {
                    return false;
                } else {
                    isConfirmed = true;
                }
            }
            break;
            
        default:
            break;
    }

    console.log(`${valueName} is confirmed`);
    return isConfirmed;
}

export default FNValidator;