const mediaQuery = window.matchMedia("(max-width: 768px)");
const body = document.body;
const header = document.querySelector(".js-header");
const tl = gsap.timeline();

// resizeReload
const resizeReload = () => {
    location.reload();
  }

mediaQuery.addEventListener("change", resizeReload);

// smoothScroll
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // デフォルトの動作を無効化

        const targetId = this.getAttribute('href').substring(1); // 例: "#section1" → "section1"
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop ,
                behavior: 'smooth' // スムーズなスクロール
            });
        }
    });
});

// hamburgerMenu
const hamburger = () => {
    const hamburgerButton = document.querySelector(".js-nav-button");
    const hamburgerLink = document.querySelectorAll(".js-nav-link");
  
    hamburgerButton.addEventListener("click", () => {
      body.classList.toggle("is-open");
    });
  
    for(let i = 0; i < hamburgerLink.length; i++) {
      hamburgerLink[i].addEventListener("click", () => {
        body.classList.remove("is-open");
      });
    }
  
    header.addEventListener("transitionrun", () => {
      hamburgerButton.style.pointerEvents = "none";
    });
  
    header.addEventListener("transitionend", () => {
      hamburgerButton.style.pointerEvents = "auto";
    });
}


// splitText
const splitText = () => {
    const target = document.querySelectorAll(".js-split-target");
    
    for (let i = 0; i < target.length; i++) {
      const node = target[i].childNodes;
      const newText = [];
  
      for (let i = 0; i < node.length; i++) {
        if (node[i].nodeType === 3) {
          const text = node[i].textContent;
          const targetChar = text.split("").map(char => char === " " ? "&nbsp;" : char);
  
          for (let i = 0; i < targetChar.length; i++) {
            newText.push(
              `<span class="split-text__wrapper"><span aria-hidden="true" style="display:inline-block; --char-index:${i}" class="letter js-letter">${targetChar[i]}</span></span>`
            );
          };
        } else {
          newText.push(node[i].outerHTML);
        }
      };
  
      target[i].innerHTML = newText.join("");
    };

    const visuallyHidden = () => {
        for(let i = 0; i < target.length; i++) {
          const visuallyHidden = document.createElement("span");
    
          visuallyHidden.innerHTML = target[i].textContent;
          visuallyHidden.classList.add("visually-hidden");
          target[i].appendChild(visuallyHidden);
        }
      }
    
      visuallyHidden();
  };
  
// intersectionObserver

const visible = () => {
    let ROOT_MARGIN_VALUE = mediaQuery.matches ? "0px 0px -10%" : "0px 0px 0px 0px";

    const options = {
        rootMargin: ROOT_MARGIN_VALUE,
        threshold: 0.1  // 10% 画面内に入ったら発火
    };

    const targetVisible = document.querySelectorAll(".js-observe-target");
    const targetVisibleModifier = "is-show";

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(targetVisibleModifier);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    targetVisible.forEach(target => observer.observe(target));
};

// 初回実行
document.addEventListener("DOMContentLoaded", visible);
mediaQuery.addEventListener("change", visible);



  // loadingAnimation
const loadingAnimation = () => {
  const fixedBackground = () => {
    body.classList.add("is-fixed");
  }

  const fvAnimation = () => {
    const mainvisual = document.querySelector(".js-mainvisual");
    
      const mvAnimation = () => {
        const resetStyle = () => {
          header.style.transform = "";
          header.style.pointerEvents = "auto";
        }

        if (window.innerWidth <= 768) {
          gsap.set(".js-mv-line-top", {
              width: "0%"
          })
          gsap.set(".js-mv-line-bottom", {
              width: "0%"
            })
          gsap.set([".js-mv-split-text .js-letter"], {
              autoAlpha: 0,
              yPercent: 100
          })
          gsap.set(".mainvisual__line img", {
              opacity: 0
          })
          gsap.set(".js-header", {
            autoAlpha: 0,
            y: -50,
            pointerEvents: "none"
          })
          tl.to(".js-mv-line-top", {
              width: "80%", 
              duration: 1.5, 
              ease: "power2.out", 
          })
          .to(".js-mv-line-bottom", {
              width: "80%", 
              duration: 1.5, 
              ease: "power2.out", 
          },"<")
          .to(".js-mv-split-text .js-letter", {
              autoAlpha: 1,
              yPercent: 0,
              duration: 1.2,
              stagger: 0.03,
              ease: "power4.out"
          })
          .to(".mainvisual__line img", {
              opacity: 1,
              duration: .25,
              ease: "power2.out",
          })
          .to(".js-header", {
            y: 0,
            autoAlpha: 1,
            duration: 1.4,
            ease: "power4.out",
            onComplete: resetStyle
          }, "<")
      } else{
          gsap.set(".js-mv-line-top", {
              width: "0%"
          })
          gsap.set(".js-mv-line-bottom", {
              width: "0%"
          })
          gsap.set([".js-mv-split-text .js-letter"], {
              autoAlpha: 0,
              yPercent: 100
          })
          gsap.set(".mainvisual__line img", {
              opacity: 0
          })
          gsap.set(".js-header", {
            autoAlpha: 0,
            y: -50,
            pointerEvents: "none"
          })
          tl.to(".js-mv-line-top", {
              width: "60%", 
              duration: 1.5, 
              ease: "power2.out", 
          })
          .to(".js-mv-line-bottom", {
              width: "40%", 
              duration: 1.5, 
              ease: "power2.out", 
          },"<")
          .to(".js-mv-split-text .js-letter", {
              autoAlpha: 1,
              yPercent: 0,
              duration: 1.2,
              stagger: 0.03,
              ease: "power4.out"
          })
          .to(".mainvisual__line img", {
              opacity: 1,
              duration: .25,
              ease: "power2.out",
          })
          .to(".js-header", {
            y: 0,
            autoAlpha: 1,
            duration: 1.4,
            ease: "power4.out",
            onComplete: resetStyle
          }, "<")
      }
      }

      mvAnimation();
  }

  const firstAnimation = () => {
    sessionStorage.setItem("finished", true);

    const unfixedBackground = () => {
      body.classList.remove("is-fixed");
    }

    gsap.set(".js-loading-logo01", {
      autoAlpha: 0
    })

    tl.to(".js-loading-logo01", {
      display: "block",
      autoAlpha: 1,
      duration: 0.4,
      ease: "none",
      delay: 0.5
    })
      .to(".js-loading-logo01", {
        display: "block",
        duration: 0.2,
        ease: "none"
    })
      .to(".js-loading-logo01", {
        display: "none",
        duration: 0.2,
        ease: "none"
    })
      .to(".js-loading-logo02", {
        display: "block",
        duration: 0.2,
        ease: "none"
    }, "<")
      .to(".js-loading-logo02", {
        display: "none",
        duration: 0.2,
        ease: "none"
    })
      .to(".js-loading-logo03", {
        display: "block",
        duration: 0.2,
        ease: "none"
    }, "<")
      .to(".js-loading-logo03", {
        display: "none",
        duration: 0.2,
        ease: "none"
    })
      .to(".js-loading-logo04", {
        display: "block",
        duration: 0.2,
        ease: "none"
    }, "<")
      .to(".js-loading", {
        yPercent: "-100",
        duration: 0.8,
        ease: "power4.inOut"
    }, "+=0.2")
      .to(".js-loading-wrapper", {
        autoAlpha: 0,
        duration: 0.2,
        onComplete: unfixedBackground, fvAnimation, visible
    }, "<")
  };

  const destroy = () => {
    gsap.to(".js-loading", {
      autoAlpha: 0,
      duration: 1.0,
      ease: "ease"
    })
  }

  window.addEventListener("load", () => {
    if (sessionStorage.getItem("finished")) {
      destroy();
      fvAnimation();
      visible();
    } else {
      fixedBackground();
      firstAnimation();
    }
  });
}

  hamburger();

  document.addEventListener("DOMContentLoaded", () => {
    setUpAccordion();
  });
  
  /**
   * ライブラリ(GSAP)を使ってアコーディオンのアニメーションを制御します
   */
  const setUpAccordion = () => {
    const details = document.querySelectorAll(".js-details");
    const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名
  
    details.forEach((element) => {
      const summary = element.querySelector(".js-summary");
      const content = element.querySelector(".js-content");
  
      summary.addEventListener("click", (event) => {
        // デフォルトの挙動を無効化
        event.preventDefault();
  
        // is-openedクラスの有無で判定（detailsのopen属性の判定だと、アニメーション完了を待つ必要がありタイミング的に不安定になるため）
        if (element.classList.contains(IS_OPENED_CLASS)) {
          // アコーディオンを閉じるときの処理
          // アイコン操作用クラスを切り替える(クラスを取り除く)
          element.classList.toggle(IS_OPENED_CLASS);
  
          // アニメーション実行
          closingAnim(content, element).restart();
        } else {
          // アコーディオンを開くときの処理
          // アイコン操作用クラスを切り替える(クラスを付与)
          element.classList.toggle(IS_OPENED_CLASS);
  
          // open属性を付与
          element.setAttribute("open", "true");
  
          // アニメーション実行
          openingAnim(content).restart();
        }
      });
    });
  }
  
  /**
   * アコーディオンを閉じる時のアニメーション
   */
  const closingAnim = (content, element) => gsap.to(content, {
    height: 0,
    opacity: 0,
    duration: 0.4,
    ease: "power3.out",
    overwrite: true,
    onComplete: () => {
      // アニメーションの完了後にopen属性を取り除く
      element.removeAttribute("open");
    },
  });
  
  /**
   * アコーディオンを開く時のアニメーション
   */
  const openingAnim = (content) => gsap.fromTo(
    content,
    {
      height: 0,
      opacity: 0,
    },
    {
      height: "auto",
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });


    splitText();
    loadingAnimation();