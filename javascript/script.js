"use strict";

/**
 * Portfolio Script
 * - Intersection Observerによるスクロールアニメーション
 * - ヒーローセクションのパララックス（視差）効果
 * - Bootstrap Offcanvas連動（MENU ⇔ CLOSE 切り替え）
 * - フォームバリデーション
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     1. スクロール監視アニメーション (Intersection Observer)
     =================================================== */
  const scrollOptions = {
    threshold: 0.15, // 要素の15%が見えたら発火
    rootMargin: "0px 0px -50px 0px"
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        // 画面外に出た時にアニメーションをリセットしたい場合は有効化
        // entry.target.classList.remove("active");
      }
    });
  }, scrollOptions);

  // 対象となるクラスを持つ要素をすべて監視
  const animElements = document.querySelectorAll(".scrollAnim, .scrollScale");
  animElements.forEach((el) => {
    scrollObserver.observe(el);
  });


  /* ===================================================
     2. ヒーローパララックス効果
     =================================================== */
  const heroContent = document.querySelector(".hero-content");
  
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (heroContent && scrollY < 800) {
      const speed = 0.3;
      heroContent.style.transform = `translateY(${scrollY * speed}px)`;
      heroContent.style.opacity = `${1 - scrollY / 600}`;
    }
  });


  /* ===================================================
     3. サイドメニュー (Offcanvas) 制御
     =================================================== */
  const offcanvasElement = document.getElementById('offcanvasMenu');
  const menuBtn = document.querySelector('.menu-btn');

  if (offcanvasElement && menuBtn) {
    // Bootstrapのイベントをリッスン
    // メニューが開く直前
    offcanvasElement.addEventListener('show.bs.offcanvas', () => {
      menuBtn.textContent = "CLOSE";
      menuBtn.classList.add("is-open");
    });

    // メニューが閉じる直前
    offcanvasElement.addEventListener('hide.bs.offcanvas', () => {
      menuBtn.textContent = "MENU";
      menuBtn.classList.remove("is-open");
    });

    // メニュー内のリンクをクリックした時に自動で閉じる
    const menuLinks = offcanvasElement.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        }
      });
    });
  }


  /* ===================================================
     4. お問い合わせフォーム バリデーション
     =================================================== */
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

});