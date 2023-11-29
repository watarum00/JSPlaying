//クリックしたら表裏が反転するJSコンポーネント
class ReverseCard extends HTMLElement {
    constructor() {
      super(); // HTMLElementのコンストラクタを呼び出す
      const shadow = this.attachShadow({mode: 'open'});
  
      //カードの内部構造
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
  
      const cardInner = document.createElement('div');
      cardInner.setAttribute('class', 'card-inner');
  
      const cardFront = document.createElement('div');
      cardFront.setAttribute('class', 'card-front');
      cardFront.innerHTML = '<slot name="front"></slot>'; //スロットを使って表面のコンテンツを挿入
  
      const cardBack = document.createElement('div');
      cardBack.setAttribute('class', 'card-back');
      cardBack.innerHTML = '<slot name="back"></slot>'; //スロットを使って裏面のコンテンツを挿入
  
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);
      shadow.appendChild(card);
  
      //クリックしたら反転
      card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
      });

      // スタイルを追加
    const style = document.createElement('style');
    style.textContent = `
      .card {
        width: 500px;
        height: 300px;
        perspective: 1000px;
        border-radius: 15px; /* 縁を丸くする */
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* 影を追加 */
        transition: box-shadow 0.3s; /* 影のトランジションを追加 */
        background-color: #f9f9f9; /* 背景色をわずかにオフホワイトに設定 */
        transform-style: preserve-3d;
        transition: transform 0.6s;
      }
      .card.is-flipped {
        transform: rotateY(180deg);
      }
      .card hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }
      .card-inner {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.6s;
      }
      .card-front, .card-back {
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
      }
      .card-front {
        /* 表面のスタイリング */
        background-color: #fff;
      }
      .card-back {
        /* 裏面のスタイリング */
        background-color: #eee;
        transform: rotateY(180deg);
      }
    `;

    // スタイルをシャドウDOMに追加
    shadow.appendChild(style);
    }
}
customElements.define('reverse-card', ReverseCard);