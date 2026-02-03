// =========================
// サイドメニュー制御
// =========================
$(function () {
  const $menuBtn = $(".menu-btn");
  const $sideMenu = $(".side-menu");
  const $overlay = $(".overlay");

  // メニューを開く
  $menuBtn.on("click", function () {
    $sideMenu.addClass("active");
    $overlay.addClass("active");
    $(this).hide();
  });

  // メニューを閉じる（オーバーレイ or CLOSE）
  $(".menu-close, .overlay").on("click", function () {
    $sideMenu.removeClass("active");
    $overlay.removeClass("active");
    $menuBtn.show();
  });
});


// =========================
// スクロールアニメーション
// =========================
$(window).on("scroll load", function () {
  $(".scrollAnim").each(function () {
    const elemPos = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();

    if (scroll > elemPos - windowHeight + 100) {
      $(this).addClass("active");
    }
  });
});


// =========================
// タイピング風アニメーション開始制御
// =========================
$(window).on("load", function () {
  $(".typing").each(function () {
    const textWidth = $(this)[0].scrollWidth;
    $(this).css("width", textWidth + "px");
  });
});