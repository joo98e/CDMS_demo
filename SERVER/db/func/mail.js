function fnMail(_Tx, _Rx, _Subject, _Content) {
    console.log(_Tx);
    console.log(_Rx);
    console.log(_Subject);
    console.log(_Content);
    // 여기까지 값 오는 것 확인됨

    const exec = require('child_process').exec;
    const strShell = "$(echo -e '" + _Subject + "\nContent-type: text/html')";
    exec('mail -s"' + strShell + '" -r"' + _Tx + '" "' + _Rx + '"<<<"' + _Content + '"', {windowsHide : true}, function(err, stdout, stderr){
        if(err){
            console.log('메일 발송 중 오류가 발생했습니다.')
        }
        if(stdout){
            console.log('메일 발송이 완료되었습니다.')
        }
    });
}

module.exports = fnMail;