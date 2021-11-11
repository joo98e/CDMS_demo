const e = require('express');
const fnDate = require('../func/getNow');
function fnMail() {
    // mail -s"$(echo -e '제목정도\nContent-type: text/html')" -r"icemira@mirimmedialab.co.kr" "askjmyyyojqa@gmail.com"<<<"<a href = 'www.naver.com'>내용정도</a>"
    // -s : 메일 제목
    // -r : 발신자 주소
    // -c : 참조 목록
    // -b : 숨은 참조
    // -a : 참조 파일
    let arrMailInfomation = [
        {
            transmitter : "mirimCDMS",                          //	보내는 사람 메일주소. 공백이면 기본값 [mirimCDMS]로 변환
            name : "알림메일",                                   //	보내는사람 메일주소 앞대가리에 붙는 이름
            receiver : "jtbeok@gmail.com",                      //	받는사람 메일주소
            reference : [				                        //	참조 목록. 공백이면 보내지 않음.

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
        },
    ]

    let _json = arrMailInfomation;

    const exec = require('child_process').exec;
    const strTransmitterDefault = 'mirimCDMS';
    const strDomain = 'cdms.mirimmedialab.co.kr';
    const strSecretDefault = 'askjmyyyojqa@gmail.com';
    const strStyle =              "<style>"
                                +   "#warp {"
                                +       "width : 100%;"
                                +       "height : 100%;"
                                +       "border : solid 1px black;"
                                +       "font-size : 22px;"
                                +   "}"
                                +   "#warp > .content {"
                                +       "display : block;"
                                +   "}"
                                + "</stlye>";
    let numCheckCount = 1;
    for(i = 0; i < _json.length; i++){
        const numLength = _json.length;
        const numCount = (i + 1);
        const strTopText =        "<div id = 'wrap' style = 'position : relative; display : block; border : solid 2px black; font-size : 22px;'>"
                                +   "<span class = 'content' style = 'display : block; margin : 20px;'>안녕하세요. <b>미림미디어랩 CDMS</b> 입니다.</span>"
                                +   "<span class = 'content' style = 'display : block; margin : 20px;'>" + _json[i].sender + "님이 새로운 게시판을 작성하였습니다.</span>"
                                +   "<span class = 'content' style = 'display : block; margin : 20px;'>지금 바로 확인하시려면 <a href = '" + _json[i].url + "'>여기</a>를 눌러주세요.</span>";

        const strMiddleText = _json[i].content == undefined || _json[i].content == "" ? "<span class = 'content' style = 'display : block; margin : 20px;></span>" : "<span class = 'content' style = 'display : block; margin : 20px;></span><span class = 'content' style = 'display : block; margin : 20px;'>다음은 " + _json[i].sender + "님이 보내는 메세지 입니다.</span><span class = 'content' style = 'display : block; margin : 20px; border-bottom : solid 2px black;'></span><span class = 'content' style = 'display : block; margin : 20px;'>" + _json[i].content + "</span><span class = 'content' style = 'display : block; margin : 20px; border-bottom : solid 2px black;'></span>";

        const strBottomText =       "<span class = 'content' style = 'display : block; margin : 20px;'>확인 부탁드리겠습니다.</span>"
                                +   "<span class = 'content' style = 'display : block; margin : 20px;'>오늘도 좋은 하루 되세요.</span>"
                                +   "<span class = 'content' style = 'display : block; margin : 20px;'>감사합니다.</span>"
                                + "</div>";
        const strTransmitter = _json[i].transmitter == undefined || _json[i].transmitter == '' ? strTransmitterDefault : _json[i].transmitter;
        const strName = _json[i].name == undefined || _json[i].name == '' ? "알림메일" : _json[i].name;
        const strReceiver = _json[i].receiver;
        let strReference = '';
        let strSecret = '-b"' + strSecretDefault + '" ';
        let strAttach = '';
        // const strSubject = '$(echo -e "' + _json[i].subject + '\nMIME-Version: 1.0;Content-Type: multipart/mixed; boundary=border;")';
        const strSubject = '$(echo -e "' + _json[i].subject + '\nContent-Type: text/html")';
        const strSender = _json[i].sender;

        if(_json[i].reference != undefined && _json[i].reference.length != 0 && _json[i].reference != ""){
            for(a = 0; a < _json[i].reference.length; a++){
                strReference += '-c"' + _json[i].reference[a] + '" ';
            }
        }
        if(_json[i].secret != undefined && _json[i].secret.length != 0 && _json[i].secret != ""){
            for(b = 0; b < _json[i].secret.length; b++){
                strSecret += '-b"' + _json[i].secret[b] + '" ';
            }
        }
        if(_json[i].attach != undefined && _json[i].attach.length != 0 && _json[i].attach != ""){
            for(c = 0; c < _json[i].attach.length; c++){
                strAttach += '-a"' + _json[i].attach[c] + '" ';
            }
        }
        exec('mail -s"' + strSubject + '" ' + strReference + strSecret + strAttach + '-r"' + strName + '<' + strTransmitter + '@' + strDomain + '>" "' + strReceiver + '"<<<"' + strTopText + strMiddleText + strBottomText + '"', {windowsHide : true}, function(err, stdout, stderr){
            if(err){
                console.log(numLength == 1 ? '*****************************************************************************************************\n총 ' + numLength + '개 중 ' + numCount + '번째 메일 발송에서 오류가 발생했습니다. 보내는 사람 : ' + strSender + ', 받는 사람 : ' + strReceiver + '\n*****************************************************************************************************' : numCheckCount == 1 ? '*****************************************************************************************************\n총 ' + numLength + '개 중 ' + numCount + '번째 메일 발송에서 오류가 발생했습니다. 보내는 사람 : ' + strSender + ', 받는 사람 : ' + strReceiver : numCheckCount == numLength ? '총 ' + numLength + '개 중 ' + numCount + '번째 메일 발송에서 오류가 발생했습니다. 보내는 사람 : ' + strSender + ', 받는 사람 : ' + strReceiver + '\n*****************************************************************************************************' : '총 ' + numLength + '개 중 ' + numCount + '번째 메일 발송에서 오류가 발생했습니다. 보내는 사람 : ' + strSender + ', 받는 사람 : ' + strReceiver);
            }
            if(stdout){
                console.log(numLength == 1 ? '*****************************************************************************************************\n총 ' + numLength + '개 중 ' + numCount + '번째 메일 발송이 완료되었습니다. 보내는 사람 : ' + strSender + ', 받는 사람 : ' + strReceiver + '\n*****************************************************************************************************' : numCheckCount == 1 ? '*****************************************************************************************************\n총 ' + numLength + '개 중 ' + numCount + '번째 메일 발송이 완료되었습니다. 보내는 사람 : ' + strSender + ', 받는 사람 : ' + strReceiver : numCheckCount == numLength ? '총 ' + numLength + '개 중 ' + numCount + '번째 메일 발송이 완료되었습니다. 보내는 사람 : ' + strSender + ', 받는 사람 : ' + strReceiver + '\n*****************************************************************************************************' : '총 ' + numLength + '개 중 ' + numCount + '번째 메일 발송이 완료되었습니다. 보내는 사람 : ' + strSender + ', 받는 사람 : ' + strReceiver);
            }
            numCheckCount++;
        });
    }
}
module.exports = fnMail;