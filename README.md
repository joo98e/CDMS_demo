# 2021.10.20 
> - 1차 점검일
> - 아래 사항이 모두 완료되어야함.
>   - [ ] 기관 등록 / 프로젝트 등록 기능
>   - [ ] 알림 기능
>   - [x] 기관 상세 라우트 설정 및 적용
>   - [ ] 프로젝트 상세 라우트 설정 및 적용
>   - [ ] 프로세스 등록 페이지
>   - [ ] 추가 정보 구성시 1개도 입력하지 않은 경우를 처리
>   - [ ] [번외] 기관, 프로젝트 썸네일 적용
>   - [ ] [번외] 로그인 아이디 정규식 바꾸기 ( 이메일, 이메일 앞자리 )
>   - [ ] [번외] Nav 아바타 적용 및 개인 버튼 추가

***
# 2021.10.10
### 프로세스 상세 페이지 #1
> - [ ] 프로세스 상세 페이지
>   - [ ] 프로세스 추가 페이지 생성 필요
>   - [ ] 차트 구성 필요
>   - [ ] 프로세스 추가하기 필요
> - [ ] 각 모든 추가 과정들에서 1개의 데이터도 불러오지 못한 경우 얼럿창과 함께 안내 문구 표시 기능
> - [ ] 스타일 버튼 컴포넌트화 / 전체 배포 필요

***
# 2021.10.06 ~ 2021.10.08
### 기관 리스트 및 기타
> - [ ] 기관 상세 페이지 작성
> - [ ] 어드민 권한에 따른 버튼 렌더링 및 기능 활성화
> - [x] Theme 보완
> - [x] Icon 커스텀화 및 export

***
# 2021.10.05
### 기관 리스트
> - [ ] ~~CardAction 클릭시 기관별 프로젝트 리스트 나타나도록 변경~~
>   - Detail 페이지로 변경
> - [x] Detail 페이지 내용 작성(진행중)(50%)(내용채워야함/보드만들고채울수있을것같음)
> - [x] 기관 추가시 사업 시작일, 종료일 설정 기능

***
# 2021.10.04
### 기관 리스트
> - [x] Redux - allow action에 따라 관리자 계정일 경우 모든 기관 리스트를 렌더링
> - [x] Redux - allow action에 따라 일반 사용자 계정일 경우 자신이 속한 리스트만 렌더링
> - [x] 속한 사람들의 아바타가 나타나도록 수정
> - [x] 기관 추가시 Object 타입 데이터 추가 기능

> - [x] MORE 클릭시 기관 정보 나타나도록 변경
> - [x] NODE 서버에서의 DATE와 윈도우의 DATE가 다름(노드에서는 한국 표준 시간이 아님)

> - [ ] node-cron / 자정마다 프로젝트 STATUS_TYPE 변경 크론 작성
> - [ ] 이메일 존재 여부 확인

### 권한별 allow Action 설정
> - [x] 추가한 컬럼을 이용하여 행동 여부 2차 체크 기능

### 컴포넌트권한에 따른 렌더링 여부 추가
> - [ ] Oh my! something that wasn't supposed to happen

***
# 2021.10.03

### 권한별 allow Action 설정
> - [x]] tb_auth 컬럼 추가
> - [ ] 추가한 컬럼을 이용하여 행동 여부 2차 체크 기능 

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
