/**
 * 
 * @param {data} History.location.pathname
 */
import API from "../API"

const getPathGuider = data => {
    const _target = data.replace(/[0-9]/gi, "");

    let value = String;
    switch (_target) {

        case '/common/release':
            value = "릴리즈 직전 테스팅용 라우트";
            break;

        case '/agency/add':
            value = "기관 등록";
            break;

        case '/agency':
            value = "기관 및 사업 리스트";
            break;

        case '/agency/detail/':
            value = "과정 리스트"
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
            value = "프로젝트 등록";
            break;

        case '/agency/project/notice/':
            value = "프로젝트 공지사항";
            break;

        // ────────────────────────────────────────────────────

        case '/agency/project/detail/process/add/':
            value = "프로세스 등록";
            break;

        case '/agency/project/process/detail/':
            value = "프로세스 상세";
            break;

        case '/05':
            value = "설정";
            break;


        case '/06':
            value = "설정";
            break;

        default:
            value = "유효하지 않은 경로"
            break;
    }

    return value;
}

export default getPathGuider;