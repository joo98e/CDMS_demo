

# 2021.10.03

### 권한별 allow Action 설정
> - [ ] tb_auth 컬럼 추가
> - [ ] 추가한 컬럼을 이용하여 행동 여부 2차 체크 기능 

### 컴포넌트권한에 따른 렌더링 여부 추가
> - [ ] 여부에 따라 각 컴포넌트에 Oh my! something that wasn't supposed to happen 등
> - [ ] -

### 로그인 처리 MyBatis로 이전
> - [x] XML 생성 및 셀렉트 생성
> - [x] 로그인 처리 수정 및 resultCode 분리

***
# 2021.10.02
### IsProd 리덕스에 올리기
> - [x] 리덕스에 isProd 올렸음
> - [x] 로그인 페이지에서 개발 환경 로그인 버튼 개발시에만 나오도록 변경
### REDUX, UI - isProd 프로미스 객체 처리
> - [x] 완료
### 젠킨스 확인
> - [x] 완료
### 회원가입 비밀번호 확인란
> - [x] 완료
### 회원가입 백엔드 MYBATIS 및 예외 처리 작업
> - [x] 완료

***
# 2021.09.29 
### 레지스터 폼 리모델링
> - [x] 회원가입 폼 변경
> - [x] 휴대폰 번호 (-와 상관 없이 정규식 적용)
> - [x] 프로필 등록 레이아웃 구성

### DRAWIO 디렉터리 구조 모델 추가
> - [x] 간략한 설명 및 1차 완료


***
# 2021.09.28
### _Taebok's BirthDay!_ :birthday:

### 권한 기능 구상 
> - 퍼블릭 라우트, 프라이빗 라우트  
> - 리덕스로 보관

### 회원가입
> - 정밀한 기능 작업 필요
> - 비밀번호 재확인란
> - 아이디 중복 체크 버튼 별도 이동 
> - 아이디 중복 체크 가시성 향상 필요
> - 번호 정규식 2가지 적용
>   - \- 없이도
>   - 번호만 써도 되도록

#### 폰트 가시성 향상 위해 아래와 같이 변경됨
> - (기존) GmarketSans
> - (현재) NanumGothic

***
# 2021.09.27
> - 기관 정보 수정
> - 리덕스 수정
> - 전체 폴더 디렉토리 변경(유지보수 및 개발 편리성 증진)

***
# 2021.09.25
> - <배포>
>   - Jenkins 적용
>   - 실배포 테스트 완료
> - <개발>
>   - 기관 등록 수정
>   - PersonRow.js 공통 컴포넌트 분리

***
# 2021.09.23
> - 기관 등록 페이지 작성중
> - 아이디 중복 체크 기능

***
# 2021.09.15
> - ~~TypeScript 적용 예정~~
>   - TypeScript는 라이브 러리 호환 문제로 다음 프로젝트시 적용하는 것으로..
> - ~~@types/Redux 적용 예정~~
> - ~~Yarn Berry 사용 예정~~
