const FNValidator = (typeStr, target) => {
    let isConfirmed = false;

    switch (typeStr.toUpperCase()) {
        // ID / 영문, 숫자만 사용하여 4 ~ 20글자
        case "ID":
            if (!/^[a-z0-9]{4,20}$/.test(target) || target === '') {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 성명 / 한글만 사용 가능 / 1글자 이상
        case "NAME":
            // TODO
            // 특수문자 픽스해야함

            if (!/^[가-힣]/.test(target) && target.length >= 1) {
                
                return false;
            } else {
                isConfirmed = true;
            }

            break;
        
        // 닉네임 / 한글 영문만 사용 가능
        case "NICKNAME":
            if (!/^[가-힣a-zA-Z]+$/.test(target)) {
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 이메일 
        case "EMAIL":
            if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(target)) {   
                return false;
            } else {
                isConfirmed = true;
            }
            break;

        // 연락처 형식 ( - 포함 )
        case "PHONE":
            if (target !== '') {
                if (!/^\d{3}-\d{3,4}-\d{4}$/.test(target)) {
                    return false;
                } else {
                    isConfirmed = true;
                }
            }
            break;
        
        // 사번 4자리 구성
        case "EMPNO":
            if (target !== '') {
                if (target.length < 4) {   
                    return false;
                } else {
                    isConfirmed = true;
                }
            }
            break;
        
        default:
            break;
    }

    console.log(`${typeStr} is confirmed`);
    return isConfirmed;
}

export default FNValidator;