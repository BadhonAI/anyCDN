import plugin from '../plugin.json';

class AcodePlugin {
  constructor() {
this.cdnData = [
  {
    name: "Tailwind CSS",
    logo: "🎨",
    category: "CSS Framework",
    size: "2.8MB",
    versions: ["4.1.12", "4.1.11", "4.0.0"],
    npm: "npm install tailwindcss",
    docs: "https://tailwindcss.com/docs/installation/play-cdn",
    url: "https://cdn.tailwindcss.com",
    script: '<script src="https://cdn.tailwindcss.com"></script>'
  },
  {
    name: "Bootstrap",
    logo: "🅱️",
    category: "CSS Framework",
    size: "25KB",
    versions: ["5.3.7", "5.3.6", "5.2.3"],
    npm: "npm install bootstrap",
    docs: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
    url: "https://cdn.jsdelivr.net/npm/bootstrap@{version}/dist/css/bootstrap.min.css",
    script: '<link href="https://cdn.jsdelivr.net/npm/bootstrap@{version}/dist/css/bootstrap.min.css" rel="stylesheet">'
  },
  {
    name: "GSAP",
    logo: "🚀",
    category: "Animation",
    size: "71KB",
    versions: ["3.13.0", "3.12.2", "3.11.5"],
    npm: "npm install gsap",
    docs: "https://greensock.com/docs/v3/Installation",
    url: "https://cdnjs.cloudflare.com/ajax/libs/gsap/{version}/gsap.min.js",
    script: '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/{version}/gsap.min.js"></script>'
  },
  {
    name: "Font Awesome",
    logo: "⚡",
    category: "Icons",
    size: "79KB",
    versions: ["7.0.0", "6.4.0", "6.3.0"],
    npm: "npm install @fortawesome/fontawesome-free",
    docs: "https://fontawesome.com/docs",
    url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/{version}/css/all.min.css",
    script: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/{version}/css/all.min.css">'
  },
  {
    name: "jQuery",
    logo: "💲",
    category: "JavaScript",
    size: "87KB",
    versions: ["3.7.1", "3.6.0", "3.5.1"],
    npm: "npm install jquery",
    docs: "https://jquery.com/",
    url: "https://cdnjs.cloudflare.com/ajax/libs/jquery/{version}/jquery.min.js",
    script: '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/{version}/jquery.min.js"></script>'
  },
  {
    name: "Vue.js",
    logo: "💚",
    category: "JavaScript",
    size: "110KB",
    versions: ["3.3.4", "3.2.47", "2.7.14"],
    npm: "npm install vue",
    docs: "https://vuejs.org/",
    url: "https://cdn.jsdelivr.net/npm/vue@{version}/dist/vue.global.js",
    script: '<script src="https://cdn.jsdelivr.net/npm/vue@{version}/dist/vue.global.js"></script>'
  },
  {
    name: "React",
    logo: "⚛️",
    category: "JavaScript",
    size: "132KB",
    versions: ["18.2.0", "17.0.2", "16.14.0"],
    npm: "npm install react react-dom",
    docs: "https://react.dev/",
    url: "https://unpkg.com/react@{version}/umd/react.production.min.js",
    script: '<script crossorigin src="https://unpkg.com/react@{version}/umd/react.production.min.js"></script>'
  },
  {
    name: "Axios",
    logo: "📡",
    category: "JavaScript",
    size: "15KB",
    versions: ["1.11.0", "1.10.0", "1.9.0"],
    npm: "npm install axios",
    docs: "https://axios-http.com/",
    url: "https://cdnjs.cloudflare.com/ajax/libs/axios/{version}/axios.min.js",
    script: '<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/{version}/axios.min.js"></script>'
  },
  {
    name: "Chart.js",
    logo: "📊",
    category: "Visualization",
    size: "198KB",
    versions: ["4.3.0", "4.2.1", "3.9.1"],
    npm: "npm install chart.js",
    docs: "https://www.chartjs.org/",
    url: "https://cdn.jsdelivr.net/npm/chart.js@{version}",
    script: '<script src="https://cdn.jsdelivr.net/npm/chart.js@{version}"></script>'
  },
  {
    name: "Three.js",
    logo: "🎮",
    category: "3D Graphics",
    size: "599KB",
    versions: ["r154", "r152", "r150"],
    npm: "npm install three",
    docs: "https://threejs.org/",
    url: "https://cdnjs.cloudflare.com/ajax/libs/three.js/{version}/three.min.js",
    script: '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/{version}/three.min.js"></script>'
  }
];    
    this.selectedCDNs = [];
    this.favoritesList = JSON.parse(localStorage.getItem('cdnFavorites') || '[]');
    this.currentCategory = 'all';
    this.showFavoritesOnly = false;
    this.cdnVersions = {};
    this.$page = null;
    this.copyIcon = '<svg class="copy-icon" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
  }

  async init($page) {
    this.$page = $page;
    const { commands } = editorManager.editor;

    commands.addCommand({
      name: 'cdn-library',
      bindKey: { win: 'Ctrl-Shift-C', mac: 'Command-Shift-C' },
      exec: () => this.show()
    });
  }

  show() {
    this.initializeVersions();
    this.render();
    this.$page.show();
  }

  initializeVersions() {
    this.cdnData.forEach(cdn => {
      if (!this.cdnVersions[cdn.name]) {
        this.cdnVersions[cdn.name] = cdn.versions[0];
      }
    });
  }

  getCategories() {
    return ['all', ...new Set(this.cdnData.map(cdn => cdn.category))];
  }

  filterData() {
    let filtered = this.cdnData;
    
    if (this.showFavoritesOnly) {
      filtered = filtered.filter(cdn => this.favoritesList.includes(cdn.name));
    }
    
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(cdn => cdn.category === this.currentCategory);
    }
    
    const searchInput = this.$page.querySelector('#cdn-search');
    if (searchInput) {
      const searchQuery = searchInput.value.toLowerCase();
      if (searchQuery) {
        filtered = filtered.filter(cdn => 
          cdn.name.toLowerCase().includes(searchQuery) ||
          cdn.category.toLowerCase().includes(searchQuery)
        );
      }
    }
    
    return filtered;
  }

  render() {
    this.$page.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .cdn-container {
          background: #1a1a2e;
          min-height: 100vh;
          font-family: system-ui, sans-serif;
          color: #fff;
          padding: 1rem;
          overflow-y: auto;
        }

        .cdn-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .cdn-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .cdn-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .cdn-subtitle {
          font-size: 0.9rem;
          color: #999;
        }

        .controls-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        #cdn-search {
          flex: 1;
          min-width: 250px;
          max-width: 400px;
          padding: 0.75rem;
          border: 1px solid #333;
          border-radius: 8px;
          background: #0f0f23;
          color: #fff;
          font-size: 1rem;
        }

        #cdn-search::placeholder {
          color: #666;
        }

        .category-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .category-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #333;
          border-radius: 20px;
          background: #0f0f23;
          color: #fff;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .category-btn.active {
          background: #333;
          border-color: #555;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          background: #0f0f23;
          color: #fff;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid #333;
        }

        .action-btn.generate-btn {
          background: #1a4d2e;
          border-color: #2a5d3e;
        }

        .action-btn.favorites-btn {
          background: #4d1a1a;
          border-color: #5d2a2a;
        }

        .selected-count {
          padding: 0.5rem 1rem;
          background: #0f0f23;
          border: 1px solid #333;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .cdn-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1rem;
        }

        .cdn-card {
          background: #0f0f23;
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid #333;
          position: relative;
        }

        .cdn-card.selected {
          border-color: #0f6;
          background: #0a1f0a;
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          position: relative;
        }

        .cdn-logo {
          width: 50px;
          height: 50px;
          margin-right: 1rem;
          border-radius: 8px;
          background: #1a1a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .cdn-info {
          flex: 1;
        }

        .cdn-name {
          font-size: 1.1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cdn-meta {
          display: flex;
          gap: 1rem;
          margin-top: 0.25rem;
          font-size: 0.85rem;
          color: #999;
        }

        .category-tag {
          padding: 0.2rem 0.5rem;
          background: #1a1a2e;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .version-select {
          padding: 0.2rem 0.4rem;
          border: 1px solid #333;
          border-radius: 4px;
          background: #0f0f23;
          color: #fff;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .card-actions {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
        }

        .select-checkbox,
        .favorite-btn {
          width: 36px;
          height: 36px;
          border: 2px solid #555;
          border-radius: 6px;
          background: #1a1a2e;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          padding: 0;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          user-select: none;
          color: #fff;
        }

        .select-checkbox.checked {
          background: #0f6;
          border-color: #0f6;
          color: #000;
        }

        .favorite-btn {
          font-size: 1.3rem;
        }

        .favorite-btn.favorited {
          color: #ff6;
          border-color: #ff6;
        }

        .cdn-field {
          margin-bottom: 0.75rem;
        }

        .field-label {
          font-size: 0.85rem;
          color: #999;
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .field-content {
          background: #1a1a2e;
          padding: 0.75rem;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #333;
        }

        .field-text {
          font-family: monospace;
          font-size: 0.85rem;
          color: #0f6;
          word-break: break-all;
          flex: 1;
          margin-right: 0.5rem;
        }

        .copy-btn {
          background: #333;
          border: none;
          border-radius: 4px;
          padding: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .copy-btn.copied {
          background: #0f6;
        }

        .copy-icon {
          width: 20px;
          height: 20px;
          fill: #fff;
        }

        .npm-command {
          color: #fa0;
        }

        .doc-link {
          color: #0f6;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.85rem;
        }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          z-index: 2000;
          align-items: center;
          justify-content: center;
        }

        .modal.show {
          display: flex;
        }

        .modal-content {
          background: #0f0f23;
          border-radius: 12px;
          padding: 2rem;
          max-width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          border: 1px solid #333;
        }

        .modal-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .generated-code {
          background: #000;
          padding: 1rem;
          border-radius: 6px;
          font-family: monospace;
          font-size: 0.9rem;
          color: #0f6;
          white-space: pre-wrap;
          word-break: break-all;
          border: 1px solid #333;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .cdn-grid {
            grid-template-columns: 1fr;
          }
          
          .controls-section {
            flex-direction: column;
          }
          
          #cdn-search {
            width: 100%;
          }
        }
      </style>

      <div class="cdn-container">
        <div class="cdn-wrapper">
          <div class="cdn-header">
            <h1 class="cdn-title">🚀 CDN Library Hub</h1>
            <p class="cdn-subtitle">Quick access to popular CDN links with version control</p>
          </div>
          
          <div class="controls-section">
            <input type="text" id="cdn-search" placeholder="Search libraries...">
            <div class="category-filters" id="category-filters"></div>
          </div>

          <div class="action-buttons">
            <button class="action-btn generate-btn" id="generate-bundle-btn">
              📦 Generate HTML Bundle
            </button>
            <button class="action-btn favorites-btn" id="toggle-favorites-btn">
              ⭐ Show Favorites
            </button>
            <span class="selected-count" id="selected-count">0 selected</span>
          </div>

          <div id="cdn-grid" class="cdn-grid"></div>
        </div>

        <div id="bundle-modal" class="modal">
          <div class="modal-content">
            <h2 class="modal-title">📦 Generated HTML Bundle</h2>
            <div class="generated-code" id="generated-code"></div>
            <div class="modal-actions">
              <button class="action-btn" id="copy-bundle-btn">Copy All</button>
              <button class="action-btn" id="close-modal-btn">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
    this.renderCategoryFilters();
    this.renderCards();
  }

  attachEventListeners() {
    // Search input with debounce
    let searchTimeout;
    this.$page.querySelector('#cdn-search').addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.renderCards();
      }, 300);
    });
    
    // Action buttons
    this.$page.querySelector('#generate-bundle-btn').addEventListener('click', () => this.generateBundle());
    this.$page.querySelector('#toggle-favorites-btn').addEventListener('click', () => this.toggleFavorites());
    this.$page.querySelector('#copy-bundle-btn').addEventListener('click', () => this.copyBundle());
    this.$page.querySelector('#close-modal-btn').addEventListener('click', () => this.closeModal());
  }

  renderCategoryFilters() {
    const categories = this.getCategories();
    const filtersContainer = this.$page.querySelector('#category-filters');
    
    filtersContainer.innerHTML = categories.map(cat => 
      `<button class="category-btn ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
        ${cat === 'all' ? 'All' : cat}
      </button>`
    ).join('');
    
    // Add event listeners to category buttons
    filtersContainer.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.filterByCategory(e.target.dataset.category, e.target));
    });
  }

  renderCards() {
    const filteredData = this.filterData();
    const grid = this.$page.querySelector('#cdn-grid');
    
    grid.innerHTML = filteredData.map(cdn => this.createCard(cdn)).join('');
    
    // Attach event listeners to cards
    grid.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.dataset.copy;
        this.copyToClipboard(text, btn);
      });
    });
    
    grid.querySelectorAll('.select-checkbox').forEach(checkbox => {
      checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.toggleSelect(checkbox.dataset.name);
      });
    });
    
    grid.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.toggleFavorite(btn.dataset.name);
      });
    });
    
    grid.querySelectorAll('.version-select').forEach(select => {
      select.addEventListener('change', (e) => {
        e.stopPropagation();
        this.changeVersion(e.target.dataset.name, e.target.value);
      });
    });
    
    this.updateSelectedCount();
  }

  createCard(cdn) {
    const isFavorite = this.favoritesList.includes(cdn.name);
    const isSelected = this.selectedCDNs.includes(cdn.name);
    const currentVersion = this.cdnVersions[cdn.name] || cdn.versions[0];
    const url = cdn.url.replace('{version}', currentVersion);
    const script = cdn.script.replace('{version}', currentVersion);
    
    const versionOptions = cdn.versions.map(v => 
      `<option value="${v}" ${v === currentVersion ? 'selected' : ''}>${v}</option>`
    ).join('');

    return `
      <div class="cdn-card ${isSelected ? 'selected' : ''}" data-name="${cdn.name}">
        <div class="card-actions">
          <button type="button" class="select-checkbox ${isSelected ? 'checked' : ''}" data-name="${cdn.name}" aria-label="Select ${cdn.name}">
            ${isSelected ? '✓' : ''}
          </button>
          <button type="button" class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-name="${cdn.name}" aria-label="Favorite ${cdn.name}">
            ${isFavorite ? '⭐' : '☆'}
          </button>
        </div>
        <div class="card-header">
          <div class="cdn-logo">${cdn.logo}</div>
          <div class="cdn-info">
            <div class="cdn-name">
              ${cdn.name}
              <span class="category-tag">${cdn.category}</span>
            </div>
            <div class="cdn-meta">
              <span>📦 ${cdn.size}</span>
              <select class="version-select" data-name="${cdn.name}">
                ${versionOptions}
              </select>
            </div>
          </div>
        </div>
        <div class="cdn-field">
          <div class="field-label">
            CDN URL
            <a href="${cdn.docs}" target="_blank" class="doc-link">📚 Docs →</a>
          </div>
          <div class="field-content">
            <span class="field-text">${url}</span>
            <button class="copy-btn" data-copy="${url}">
              ${this.copyIcon}
            </button>
          </div>
        </div>
        <div class="cdn-field">
          <div class="field-label">Script Tag</div>
          <div class="field-content">
            <span class="field-text">${script.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
            <button class="copy-btn" data-copy="${script}">
              ${this.copyIcon}
            </button>
          </div>
        </div>
        <div class="cdn-field">
          <div class="field-label">NPM Install</div>
          <div class="field-content">
            <span class="field-text npm-command">${cdn.npm}</span>
            <button class="copy-btn" data-copy="${cdn.npm}">
              ${this.copyIcon}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      btn.innerHTML = '✓';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = this.copyIcon;
      }, 2000);
    }).catch(err => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      btn.classList.add('copied');
      btn.innerHTML = '✓';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = this.copyIcon;
      }, 2000);
    });
  }

  toggleSelect(name) {
    const index = this.selectedCDNs.indexOf(name);
    if (index > -1) {
      this.selectedCDNs.splice(index, 1);
    } else {
      this.selectedCDNs.push(name);
    }
    this.renderCards();
  }

  toggleFavorite(name) {
    const index = this.favoritesList.indexOf(name);
    if (index > -1) {
      this.favoritesList.splice(index, 1);
    } else {
      this.favoritesList.push(name);
    }
    localStorage.setItem('cdnFavorites', JSON.stringify(this.favoritesList));
    this.renderCards();
  }

  toggleFavorites() {
    this.showFavoritesOnly = !this.showFavoritesOnly;
    const btn = this.$page.querySelector('#toggle-favorites-btn');
    btn.textContent = this.showFavoritesOnly ? '📋 Show All' : '⭐ Show Favorites';
    this.renderCards();
  }

  filterByCategory(category, btnElement) {
    this.currentCategory = category;
    this.$page.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    btnElement.classList.add('active');
    this.renderCards();
  }

  changeVersion(name, version) {
    this.cdnVersions[name] = version;
    this.renderCards();
  }

  updateSelectedCount() {
    this.$page.querySelector('#selected-count').textContent = `${this.selectedCDNs.length} selected`;
  }

  generateBundle() {
    if (this.selectedCDNs.length === 0) {
      window.acode.alert('CDN Library', 'Please select at least one CDN to generate bundle');
      return;
    }
    
    const selectedData = this.cdnData.filter(cdn => this.selectedCDNs.includes(cdn.name));
    const cssLinks = [];
    const jsScripts = [];
    
    selectedData.forEach(cdn => {
      const version = this.cdnVersions[cdn.name] || cdn.versions[0];
      const script = cdn.script.replace('{version}', version);
      
      if (script.includes('<link')) {
        cssLinks.push('  ' + script);
      } else {
        jsScripts.push('  ' + script);
      }
    });
    
    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CDN Bundle</title>
  
  <!-- CSS Libraries -->
${cssLinks.join('\n')}
</head>
<body>
  <!-- Your content here -->
  
  <!-- JavaScript Libraries -->
${jsScripts.join('\n')}
</body>
</html>`;
    
    this.$page.querySelector('#generated-code').textContent = htmlTemplate;
    this.$page.querySelector('#bundle-modal').classList.add('show');
  }

  copyBundle() {
    const code = this.$page.querySelector('#generated-code').textContent;
    navigator.clipboard.writeText(code).then(() => {
      window.acode.alert('Success', 'Bundle copied to clipboard!');
    });
  }

  closeModal() {
    this.$page.querySelector('#bundle-modal').classList.remove('show');
  }

  close() {
    if (this.$page && this.$page.hide) {
      this.$page.hide();
    }
  }

  async destroy() {
    const { commands } = editorManager.editor;
    commands.removeCommand('cdn-library');
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(plugin.id, async (baseUrl, $page) => {
    await acodePlugin.init($page);
  });
  acode.setPluginUnmount(plugin.id, () => acodePlugin.destroy());
}