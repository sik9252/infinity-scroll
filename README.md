## 프로젝트의 목적

1. 무한 스크롤 구현 연습

2. Next.js 맛보기

## 아직 미구현 된 부분

각 포켓몬 카드를 클릭해 상세 정보에 들어갔다 메인 페이지로 돌아오면 이전 스크롤 위치가 유지되지 않음.

localStorage에 scrollY를 저장했다가 돌아오는 방식을 사용하려고 했는데 어째서인지 window.scrollTo(x, y)기 작동하지 않음.

개발자 도구의 console 창에 직접 입력해보면 이동하는데 코드 상에서는 작동하지 않음.

이유를 찾고 있는 중

<br>

**시작하는 법**

> npm run dev
