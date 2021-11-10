const e = require('express');
const fnDate = require('../func/getNow');
function fnMail() {
    // mail -s"$(echo -e '제목정도\nContent-type: text/html')" -r"icemira@mirimmedialab.co.kr" "askjmyyyojqa@gmail.com"<<<"<a href = 'www.naver.com'>내용정도</a>"
    // -s : 메일 제목
    // -r : 발신자 주소
    // -c : 참조 목록
    // -b : 숨은 참조
    // -a : 참조 파일

    // 메일 테스트 이력
    // const strSubject = _json[i].subject + '$(echo -e \nContent-Type: text/html)' -> 실패. 결과 : [CDMS] 알림메일 입니다.-cqvud00@gmail.com
    // \nContent-Type: text/plain -> 실패. 당연히 안됨.
    // \nContent-Type: text/html -> 실패. 쉘스크립트로 바로 보내주거나 보낸사람에 이름을 지정하지 않고 보내는거면 성공함.
    // \nMIME-Version: 1.0; -> 실패.
    // \nMIME-Version: 1.0;Content-Type: multipart/alternative') -> 실패.
    // \nMIME-Version: 1.0;Content-Type: multipart/related') -> 실패.
    let arrMailInfomation = [
        {
            transmitter : "mirimCDMS",                          //	보내는 사람 메일주소. 공백이면 기본값 [mirimCDMS]로 변환
            name : "알림메일",                                   //	보내는사람 메일주소 앞대가리에 붙는 이름
            receiver : "jtbeok@gmail.com",                      //	받는사람 메일주소
            reference : [				                        //	참조 목록. 공백이면 보내지 않음.
                "qvud00@gmail.com",
            ],
            secret : [					                        //	숨은 참조 목록. 공백이면 기본값 [strSecretDefault]로만 보냄.
                // "askjmyyyojqa@gmail.com"	
            ],
            attach : [					                        //	첨부파일 경로. 공백이면 첨부하지 않음.
                // "/raid/cdms/avatars/items/default/01.jpg",
                // "/raid/cdms/avatars/items/default/02.jpg",
            ],
            subject : "[CDMS] 알림메일 입니다.",		         //	메일 제목
            url : "www.naver.com",	                            //	게시판 url주소.
            sender : "유선재",				                    // 알림메일을 보내는 사람.
            content : "안녕하세요. 저는 ~~ 입니다...",	         //	메일을 보내는 사람이 적은 본문추가내용. 공백이면 기본내용만 전달.
        }   
    ]

    let _json = arrMailInfomation;

    const exec = require('child_process').exec;
    const strTransmitterDefault = 'mirimCDMS';
    const strDomain = 'cdms.mirimmedialab.co.kr';
    const strSecretDefault = 'askjmyyyojqa@gmail.com';
    for(i = 0; i < _json.length; i++){
        const strTopText =        "--frontier"
                                + "<div>"
                                + "<span>안녕하세요. <b>미림미디어랩 CDMS</b> 입니다.</span>"
                                + "<span>" + _json[i].sender + "님이 새로운 게시판을 작성하였습니다.</span>"
                                + "<span>지금 바로 확인하시려면 <a href = '" + _json[i].url + "'>여기</a>를 눌러주세요.</span>";

        const strMiddleText = _json[i].content == undefined || _json[i].content == "" ? "" : "<span>다음은 " + _json[i].sender + "님이 보내는 메세지 입니다.</span><span>" + _json[i].content + "</span>";

        const strBottomText =     "<span>확인 부탁드리겠습니다.</span>"
                                + "<span>오늘도 좋은 하루 되세요.</span>"
                                + "<span>감사합니다.</span>"
                                + "</div>";
                                + "--frontier--";

        const strTransmitter = _json[i].transmitter == undefined || _json[i].transmitter == '' ? strTransmitterDefault : _json[i].transmitter;
        const strName = _json[i].name == undefined || _json[i].name == '' ? "알림메일" : _json[i].name;
        const strReceiver = _json[i].receiver;
        let strReference = '';
        let strSecret = '-b"' + strSecretDefault + '" ';
        let strAttach = '';
        // const strSubject = _json[i].subject + '$(echo -e \nContent-Type: text/html)'
        const strSubject = "$(echo -e '" + _json[i].subject + "\nMIME-Version: 1.0\nContent-Type: multipart/related; boundary=frontier')";

        if(_json[i].reference != undefined && _json[i].reference.length != 0){
            for(a = 0; a < _json[i].reference.length; a++){
                strReference += '-c"' + _json[i].reference[a] + '" ';
            }
        }
        if(_json[i].secret != undefined && _json[i].secret.length != 0){
            for(b = 0; b < _json[i].secret.length; b++){
                strSecret += '-b"' + _json[i].secret[b] + '" ';
            }
        }
        if(_json[i].attach != undefined && _json[i].attach.length != 0){
            for(c = 0; c < _json[i].attach.length; c++){
                strAttach += '-a"' + _json[i].attach[c] + '" ';
            }
        }
        exec('mail -s"' + strSubject + '"' + strReference + strSecret + strAttach + '-r"' + strName + '<' + strTransmitter + '@' + strDomain + '>" "' + strReceiver + '"<<<"' + strTopText + strMiddleText + strBottomText + '"', {windowsHide : true}, function(err, stdout, stderr){
            if(err){
                console.log(i + '번째 메일 발송 중 오류가 발생했습니다.')
            }
            if(stdout){
                console.log(i + '번째 메일 발송이 완료되었습니다.')
            }
        });
    }
}

module.exports = fnMail;