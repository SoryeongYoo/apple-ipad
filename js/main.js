import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'
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
searchCloserEl.addEventListener('click', function(event){
  // 이벤트 버블링(상위요소로 전파) 현상을 막아줌
  event.stopPropagation()
  hideSearch()
})
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  // documentElement: 문서의 최상위 요소를 의미
  stopScroll()
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
  playScroll()
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

function playScroll(){
  document.documentElement.classList.remove('fixed')
}

function stopScroll(){
  document.documentElement.classList.add('fixed')
}


// 헤더 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function () {
  if (headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing')
    searchInputEl.value = ''
    playScroll()
  }else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})

// 헤더 검색
const searchTextFieldEl=document.querySelector('header .textfield')
const searchCancelEl= document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', function(){
  headerEl.classList.add('searching--mobile')
  searchInputEl.focus()
})
searchCancelEl.addEventListener('click', function(){
  headerEl.classList.remove('searching--mobile')
})

//화면 크기가 조정이 되면.
window.addEventListener('resize', function(){
  if(window.innerWidth <=740){
    headerEl.classList.remove('searching')
  }else{
    headerEl.classList.remove('searching--mobile')
  }
})


//
const navEl= document.querySelector('nav')
const navMenuToggleEl=navEl.querySelector('.menu-toggler')
const navMenuShadowEl=navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function(){
  if(navEl.classList.contains('menuing')){
    hideNavMenu()
  }else{
    showNavMenu()
  }
})
navEl.addEventListener('click',function(event){
  event.stopPropagation()
})
navMenuShadowEl.addEventListener('click',hideNavMenu)
window.addEventListener('click',hideNavMenu)


function showNavMenu(){
  navEl.classList.add('menuing')
}
function hideNavMenu(){
  navEl.classList.remove('menuing')
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})


// 비디오 재생
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

//클릭하면 재생 or 일시정지
playBtn.addEventListener('click', function () {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function () {
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})


// '당신에게 맞는 iPad는?' 랜더링
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList=''
  ipad.colors.forEach(function(color){
    colorList+=`<li style="background-color:${color};"></li>`
  })

  itemEl.innerHTML= /*html*/ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">￦${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `
    

  itemsEl.append(itemEl) //만들어진 itemEl를 itemsEl 배열에 넣어줌
})


const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl=document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map) {
    mapList +=/* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */`
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `
  
  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear() //현재 연도를 text 내용으로 입력