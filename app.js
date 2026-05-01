/* ═══════════════════════════════════════
   ARCH HYPRLAND PORTFOLIO — APP.JS
   ═══════════════════════════════════════ */

// ─── DATA ───
const PROJECTS = [
  { name: "Multiverse Mate", desc: "Anime-themed multiplayer chess with cinematic kill animations and custom piece artwork.", tags: ["React", "Node.js", "Render", "Typescript"], link: "https://multiverse-mate-chess.onrender.com/" },
  { name: "Arch style Portfolio", desc: "A arch style portfolio with themes + inuilt music player.", tags: ["JavaScript", "Html", "Css"], link: "#" },
];

const SKILLS = {
  "Languages": ["JavaScript", "Python", "Java", "TypeScript", "HTML/CSS"],
  "Frontend": ["React", "Next.js", "Tailwind CSS", "Canvas API"],
  "Backend": ["Node.js", "Express", "Render", "REST APIs"],
  "Security": ["OSINT"],
  "Tools": ["Git", "Linux", "Hyprland", "Neovim", "VS Code"],
};

const CONTACTS = [
  { icon: "🐙", label: "GitHub", value: "https://github.com/Vijay141516", href: "https://github.com/Vijay141516" },
  { icon: "📧", label: "Email", value: "vp323318@gmail.com", href: "mailto:vp323318@gmail.com" },
  { icon: "💬", label: "Insta", value: "vijaydotin", href: "#" },
  { icon: "🐦", label: "Twitter / X", value: "NOT HAVE", href: "#" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/vijay", href: "https://www.linkedin.com/in/vijay-pandey-3bb8583a9/" },
];

const BOOT_LINES = [
  ["ok", "Started systemd-journald.service"],
  ["ok", "Reached target Local File Systems"],
  ["ok", "Started Load Kernel Modules"],
  ["ok", "Started Network Manager"],
  ["ok", "Reached target Network"],
  ["ok", "Started OpenSSH Daemon"],
  ["ok", "Started VIJAY's Portfolio Service"],
  ["ok", "Reached target Multi-User System"],
  ["info", ":: Arch Linux x86_64 (tty1)"],
  ["ok", "Starting Hyprland Compositor..."],
  ["ok", "Loading Anime-Cyberpunk Theme..."],
  ["ok", "Initializing sakura particles..."],
  ["ok", "Mounting /dev/portfolio..."],
  ["ok", "Started Desktop Environment"],
  ["info", "Welcome to VIJAY's Developer Portfolio"],
];

const NEOFETCH_ART = `<span class="out-cyan">        /\\</span>         <span class="out-bold">vijay</span>@<span class="out-bold">archlinux</span>
<span class="out-cyan">       /  \\</span>        ──────────────
<span class="out-cyan">      /\\   \\</span>       <span class="out-cyan">OS:</span> Arch Linux x86_64
<span class="out-cyan">     /      \\</span>      <span class="out-cyan">Host:</span> Portfolio v2.0
<span class="out-cyan">    /   ,,   \\</span>     <span class="out-cyan">Kernel:</span> 6.8.0-arch1
<span class="out-cyan">   /   |  |  -\\</span>    <span class="out-cyan">Uptime:</span> <span id="neo-uptime">0 mins</span>
<span class="out-cyan">  /_-''    ''-_\\</span>   <span class="out-cyan">Shell:</span> zsh 5.9
                   <span class="out-cyan">WM:</span> Hyprland
                   <span class="out-cyan">Theme:</span> <span id="neo-theme">Sakura-Pink</span>
                   <span class="out-cyan">Terminal:</span> kitty
                   <span class="out-cyan">CPU:</span> Creative Engine v8
                   <span class="out-cyan">GPU:</span> Imagination RTX 9090
                   <span class="out-cyan">Memory:</span> ∞ / ∞ MiB
                   <span class="out-cyan">Skills:</span> C, JS, React, CyberSec`;

// ─── STATE & CONFIG ───
const WIN_NAMES = {
  'projects-window': '📁 Projects', 'skills-window': '⚡ Skills',
  'contact-window': '📧 Contact', 'about-window': '👤 About',
  'terminal-window': '🖥️ Terminal', 'profile-card': '👤 Profile',
  'settings-window': 'Themes'
};
let openWindows = ['projects-window', 'terminal-window', 'about-window', 'profile-card', 'skills-window', 'contact-window'];
let topZ = 51;
let soundEnabled = false;
let startTime = Date.now();
let commandHistory = [];
let historyIndex = -1;
let currentTheme = 'sakura';
const $ = id => document.getElementById(id);
const safeListener = (id, event, cb) => {
  const el = $(id);
  if (el) el.addEventListener(event, cb);
};

const bootScreen = $('boot-screen');
const bootLog = $('boot-log');
const loginScreen = $('login-screen');
const loginForm = $('login-form');
const passwordInput = $('password-input');
const loginError = $('login-error');
const desktop = $('desktop');
const termOutput = $('terminal-output');
const termInput = $('terminal-input');
const termBody = $('terminal-body');
const cursorBlock = $('cursor-block');
const appLauncher = $('app-launcher');
const sleep = ms => new Promise(res => setTimeout(res, ms));

// ─── BOOT SEQUENCE ───
async function runBoot() {
  bootLog.innerHTML = '';
  updateTaskbar();
  let skipped = false;
  const skip = () => { skipped = true; };
  document.addEventListener('click', skip, { once: false });
  document.addEventListener('keydown', skip, { once: false });

  for (const [type, text] of BOOT_LINES) {
    if (skipped) break;
    const line = document.createElement('div');
    if (type === 'ok') {
      line.innerHTML = `<span class="ok">[  OK  ]</span> ${text}`;
    } else if (type === 'info') {
      line.innerHTML = `<span class="info">${text}</span>`;
    }
    bootLog.appendChild(line);
    bootLog.scrollTop = bootLog.scrollHeight;
    await sleep(skipped ? 0 : 80 + Math.random() * 60);
  }

  document.removeEventListener('click', skip);
  document.removeEventListener('keydown', skip);
  await sleep(skipped ? 100 : 400);
  bootScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  passwordInput.focus();
}

function enterFullscreen() {
  const el = document.documentElement;
  try {
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  } catch (e) { }
}

document.addEventListener('click', enterFullscreen, { once: true });
document.addEventListener('touchstart', enterFullscreen, { once: true });

// ─── LOGIN ───
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  if (passwordInput.value === '123') {
    loginScreen.classList.add('hidden');
    desktop.classList.remove('hidden');
    startTime = Date.now();
    initDesktop();
  } else {
    loginError.classList.remove('hidden');
    passwordInput.value = '';
    passwordInput.focus();
    setTimeout(() => loginError.classList.add('hidden'), 2000);
  }
});

// ─── DESKTOP INIT ───
function initDesktop() {
  createPetals();
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(updateUptime, 60000);
  printWelcome();
  termInput.focus();
  populateWindows();
  // Load default song
  musicSearch('Dracula').then(() => {
    if (musicResults.length) playSongByIndex(0, false);
  });
}

// ─── SAKURA PETALS ───
function createPetals() {
  const container = $('petals-container');
  const count = window.innerWidth < 768 ? 10 : 18;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (8 + Math.random() * 12) + 's';
    petal.style.animationDelay = (Math.random() * 15) + 's';
    petal.style.width = (8 + Math.random() * 8) + 'px';
    petal.style.height = petal.style.width;
    petal.style.opacity = 0.2 + Math.random() * 0.4;
    container.appendChild(petal);
  }
}

// ─── CLOCK ───
function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  const timeStr = `${h12}:${m} ${ampm}`;
  const clk = $('clock');
  if (clk) clk.textContent = timeStr;
  const tbLeft = $('taskbar-left');
  if (tbLeft) tbLeft.setAttribute('data-time', `${h12}:${m}`);
}

function updateUptime() {
  const uptimeSpan = $('uptime-value');
  const mins = Math.floor((Date.now() - startTime) / 60000);
  const uptimeStr = mins < 60 ? `${mins}m` : `${Math.floor(mins / 60)}h ${mins % 60}m`;
  if (uptimeSpan) uptimeSpan.textContent = uptimeStr;
  const neoUp = document.getElementById('neo-uptime');
  if (neoUp) neoUp.textContent = uptimeStr;
}

// ─── TERMINAL ───
function printWelcome() {
  appendOutput(`<span class="out-accent out-bold"> 
  ╔══════════════════════════════════════╗
  ║   Welcome to VIJAY's Arch Terminal   ║
  ║   Type 'help' for available commands ║
  ╚══════════════════════════════════════╝</span>
`);
}

function appendOutput(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  termOutput.appendChild(div);
  termBody.scrollTop = termBody.scrollHeight;
}

function appendPromptLine(cmd) {
  appendOutput(`<span class="cmd-line">[vijay@arch ~]$ </span><span class="cmd-text">${escapeHtml(cmd)}</span>`);
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Terminal input
termInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const cmd = termInput.value.trim();
    termInput.value = '';
    updateCursorPos();
    if (cmd) {
      commandHistory.unshift(cmd);
      historyIndex = -1;
      appendPromptLine(cmd);
      processCommand(cmd);
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      termInput.value = commandHistory[historyIndex];
      updateCursorPos();
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      termInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = -1;
      termInput.value = '';
    }
    updateCursorPos();
  }
  if (soundEnabled) playKeySound();
});

termInput.addEventListener('input', updateCursorPos);
termBody.addEventListener('click', () => termInput.focus());

function updateCursorPos() {
  // Measure text width to position cursor
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = '13px JetBrains Mono';
  const w = ctx.measureText(termInput.value).width;
  cursorBlock.style.left = w + 'px';
}

// ─── COMMANDS ───
function processCommand(raw) {
  const parts = raw.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'help': cmdHelp(); break;
    case 'about': cmdAbout(); break;
    case 'skills': openWindow('skills-window'); break;
    case 'projects': openWindow('projects-window'); break;
    case 'contact': openWindow('contact-window'); break;
    case 'neofetch': cmdNeofetch(); break;
    case 'clear': termOutput.innerHTML = ''; break;
    case 'theme': cmdTheme(args[0]); break;
    case 'open': cmdOpen(args[0]); break;
    case 'ls': cmdLs(); break;
    case 'cat': cmdCat(args[0]); break;
    case 'whoami': appendOutput('<span class="out-green">vijay</span>'); break;
    case 'pwd': appendOutput('<span class="out-cyan">/home/vijay/portfolio</span>'); break;
    case 'date': appendOutput(`<span class="out-cyan">${new Date().toString()}</span>`); break;
    case 'uname': appendOutput('<span class="out-cyan">Linux archlinux 6.8.0-arch1 x86_64 GNU/Linux</span>'); break;
    case 'sudo': appendOutput('<span class="out-red">vijay is not in the sudoers file. Nice try though 😏</span>'); break;
    case 'exit': appendOutput('<span class="out-yellow">There is no escape from the portfolio... 🌸</span>'); break;
    case 'play':
    case 'music':
      if (args.length) {
        openWindow('music-window');
        musicSearch(args.join(' '));
        appendOutput(`<span class="out-green">🎵 Searching for "${escapeHtml(args.join(' '))}"...</span>`);
      } else {
        openWindow('music-window');
        appendOutput('<span class="out-green">Opened music player. Use: play [song name]</span>');
      }
      break;
    case 'rm':
      if (args.join(' ').includes('-rf /')) {
        appendOutput('<span class="out-red">Nice try. The portfolio survives. 💀</span>');
      } else {
        appendOutput(`<span class="out-red">rm: cannot remove: Permission denied</span>`);
      }
      break;
    default:
      appendOutput(`<span class="out-red">bash: ${escapeHtml(cmd)}: command not found</span>
<span class="out-dim">Type 'help' for available commands</span>`);
  }
}

function cmdHelp() {
  appendOutput(`<span class="out-bold out-accent">Available Commands:</span>

  <span class="out-green">help</span>        Show this help message
  <span class="out-green">about</span>       Display about me
  <span class="out-green">skills</span>      Open skills window
  <span class="out-green">projects</span>    Open projects window
  <span class="out-green">contact</span>     Open contact window
  <span class="out-green">neofetch</span>    Display system info
  <span class="out-green">clear</span>       Clear the terminal
  <span class="out-green">theme</span> <span class="out-yellow">[name]</span>  Switch theme (retro/sakura/dark/hacker/neon/ocean/sunset)
  <span class="out-green">open</span> <span class="out-yellow">[app]</span>   Open an application
  <span class="out-green">ls</span>          List files
  <span class="out-green">cat</span> <span class="out-yellow">[file]</span>  Read a file
  <span class="out-green">whoami</span>      Who are you?
  <span class="out-green">pwd</span>         Print working directory
  <span class="out-green">date</span>        Show current date
  <span class="out-green">uname</span>       System information
  <span class="out-green">play</span> <span class="out-yellow">[song]</span>  Search & play music
  <span class="out-green">music</span>       Open music player
`);
}

function cmdAbout() {
  openWindow('about-window');
  appendOutput('<span class="out-green">Opened about window.</span>');
}

function cmdNeofetch() {
  updateUptime();
  appendOutput(NEOFETCH_ART);
}

function cmdTheme(name) {
  const themes = ['retro', 'sakura', 'dark', 'hacker', 'neon', 'ocean', 'sunset'];
  if (!name) {
    appendOutput(`<span class="out-yellow">Usage: theme [name]</span>
<span class="out-dim">Available: ${themes.join(', ')}</span>
<span class="out-dim">Current: ${currentTheme}</span>`);
    return;
  }
  if (!themes.includes(name)) {
    appendOutput(`<span class="out-red">Unknown theme: ${escapeHtml(name)}</span>
<span class="out-dim">Available: ${themes.join(', ')}</span>`);
    return;
  }
  setTheme(name);
  appendOutput(`<span class="out-green">Theme changed to ${name} 🎨</span>`);
}

function cmdOpen(app) {
  const apps = { projects: 'projects-window', skills: 'skills-window', contact: 'contact-window', about: 'about-window', settings: 'settings-window', themes: 'settings-window', music: 'music-window' };
  if (!app) {
    appendOutput(`<span class="out-yellow">Usage: open [app]</span>
<span class="out-dim">Available: ${Object.keys(apps).join(', ')}</span>`);
    return;
  }
  const wid = apps[app.toLowerCase()];
  if (wid) {
    openWindow(wid);
    appendOutput(`<span class="out-green">Opened ${app}.</span>`);
  } else {
    appendOutput(`<span class="out-red">Unknown app: ${escapeHtml(app)}</span>`);
  }
}

function cmdLs() {
  appendOutput(`<span class="out-cyan">drwxr-xr-x</span>  <span class="out-green">projects/</span>
<span class="out-cyan">drwxr-xr-x</span>  <span class="out-green">skills/</span>
<span class="out-cyan">-rw-r--r--</span>  <span class="out-accent">about.txt</span>
<span class="out-cyan">-rw-r--r--</span>  <span class="out-accent">contact.txt</span>
<span class="out-cyan">-rw-r--r--</span>  <span class="out-accent">README.md</span>
<span class="out-cyan">-rwx------</span>  <span class="out-red">.secrets</span>`);
}

function cmdCat(file) {
  if (!file) {
    appendOutput('<span class="out-yellow">Usage: cat [file]</span>');
    return;
  }
  const files = {
    'about.txt': `<span class="out-green">Hey! I'm VIJAY 👋</span>
A developer who loves building creative things with code.
I'm passionate about cybersecurity, open-source web apps, and anime.
Currently ricing Arch Linux with Hyprland. BTW I use Arch.`,
    'contact.txt': CONTACTS.map(c => `${c.icon} ${c.label}: ${c.value}`).join('\n'),
    'README.md': `<span class="out-bold"># VIJAY's Portfolio</span>
<span class="out-dim">An anime-themed developer portfolio built with love.</span>
Type 'help' to explore.`,
    '.secrets': `<span class="out-red">ACCESS DENIED 🔒</span>
<span class="out-dim">Nice try, hacker.</span>`,
  };
  if (files[file]) {
    appendOutput(files[file]);
  } else {
    appendOutput(`<span class="out-red">cat: ${escapeHtml(file)}: No such file</span>`);
  }
}

// ─── WINDOW MANAGEMENT ───


function openWindow(id) {
  const win = $(id);
  if (!win) return;
  // If already open, just bring to front
  if (!win.classList.contains('hidden')) {
    bringToFront(id);
    return;
  }
  win.classList.remove('hidden');
  win.style.animation = 'none';
  void win.offsetHeight;
  win.style.animation = 'windowOpen .3s ease';
  bringToFront(id);
  if (!openWindows.includes(id)) openWindows.push(id);
  updateTaskbar();
}

function closeWindow(id) {
  const win = $(id);
  if (!win) return;
  win.classList.remove('maximized'); // Fix: Remove maximized state to allow proper closing
  win.style.animation = 'fadeIn .2s ease reverse';
  setTimeout(() => {
    win.classList.add('hidden');
    win.style.animation = '';
    // Reset position so it re-centers next time
    win.style.top = '';
    win.style.left = '';
    win.style.transform = '';
  }, 180);
  openWindows = openWindows.filter(w => w !== id);
  updateTaskbar();
}

function bringToFront(id) {
  const win = $(id);
  if (win) win.style.zIndex = ++topZ;
  updateTaskbar();
}

function updateTaskbar() {
  try {
    const bar = $('taskbar-apps');
    if (!bar) return;
    bar.innerHTML = openWindows.map(id => {
      const name = WIN_NAMES[id] || id.replace('-window', '');
      const win = $(id);
      if (!win) return '';
      const isMin = win.classList.contains('minimized');
      const isActive = !isMin && (win.style.zIndex == topZ || openWindows.length === 1);

      return `<div class="taskbar-chip ${isMin ? 'dimmed' : ''} ${isActive ? 'active' : ''}" data-win="${id}">
        <span>${name}</span>
        <span class="taskbar-chip-close" data-close="${id}">✕</span>
      </div>`;
    }).join('');

    bar.querySelectorAll('.taskbar-chip').forEach(chip => {
      chip.addEventListener('click', e => {
        if (e.target.classList.contains('taskbar-chip-close')) {
          closeWindow(e.target.dataset.close);
        } else {
          const win = $(chip.dataset.win);
          if (win) {
            if (win.classList.contains('minimized')) {
              win.classList.remove('minimized');
              bringToFront(win.id);
            } else {
              if (win.classList.contains('floating-window') && win.style.zIndex != topZ) {
                bringToFront(win.id);
              } else {
                win.classList.add('minimized');
                updateTaskbar();
              }
            }
          }
        }
      });
    });
  } catch (e) { console.error("Taskbar error:", e); }
}

// Window Actions (event delegation)
document.addEventListener('click', e => {
  // Close buttons
  const closeBtn = e.target.closest('.close-float, [data-action="close"]');
  if (closeBtn) {
    const targetId = closeBtn.dataset.target || closeBtn.closest('.window, .glass-card').id;
    const win = $(targetId);
    if (win) {
      win.classList.remove('maximized');
      win.style.animation = 'none'; // reset any playing animations
      void win.offsetWidth; // trigger reflow
    }
    closeWindow(targetId);
    return;
  }

  // Minimize buttons
  const minBtn = e.target.closest('[data-action="minimize"]');
  if (minBtn) {
    const win = minBtn.closest('.window');
    if (win) {
      win.classList.add('minimized');
      updateTaskbar();
    }
    return;
  }

  // Maximize buttons
  const maxBtn = e.target.closest('[data-action="maximize"]');
  if (maxBtn) {
    const win = maxBtn.closest('.window');
    if (win) {
      win.classList.toggle('maximized');
    }
    return;
  }
});

// ─── DRAGGABLE WINDOWS ───
(function initDrag() {
  let dragWin = null, startX = 0, startY = 0, origX = 0, origY = 0;

  document.addEventListener('mousedown', e => {
    const header = e.target.closest('.window-header');
    if (!header || e.target.closest('.win-btn') || e.target.closest('.close-float') || e.target.closest('.window-dots')) return;
    dragWin = header.closest('.window, .glass-card');
    if (!dragWin) return;
    dragWin.classList.add('dragging');
    bringToFront(dragWin.id);
    const rect = dragWin.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    origX = rect.left;
    origY = rect.top;
    if (dragWin.classList.contains('tile')) {
      dragWin.classList.remove('tile');
      dragWin.classList.add('floating-window', 'detached-window');
      dragWin.style.width = rect.width + 'px';
      dragWin.style.height = rect.height + 'px';
    }

    dragWin.style.transform = 'none';
    dragWin.style.left = origX + 'px';
    dragWin.style.top = origY + 'px';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragWin) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    dragWin.style.left = (origX + dx) + 'px';
    dragWin.style.top = (origY + dy) + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (dragWin) {
      dragWin.classList.remove('dragging');
      dragWin = null;
    }
  });
})();

// ─── RESIZABLE WINDOWS ───
(function initResize() {
  let resizeWin = null, startX = 0, startY = 0, startW = 0, startH = 0;

  document.addEventListener('mousedown', e => {
    const handle = e.target.closest('.window-resizer');
    if (!handle) return;
    resizeWin = handle.closest('.window, .glass-card');
    if (!resizeWin) return;
    resizeWin.classList.add('resizing');
    bringToFront(resizeWin.id);
    const rect = resizeWin.getBoundingClientRect();

    if (resizeWin.classList.contains('tile')) {
      resizeWin.classList.remove('tile');
      resizeWin.classList.add('floating-window', 'detached-window');
      resizeWin.style.transform = 'none';
      resizeWin.style.left = rect.left + 'px';
      resizeWin.style.top = rect.top + 'px';
      resizeWin.style.width = rect.width + 'px';
      resizeWin.style.height = rect.height + 'px';
    }

    startX = e.clientX;
    startY = e.clientY;
    startW = rect.width;
    startH = rect.height;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!resizeWin) return;
    const dw = e.clientX - startX;
    const dh = e.clientY - startY;
    resizeWin.style.width = Math.max(300, startW + dw) + 'px';
    resizeWin.style.height = Math.max(200, startH + dh) + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (resizeWin) {
      resizeWin.classList.remove('resizing');
      resizeWin = null;
    }
  });
})();

// ─── POPULATE WINDOWS ───
function populateWindows() {
  // Projects
  const pb = $('projects-body');
  pb.innerHTML = PROJECTS.map(p => `
    <div class="project-card">
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      <a href="${p.link}" class="project-link" target="_blank">View Project →</a>
    </div>`).join('');

  // Skills
  const sb = $('skills-body');
  sb.innerHTML = Object.entries(SKILLS).map(([cat, items]) => `
    <div class="skill-category">
      <h4>${cat}</h4>
      <div class="skill-list">${items.map(s => `<span class="skill-chip">${s}</span>`).join('')}</div>
    </div>`).join('');

  // Contact
  const cb = $('contact-body');
  cb.innerHTML = CONTACTS.map(c => `
    <a href="${c.href}" class="contact-item" target="_blank">
      <span class="contact-icon">${c.icon}</span>
      <div>
        <strong>${c.label}</strong><br>
        <span style="font-size:12px;opacity:.7">${c.value}</span>
      </div>
    </a>`).join('');

  // About
  const ab = $('about-body');
  ab.innerHTML = `
    <h4>Hey, I'm VIJAY 👋</h4>
    <p>I'm a developer passionate about building creative, performant, and beautiful things with code. My interests span from web app building to ui/ux designing.</p>
    <h4>What I Do</h4>
    <p>I build full-stack web applications. I love experimenting with new technologies and pushing the boundaries of what's possible in the browser.</p>
    <h4>My Setup</h4>
    <p>Arch Linux + Hyprland • Neovim • Kitty Terminal <br>BTW, I use Arch. 🌸</p>`;
}

// ─── THEMES ───
function setTheme(name) {
  currentTheme = name;
  document.documentElement.setAttribute('data-theme', name);
  const labels = { retro: 'Retro-Anime', sakura: 'Sakura-Pink', dark: 'Dark-Purple', hacker: 'Red-Hacker', neon: 'Neon-Cyan', ocean: 'Ocean-Glass', sunset: 'Sunset-Rice' };
  const currentThemeLabel = $('current-theme-label');
  if (currentThemeLabel) currentThemeLabel.textContent = labels[name] || name;
  const neoTheme = document.getElementById('neo-theme');
  if (neoTheme) neoTheme.textContent = labels[name] || name;

  // Update settings theme buttons
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === name);
  });
}

// Initialize theme
setTheme('retro');

// ─── TOP BAR BUTTONS ───
const btnPower = $('btn-power');
if (btnPower) {
  btnPower.addEventListener('click', () => {
    if (confirm('Shutdown portfolio?')) location.reload();
  });
}
const btnRefresh = $('btn-refresh');
if (btnRefresh) btnRefresh.addEventListener('click', () => location.reload());

const btnLock = $('btn-lock');
if (btnLock) {
  btnLock.addEventListener('click', () => {
    desktop.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    passwordInput.value = '';
    passwordInput.focus();
  });
}

const btnThemeToggle = $('btn-theme-toggle');
if (btnThemeToggle) {
  btnThemeToggle.addEventListener('click', () => {
    const themes = ['retro', 'sakura', 'dark', 'hacker', 'neon', 'ocean', 'sunset'];
    const idx = (themes.indexOf(currentTheme) + 1) % themes.length;
    setTheme(themes[idx]);
  });
}

const btnLauncher = $('btn-launcher');
if (btnLauncher) btnLauncher.addEventListener('click', () => toggleLauncher());
const btnSound = $('btn-sound');
if (btnSound) {
  btnSound.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const onIcon = $('sound-on-icon');
    const offIcon = $('sound-off-icon');
    if (onIcon) onIcon.classList.toggle('hidden', !soundEnabled);
    if (offIcon) offIcon.classList.toggle('hidden', soundEnabled);
  });
}

// ─── APP LAUNCHER ───
function toggleLauncher() {
  appLauncher.classList.toggle('hidden');
  if (!appLauncher.classList.contains('hidden')) {
    $('launcher-search').value = '';
    $('launcher-search').focus();
    filterLauncherApps('');
  }
}

const launcherSearch = $('launcher-search');
if (launcherSearch) launcherSearch.addEventListener('input', e => filterLauncherApps(e.target.value));

function filterLauncherApps(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.launcher-app').forEach(app => {
    const name = app.textContent.toLowerCase();
    app.classList.toggle('filtered-out', q && !name.includes(q));
  });
}

// Launcher backdrop close
const launcherBackdrop = $('launcher-backdrop');
if (launcherBackdrop) launcherBackdrop.addEventListener('click', () => toggleLauncher());

// Taskbar Arch Button to open launcher
const taskbarArchBtn = $('taskbar-arch-btn');
if (taskbarArchBtn) {
  taskbarArchBtn.addEventListener('click', () => toggleLauncher());
}

// Workspace switcher (visual only for now)
document.querySelectorAll('.ws-num').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ws-num').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Mobile Nav
document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const app = btn.dataset.app;
    if (app === 'launcher') {
      toggleLauncher();
    } else if (app === 'terminal') {
      openWindow('terminal-window');
      termInput.focus();
    } else if (['profile-card', 'system-card', 'quick-settings'].includes(app)) {
      openWindow(app);
    } else {
      openWindow(app + '-window');
    }
  });
});

// Launcher app clicks
document.querySelectorAll('.launcher-app').forEach(btn => {
  btn.addEventListener('click', () => {
    const app = btn.dataset.app;
    toggleLauncher();
    if (app === 'terminal') {
      openWindow('terminal-window');
      termInput.focus();
    } else if (app === 'themes') {
      openWindow('settings-window');
    } else if (app === 'github') {
      window.open('https://github.com', '_blank');
    } else if (app === 'neofetch') {
      appendPromptLine('neofetch');
      cmdNeofetch();
      termInput.focus();
    } else if (['profile-card', 'system-card', 'quick-settings'].includes(app)) {
      openWindow(app);
    } else {
      openWindow(app + '-window');
    }
  });
});

// ─── SETTINGS WINDOW THEME BUTTONS ───
document.querySelectorAll('.theme-option').forEach(btn => {
  btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

// ─── QUICK SETTINGS ───
const qsAnim = $('qs-animations');
if (qsAnim) {
  qsAnim.addEventListener('click', function () {
    this.classList.toggle('active');
    document.body.classList.toggle('no-animations');
    const petals = $('petals-container');
    if (petals) petals.style.display = this.classList.contains('active') ? '' : 'none';
  });
}

const qsDark = $('qs-dark');
if (qsDark) {
  qsDark.addEventListener('click', function () {
    this.classList.toggle('active');
    const isDark = ['dark', 'hacker', 'neon'].includes(currentTheme);
    setTheme(isDark ? 'sakura' : 'dark');
  });
}

const qsBlur = $('qs-blur');
if (qsBlur) {
  qsBlur.addEventListener('click', function () {
    this.classList.toggle('active');
    document.body.classList.toggle('no-blur');
  });
}

const qsDnd = $('qs-dnd');
if (qsDnd) {
  qsDnd.addEventListener('click', function () {
    this.classList.toggle('active');
  });
}

// ─── WORKSPACE DOTS ───
document.querySelectorAll('.ws-dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('.ws-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});

// ─── KEY SOUND ───
function playKeySound() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = 800 + Math.random() * 400;
    gain.gain.value = 0.03;
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.05);
    osc.connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + 0.05);
  } catch (e) { }
}

// ─── KEYBOARD SHORTCUTS ───
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!appLauncher.classList.contains('hidden')) {
      toggleLauncher();
    } else {
      document.querySelectorAll('.floating-window:not(.hidden)').forEach(w => closeWindow(w.id));
    }
  }
});

// ─── MUSIC PLAYER ───
// Multiple API endpoints for redundancy
const MUSIC_APIS = [
  'https://jiosaavn-apix.arcadopredator.workers.dev/api',
  'https://jiosaavn-api-beta.vercel.app',
  'https://saavn.dev/api',
  'https://saavn.me/api',
  'https://jiosaavn-api-v3.vercel.app',
  'https://jiosaavn-api-sumitkolhe.vercel.app',
  'https://jiosaavn-api.vercel.app'
];

let musicAudio = new Audio();
let musicResults = [];
let musicIndex = -1;
let musicPlaying = false;
let musicProgressTimer = null;
let currentSongUrls = [];
let currentSongUrlIndex = 0;

const musicSearchInput = $('music-search-input');
const musicSearchBtn = $('music-search-btn');
const musicResultsDiv = $('music-results');
const musicLoading = $('music-loading');
const musicNowPlaying = $('music-now-playing');
const musicAlbumImg = $('music-album-img');
const musicNpTitle = $('music-np-title');
const musicPlayBtn = $('music-play-btn');
const musicProgressBar = $('music-progress-bar');
const musicCurTime = $('music-cur-time');
const musicDurTime = $('music-dur-time');
const musicVolume = $('music-volume');

// Offline fallback data in case all APIs fail
const OFFLINE_SONGS = [
  { name: "Dracula", artist: "tame impala", image: "https://c.saavncdn.com/264/Dracula-Japanese-2021-20210122144512-500x500.jpg", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { name: "Deep Indulgence", artist: "Lo-Fi Girl", image: "https://wallpapercave.com/wp/wp6665730.jpg", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { name: "Nippon", artist: "Anime Beats", image: "https://wallpaperaccess.com/full/137637.jpg", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];

function toMusicResult(s) {
  return {
    name: s.name,
    primaryArtists: s.artist,
    image: [{ url: s.image }],
    downloadUrl: [{ url: s.url, quality: '160kbps' }],
    url: s.url,
    offline: true
  };
}

async function fetchWithTimeout(url, ms = 3500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function musicSearch(query) {
  query = (query || '').trim();
  if (!query) return;
  musicLoading.classList.remove('hidden');
  musicResultsDiv.innerHTML = '';

  let success = false;

  // Try each API and multiple endpoints for each
  for (const api of MUSIC_APIS) {
    if (success) break;
    const endpoints = [`${api}/search/songs`, `${api}/search`];

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying Music API: ${endpoint}`);
        const url = `${endpoint}?query=${encodeURIComponent(query)}&limit=15`;
        let res = await fetchWithTimeout(url);
        if (!res.ok) continue;
        let data = await res.json();

        let results = [];
        if (data.status === 'SUCCESS' || data.success) {
          results = data.data.results || data.data || [];
          if (!Array.isArray(results) && typeof results === 'object') results = [results];
        }

        if (results && results.length > 0) {
          musicResults = results;
          renderMusicResults();
          success = true;
          break;
        }
      } catch (e) {
        console.warn(`Endpoint ${endpoint} failed:`, e.message);
      }
    }
  }

  if (!success) {
    console.warn("All Music APIs failed. Falling back to offline playlist.");
    musicResults = OFFLINE_SONGS.map(toMusicResult);
    renderMusicResults();
    musicResultsDiv.insertAdjacentHTML('afterbegin', `
      <div style="background:var(--accent-bg);padding:10px;border-radius:10px;margin-bottom:10px;font-size:12px;color:var(--text)">
        <p><strong>⚠️ Network connection issue</strong></p>
        <p style="opacity:0.8;font-size:11px">We couldn't reach the music servers. Showing offline fallback.</p>
        <button onclick="musicSearch('${query.replace(/'/g, "\\'")}')" style="margin-top:5px;text-decoration:underline;color:var(--accent)">Retry search</button>
      </div>
    `);
  }

  musicLoading.classList.add('hidden');
}

function getSongImg(s) {
  let url = '';
  if (s.image && Array.isArray(s.image)) url = s.image[s.image.length - 1]?.url || s.image[s.image.length - 1]?.link || s.image[s.image.length - 1] || '';
  else url = s.image || '';

  // Use weserv.nl proxy to bypass potential image blocking/CORS
  if (url && url.includes('saavncdn.com')) {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url.replace('http://', 'https://'))}&w=300&h=300&fit=cover`;
  }
  return url;
}
function getSongArtist(s) {
  if (s.artists && s.artists.primary) return s.artists.primary.map(a => a.name).join(', ');
  if (s.primaryArtists) return s.primaryArtists;
  if (s.subtitle) return s.subtitle;
  if (s.artist) return s.artist;
  return 'Unknown Artist';
}
function getSongUrls(s) {
  const downloadUrls = s.downloadUrl || s.download_url;
  const urls = [];
  if (Array.isArray(downloadUrls)) {
    [...downloadUrls]
      .sort((a, b) => parseInt(b.quality, 10) - parseInt(a.quality, 10))
      .forEach(d => {
        const url = typeof d === 'string' ? d : (d.link || d.url);
        if (url) urls.push(url);
      });
  }
  [s.url, s.media_url, s.mediaUrl, s.more_info?.encrypted_media_url].forEach(url => {
    if (url) urls.push(url);
  });
  return [...new Set(urls.map(url => url.replace('http://', 'https://')))];
}
function getSongUrl(s) {
  return getSongUrls(s)[0] || '';
}

function renderMusicResults() {
  musicResultsDiv.innerHTML = musicResults.map((s, i) => `
    <div class="music-result${i === musicIndex ? ' active' : ''}" data-idx="${i}">
      <img src="${getSongImg(s)}" alt="" loading="lazy" onerror="this.style.display='none'">
      <div class="music-result-info">
        <span class="music-result-title">${escapeHtml(s.name || s.title || 'Unknown song')}</span>
        <span class="music-result-artist">${escapeHtml(getSongArtist(s))}</span>
      </div>
      <span class="music-result-play">▶</span>
    </div>`).join('');
  musicResultsDiv.querySelectorAll('.music-result').forEach(el => {
    el.addEventListener('click', () => playSongByIndex(+el.dataset.idx));
  });
}

async function playSongByIndex(idx, autoPlay = true) {
  if (idx < 0 || idx >= musicResults.length) return;
  musicIndex = idx;
  const song = musicResults[idx];
  const songName = song.name || song.title || 'Unknown song';
  musicNpTitle.textContent = songName;
  musicAlbumImg.src = getSongImg(song);
  musicNowPlaying.classList.remove('hidden');
  musicPlaying = false;
  renderMusicResults();
  const sideTitle = document.querySelector('.song-title');
  const sideArtist = document.querySelector('.song-artist');
  if (sideTitle) sideTitle.textContent = songName;
  if (sideArtist) sideArtist.textContent = getSongArtist(song);

  const tbMusic = $('taskbar-music-text');
  if (tbMusic) tbMusic.textContent = songName;

  currentSongUrls = getSongUrls(song);
  currentSongUrlIndex = 0;
  if (currentSongUrls.length) {
    musicAudio.pause();
    musicAudio.src = currentSongUrls[currentSongUrlIndex];
    musicAudio.preload = 'metadata';
    if (musicVolume) musicAudio.volume = parseFloat(musicVolume.value);

    // Explicitly handle loading and playback
    musicAudio.load();
    updateAllMusicUI();
    if (autoPlay) {
      playCurrentAudio();
    } else {
      musicPlaying = false;
      updateAllMusicUI();
    }
  } else {
    musicNpTitle.textContent = 'No stream available';
  }
}

function playCurrentAudio() {
  if (!musicAudio.src || musicAudio.src === window.location.href) return;
  const playPromise = musicAudio.play();
  if (playPromise) {
    playPromise.catch(err => {
      console.warn('Playback blocked or failed:', err);
      musicPlaying = false;
      musicNpTitle.textContent = (err.name === 'NotAllowedError') ?
        'Autoplay blocked - tap Play' : 'Playback error - trying fallback';
      updateAllMusicUI();
      if (err.name !== 'NotAllowedError') tryNextSongUrl();
    });
  }
}

function tryNextSongUrl() {
  if (currentSongUrlIndex >= currentSongUrls.length - 1) return false;
  currentSongUrlIndex += 1;
  musicAudio.pause();
  musicAudio.src = currentSongUrls[currentSongUrlIndex];
  musicAudio.load();
  playCurrentAudio();
  return true;
}

function toggleMusicPlay() {
  if (!musicAudio.src || musicAudio.src === window.location.href) {
    // If no song loaded, try to play the default one
    const title = document.querySelector('.song-title');
    const artist = document.querySelector('.song-artist');
    const q = ((title ? title.textContent.trim() : '') + ' ' + (artist ? artist.textContent.trim() : '')).trim();
    if (q) {
      musicSearch(q).then(() => {
        if (musicResults.length) playSongByIndex(0);
      });
    }
    return;
  }
  if (musicPlaying) {
    musicAudio.pause();
  } else {
    playCurrentAudio();
  }
  updateAllMusicUI();
}

function updateAllMusicUI() {
  const icon = musicPlaying ? '⏸' : '▶';
  const song = musicIndex >= 0 ? musicResults[musicIndex] : null;

  // Update Buttons
  const playBtns = ['music-play-btn', 'play-btn', 'menu-play-btn'];
  playBtns.forEach(id => {
    const b = $(id);
    if (b) b.textContent = icon;
  });

  if (song) {
    // Update Text Everywhere
    const songName = song.name || song.title || 'Unknown song';
    const titles = ['music-np-title', 'lm-title', '.song-title'];
    const artists = ['lm-artist', '.song-artist'];

    titles.forEach(id => {
      const el = id.startsWith('.') ? document.querySelector(id) : $(id);
      if (el) el.textContent = songName;
    });

    artists.forEach(id => {
      const el = id.startsWith('.') ? document.querySelector(id) : $(id);
      if (el) el.textContent = getSongArtist(song);
    });

    const tbMusic = $('taskbar-music-text');
    if (tbMusic) tbMusic.textContent = songName;

    const albumImg = $('music-album-img');
    if (albumImg) albumImg.src = getSongImg(song);

    const sidebarArt = $('album-art');
    if (sidebarArt) {
      const img = getSongImg(song);
      if (img) sidebarArt.innerHTML = `<img src="${img}" style="width:100%;height:100%;border-radius:8px;object-fit:cover">`;
    }
  }
}

function startProgressUpdate() {
  clearInterval(musicProgressTimer);
  musicProgressTimer = setInterval(() => {
    if (musicAudio.duration) {
      const pct = (musicAudio.currentTime / musicAudio.duration) * 100;
      if (musicProgressBar) musicProgressBar.style.width = pct + '%';

      const menuProgress = $('progress-fill');
      if (menuProgress) menuProgress.style.width = pct + '%';

      if (musicCurTime) musicCurTime.textContent = fmtTime(musicAudio.currentTime);
      if (musicDurTime) musicDurTime.textContent = fmtTime(musicAudio.duration);
    }
  }, 500);
}

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

musicAudio.addEventListener('ended', () => {
  if (musicIndex < musicResults.length - 1) playSongByIndex(musicIndex + 1);
  else {
    musicPlaying = false;
    clearInterval(musicProgressTimer);
    updateAllMusicUI();
  }
});
musicAudio.addEventListener('play', () => {
  musicPlaying = true;
  startProgressUpdate();
  updateAllMusicUI();
});
musicAudio.addEventListener('pause', () => {
  musicPlaying = false;
  updateAllMusicUI();
});
musicAudio.addEventListener('error', () => {
  if (!currentSongUrls.length) return;
  if (!tryNextSongUrl()) {
    musicPlaying = false;
    if (musicNpTitle) musicNpTitle.textContent = 'Playback failed';
    updateAllMusicUI();
  }
});

safeListener('music-search-btn', 'click', () => musicSearch(musicSearchInput.value));
if (musicSearchInput) {
  musicSearchInput.addEventListener('keydown', e => { if (e.key === 'Enter') musicSearch(musicSearchInput.value); });
}
safeListener('music-play-btn', 'click', toggleMusicPlay);
safeListener('music-prev-btn', 'click', () => { if (musicIndex > 0) playSongByIndex(musicIndex - 1); });
safeListener('music-next-btn', 'click', () => { if (musicIndex < musicResults.length - 1) playSongByIndex(musicIndex + 1); });
if (musicVolume) {
  musicVolume.addEventListener('input', () => { musicAudio.volume = parseFloat(musicVolume.value); });
}
safeListener('music-progress', 'click', e => {
  if (!musicAudio.duration) return;
  const rect = e.currentTarget.getBoundingClientRect();
  musicAudio.currentTime = ((e.clientX - rect.left) / rect.width) * musicAudio.duration;
});

// Sidebar play button toggles play/pause
function updateSidebarPlayBtn() {
  const btn = $('play-btn');
  if (btn) btn.textContent = musicPlaying ? '⏸' : '▶';
}
safeListener('play-btn', 'click', async () => {
  if (musicAudio.src && musicAudio.src !== window.location.href) {
    toggleMusicPlay();
  } else {
    const title = document.querySelector('.song-title');
    const artist = document.querySelector('.song-artist');
    const q = ((title ? title.textContent.trim() : '') + ' ' + (artist ? artist.textContent.trim() : '')).trim();
    if (q) {
      await musicSearch(q);
      if (musicResults.length) playSongByIndex(0);
    }
  }
});
safeListener('prev-btn', 'click', () => { if (musicIndex > 0) playSongByIndex(musicIndex - 1); });
safeListener('next-btn', 'click', () => { if (musicIndex < musicResults.length - 1) playSongByIndex(musicIndex + 1); });

safeListener('menu-prev-btn', 'click', () => { if (musicIndex > 0) playSongByIndex(musicIndex - 1); });
safeListener('menu-next-btn', 'click', () => { if (musicIndex < musicResults.length - 1) playSongByIndex(musicIndex + 1); });
safeListener('menu-play-btn', 'click', () => toggleMusicPlay());

// ─── START ───
window.addEventListener('load', () => {
  // Global click to unlock audio for browsers
  document.addEventListener('click', () => {
    if (musicAudio && !musicAudio.src) {
      musicAudio.play().catch(() => { });
      musicAudio.pause();
    }
  }, { once: true });

  setTimeout(() => {
    console.log("System initialization started...");
    if (typeof runBoot === 'function') {
      runBoot().catch(e => console.error("Boot failure:", e));
    }
  }, 100);
});


// ─── SYSTEM CLOCK & UPTIME ───
const bootTime = Date.now();
setInterval(() => {
  const now = new Date();

  // Format Time
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const timeStr = `${h}:${m} ${ampm}`;

  // Format Date
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateStr = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  const shortDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

  // Update Taskbar Clock
  const tbClock = $('clock');
  const tbDate = $('date-short');
  if (tbClock) tbClock.textContent = timeStr;
  if (tbDate) tbDate.textContent = shortDate;

  // Update Desktop Widget
  const dtTime = $('desktop-time');
  const dtDate = $('desktop-date');
  if (dtTime) dtTime.textContent = timeStr;
  if (dtDate) dtDate.textContent = dateStr;

  // Update Uptime in System Card
  const uptimeSpan = $('uptime-value');
  if (uptimeSpan) {
    const diff = Math.floor((Date.now() - bootTime) / 60000);
    const hrs = Math.floor(diff / 60);
    const mins = diff % 60;
    uptimeSpan.textContent = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  }
}, 1000);
