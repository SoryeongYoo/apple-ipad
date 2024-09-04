/*장바구니*/
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function () {
  event.stopPropagation() //이벤트가 상위로 올라가지 않게 정지 시킴
  if (basketEl.classList.contains('show')) {
    hideBasket()
    //hide
  } else {
    showBasket()
    //show
  }
  //show라는 class가 있으면(contains 메소드) true 반환
})

basketEl.addEventListener('click', function (evnet) {
  event.stopPropagation()
})

//전체 화면에 적용 -> window
window.addEventListener('click', function () {
  hideBasket()
})

function showBasket() {
  basketEl.classList.add('show')
}

function hideBasket() {
  basketEl.classList.remove('show')
}

/*검색*/
const headerEl = document.querySelector('header')
//... 전개 연산자, 하나의 배열로 관리
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')] //모든 쿼리를 찾음
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

// 콜백 함수
searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  // documentElement: 문서의 최상위 요소를 의미
  document.documentElement.classList.add('fixed')
  /*reverse를 사용해 배열 반대로 애니메이션 적용*/
  headerMenuEls.reverse().forEach(function (el, index) {
    //style: css 처리/ index: el의 개수 만큼 증가
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  //.6s 뒤에 포커스가 되도록 설정
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)

}

function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    //style: css 처리/ index: el의 개수 만큼 증가
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  //배열을 다시 뒤집어 줌
  searchDelayEls.reverse()
  searchInputEl.value = '' //검색 내용 초기화
}