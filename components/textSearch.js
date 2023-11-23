//文字列を入れたら一致するものがプルダウンリストで表示されるコンポーネント
//サンプルとして英単語を検索するように
import english_words from "./data/sample_words.js";

class TextSearch extends HTMLElement{

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .dropdown {
                    position: relative;
                    display: inline-block;
                }
                .dropdown input[type="text"] {
                    width: 300px;
                    height: 40px;
                    font-size: 20px;
                    padding: 4px;
                    text-align: center;
                }
                .dropdown-content {
                    display: none;
                    position: absolute;
                    left: 50%; /* 左端を入力欄の中央に設定 */
                    transform: translateX(-50%); /* X軸方向に-50%移動して中央揃え */
                    background-color: #f9f9f9;
                    min-width: 300px;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    z-index: 1;
                    text-align: left;
                    max-height: 500px; /* 最大の高さを500pxに */
                    overflow-y: auto; /* 縦方向のスクロールバーを設定 */
                }
                .dropdown-content a {
                    color: black;
                    padding: 12px 16px;
                    text-decoration: none;
                    display: block;
                    border-bottom: 1px solid #ddd; /* 境界線を追加 */
                    background-color: #f8f8f8; /* 軽い背景色を設定 */
                }
                .dropdown-content a:hover {
                    background-color: #e0e0e0; /* ホバー時の背景色を変更 */
                }
                .show {display: block;}
            </style>
            <div class="dropdown">
                <input type="text" placeholder="Type to search...">
                <div class="dropdown-content">
                    <!-- Dynamically filled -->
                </div>
            </div>
        `;

        this.input = this.shadowRoot.querySelector('input');
        this.dropdownContent = this.shadowRoot.querySelector('.dropdown-content');

        this.input.addEventListener('input', () => this.updateList());
    }

    updateList() {
        const value = this.input.value.trim();
        this.dropdownContent.innerHTML = '';
        if (value) {
            //検索候補に入るデータ
            const suggestions = english_words;
            suggestions.filter(item => item.toLowerCase().includes(value.toLowerCase()))
                .forEach(item => {
                    const link = document.createElement('a');
                    link.textContent = item;
                    link.href = '#';
                    link.addEventListener('click', () => {
                        this.input.value = item;
                        this.hideDropdown();
                    });
                    this.dropdownContent.appendChild(link);
                });
            this.showDropdown();
        } else {
            this.hideDropdown();
        }
    }

    showDropdown() {
        this.dropdownContent.classList.add('show');
    }

    hideDropdown() {
        this.dropdownContent.classList.remove('show');
    }
}

customElements.define('text-search', TextSearch);