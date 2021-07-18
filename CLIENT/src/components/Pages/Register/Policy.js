import { Container, Box, Typography, Divider } from '@material-ui/core'
import React from 'react'

export default function Policy() {
    return (
        <Box display="block">
            <Box mt={4} mb={4}>
                <Typography variant="h5" align='center'>
                    이용약관
                </Typography>
            </Box>
            <Divider />

            <Container>
                <Box mt={4} mb={4}>
                    <Typography variant="h6">제 1조 [목적]
                    </Typography>
                </Box>
                <Box mb={4}>
                    <Typography>본 약관은 코드비가 웹사이트(codeb.co.kr)를 통하여 제공하는 교육정보서비스(이하 “서비스”라 합니다)의 이용과 관련하여 코드비와 회원 사이에 권리ㆍ의무 및 책임사항 등을 규정함을 목적으로 합니다.<br />
                    </Typography>
                </Box>
            </Container>

            <Divider />

            <Container>
                <Box mt={4} mb={4}>
                    <Typography variant="h6">
                        제 2조 [정의]
                    </Typography>
                </Box>
                <Box mb={4}>
                    <Typography>
                        ①본 약관에서 사용하는 용어의 정의는 다음과 같습니다.<br />
                        1.이용자 : 코드비의 웹사이트에 접속하여 본 약관에 따라 코드비가 제공하는 교육 콘텐츠 및 제반서비스를 이용하는 회원 및 비회원<br />
                        2.회원 : 코드비의 웹사이트에 접속하여 본 약관에 동의함으로써 코드비와 이용계약을 체결하고 아이디(ID)를 부여받은 자로서 코드비가 제공하는 정보와 서비스를 지속적으로 이용할 수 있는 자<br />
                        3.콘텐츠 : 코드비가 제작하여 웹사이트에서 제공 및 판매하는 온라인 강좌 및 기타 관련정보를 의미하며, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제2조제1항제1호의 규정에 의한 정보통신망에서 사용되는 부호ㆍ문자ㆍ음성ㆍ음향ㆍ이미지 또는 영상 등으로 표현된 자료 또는 정보<br />
                        4.아이디(ID) : 회원의 식별 및 서비스 이용을 위하여 회원이 정하고 코드비가 승인하는 문자 또는 숫자의 조합을 말합니다.<br />
                        5.비밀번호(PASSWORD) : 서비스 이용 시, 아이디와 일치되는 회원임을 확인하고 회원 개인정보 보호를 위하여 회원 자신이 정한 문자 또는 숫자의 조합<br />
                        6.전자우편(Email) : 인터넷을 통한 우편 혹은 전기적 매체를 이용한 우편을 말합니다.<br />
                        7.운영자(관리자) : 서비스의 전반적인 관리와 원활한 운영을 위하여 코드비에서 선정한 사람 또는 코드비<br />
                        8.탈퇴: 회원이 이용계약을 종료하는 행위<br />
                        ②제1항 각 호에 해당하는 정의 이외의 기타 용어의 정의에 대하여는 거래 관행 및 관계 법령에 따릅니다.<br />
                        제 3조 [코드비 정보 등의 제공]<br />
                        코드비는 상호, 대표자 성명, 주소, 전화번호(소비자의 불만을 처리하는 곳의 연락처 포함), FAX번호, 전자우편주소, 사업자등록번호, 통신판매업 신고번호 및 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 온라인 서비스 초기화면에 게시합니다.<br />
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}
