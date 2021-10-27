function fnMail(_json) {
    console.log(_json);
    // mail -s"$(echo -e '제목정도\nContent-type: text/html')" -r"icemira@mirimmedialab.co.kr" "askjmyyyojqa@gmail.com"<<<"<a href = 'www.naver.com'>내용정도</a>
    // 여기까지 값 오는 것 확인됨
    const exec = require('child_process').exec;
    const strTransmit = 'mirimCDMS@cdms.mirimmedialab.co.kr';
    for(i = 0; i < _json.length; i++){
        const strShell = '$(echo -e "' + _json[i].subject + '\nContent-type: text/html")';
        exec('mail -s"' + strShell + '" -r"' + strTransmit + '" "' + _json[i].receiver + '"<<<"' + _json[i].content + '"', {windowsHide : true}, function(err, stdout, stderr){
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