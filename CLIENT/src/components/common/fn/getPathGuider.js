/**
 * 
 * @param {data} History.location.pathname
 */

const landingGreeting = () => {
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

const getPathGuider = data => {
    const _target = data.replace(/[0-9]/gi, "");

    let value = String;
    switch (_target) {
        case '/landing':
            value = landingGreeting();
            break;
        
        // ────────────────────────────────────────────────────
        case '/agency':
            value = "기관 리스트";
            break;
        
        case '/agency/add':
            value = "새 기관 등록";
            break;

        case '/agency/detail/':
            value = "기관 상세";
            break;

        case '/agency/detail/notice/':
            value = "기관 공지사항";
            break;
        // ────────────────────────────────────────────────────

        case '/agency/project/':
            value = "프로젝트";
            break;

        case '/agency/project/detail/':
            value = "프로젝트 상세";
            break;
        
        case '/agency/project/add/':
            value = "새 프로젝트 등록";
            break;
        
        case '/agency/project/notice/':
            value = "프로젝트 공지사항";
            break;
        
        // ────────────────────────────────────────────────────

        case '/agency/project/detail/process/add/':
            value = "새 프로세스 등록";
            break;

        case '/03':
            value = "설정";
            break;

        case '/04':
            value = "설정";
            break;

        case '/05':
            value = "설정";
            break;


        case '/06':
            value = "설정";
            break;

        case '/07':
            value = "설정";
            break;

        case '/08':
            value = "설정";
            break;

        case '/09':
            value = "설정";
            break;

        case '/10':
            value = "설정";
            break;

        case '/11':
            value = "설정";
            break;

        case '/12':
            value = "설정";
            break;

        case '/13':
            value = "설정";
            break;

        case '/14':
            value = "설정";
            break;

        case '/15':
            value = "설정";
            break;

        case '/16':
            value = "설정";
            break;

        case '/17':
            value = "설정";
            break;

        case '/18':
            value = "설정";
            break;

        case '/19':
            value = "설정";
            break;

        case '/20':
            value = "설정";
            break;

        case '/21':
            value = "설정";
            break;

        case '/22':
            value = "설정";
            break;

        case '/23':
            value = "설정";
            break;

        case '/24':
            value = "설정";
            break;

        case '/25':
            value = "설정";
            break;

        case '/26':
            value = "설정";
            break;

        case '/27':
            value = "설정";
            break;

        case '/28':
            value = "설정";
            break;

        case '/29':
            value = "설정";
            break;

        case '/30':
            value = "설정";
            break;

        case '/31':
            value = "설정";
            break;

        case '/32':
            value = "설정";
            break;

        case '/33':
            value = "설정";
            break;

        case '/34':
            value = "설정";
            break;

        case '/35':
            value = "설정";
            break;

        case '/36':
            value = "설정";
            break;

        case '/37':
            value = "설정";
            break;

        case '/38':
            value = "설정";
            break;

        case '/39':
            value = "설정";
            break;

        case '/40':
            value = "설정";
            break;

        case '/41':
            value = "설정";
            break;

        case '/42':
            value = "설정";
            break;

        case '/43':
            value = "설정";
            break;

        case '/44':
            value = "설정";
            break;

        case '/45':
            value = "설정";
            break;

        case '/46':
            value = "설정";
            break;

        case '/47':
            value = "설정";
            break;

        case '/48':
            value = "설정";
            break;

        case '/49':
            value = "설정";
            break;

        case '/50':
            value = "설정";
            break;



        default:
            value = "찾을 수 없음"
            break;
    }

    return value;
}

export default getPathGuider;