
jQuery(function ($) {
  
  // ページトップボタン
  var topBtn = $('.js-pagetop');
  topBtn.hide();

  // ページトップボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ページトップボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動。ヘッダーの高さ考慮。)
  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });

  // ハンバーガーメニュー展開時の背景固定
  $(function () {
  $(".p-hamburger-icon").click(function () {
    // トリガーをクリックした時の条件分岐
    if ($(this).hasClass("active")) {
      // ナビを閉じるときの処理
      $("body").removeClass("fixed"); // 背景固定解除！
    } else {
      // ナビを開くときの処理
      $("body").addClass("fixed"); // 背景固定！
    }
    $(".p-hamburger-icon, .p-gnavi").toggleClass("active");
  });
  });

  //menuやそれ以外をクリックするとハンバーガーメニューが閉じる仕組み
  //spのアコーディオンをクリックしたときだけメニューが閉じない仕様
  let $mainElement = $('#p-gnavi');
  let $accordion = $('#js-open'); // アコーディオンメニューのIDを取得

  // アコーディオンメニュー内のクリックイベントをバブリングさせない
  $accordion.on('click', function(e) {
  e.stopPropagation(); // イベントの伝播を停止
  $('.p-gnavi__item-span').toggleClass('flipped'); /* クラスをトグルで切り替え */
  // $(this)でクリックされた「.js-open」のみに反映
  // クリックした要素の次の要素を指定「js-open」→「question__reply」
  // .slideToggle()→スライドして表示 / 非表示切り替え
  $('.js-open').next().slideToggle();
  // toggleClassでopenがあれば外す。無ければつける。
  $('.js-open').toggleClass("open");
  });

  // ハンバーガーメニュー全体のクリックイベント
  $mainElement.on('click', function(e) {
  $(".p-gnavi").removeClass("active");
  $(".p-hamburger-icon").removeClass("active");
  $("body").removeClass("fixed");
  });

  $(window).on('load scroll', function () {
  $('.js-fadein').each(function(){
    var elemPos = $(this).offset().top,
    scroll = $(window).scrollTop(),
    windowHeight = $(window).height();

    if (scroll > elemPos - windowHeight + 150){
      $(this).addClass('js-scrollin');
    }
  });
  });

  $(window).on("scroll", function() {
      if ($(this).scrollTop() > 100) {
          $(".p-floating__menuInner").fadeIn(300);
          } else {
          $(".p-floating__menuInner").fadeOut(300);
      }
  });

  jQuery(function() {

    var footer = $('.l-footer').innerHeight(); // footerの高さを取得
    
    window.onscroll = function () {
      var point = window.pageYOffset; // 現在のスクロール地点 
      var docHeight = $(document).height(); // ドキュメントの高さ
      var dispHeight = $(window).height(); // 表示領域の高さ
    
      if(point > docHeight-dispHeight-footer){ // スクロール地点>ドキュメントの高さ-表示領域-footerの高さ
        $('.p-floating__menuInner').addClass('js-floating__hidden'); //footerより下にスクロールしたらis-hiddenを追加
      }else{
        $('.p-floating__menuInner').removeClass('js-floating__hidden'); //footerより上にスクロールしたらis-hiddenを削除
      }
    };
    });

  // Swiper設定
  const swiper01 = new Swiper(".p-dental-clinic-interior__swiper", {
  // Optional parameters
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  speed: 300,
  autoplay: { // 自動再生
    delay: 4500, // 1.5秒後に次のスライド
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 3.9,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  });

// 画面の幅に基づいて処理を制御
window.addEventListener("resize", function() {
  adjustLinkBehavior();
});

// 初期読み込み時に処理を設定
adjustLinkBehavior();

function adjustLinkBehavior() {
  const isPC = window.innerWidth >= 768;  // 768px以上ならPC、それ未満ならSP
  const accordionLinks = document.querySelectorAll('.js-open');

  accordionLinks.forEach(link => {
    // SPの場合
    if (!isPC) {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // リンク遷移を防ぐ

        const dropdown = this.nextElementSibling; // アコーディオンのリスト部分


      });
    } else {
      // PCの場合
      link.addEventListener('click', function() {
        const dropdown = this.nextElementSibling;

        // アコーディオンが開いていたら閉じる（ページ遷移は行う）
        if (dropdown.style.display === 'block') {
          dropdown.style.display = 'none';
        }
      });
    }
  });
}
});

