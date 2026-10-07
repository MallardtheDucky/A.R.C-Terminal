/* ============================================================
   ROBCO TERMLINK HACKING MINI-GAME  (Fallout-style)
   - 2 columns x 17 rows x 12 chars of memory dump
   - Pick the password from the candidate words; "likeness" tells
     how many letters are correct AND in the right position
   - Bracket pairs ( ) [ ] { } < > on one line are cheats:
     remove a dud word or replenish your attempts
   ============================================================ */
const HACK_WORDS = {
    5: ['TREES','WAKES','WRITE','TAKEN','GHOST','SHINY','SKIES','RAISE','WAVES','VAULT','POWER','WATER','STEEL','FLAME','NIGHT','STORM','BLAST','CHAOS','GUARD','TOWER','FORCE','ALARM','LASER','SHELL','CRATE','DRIFT','RADIO','TRACE','CLEAN','LEARN'],
    6: ['RAISED','WINTER','SECURE','BUNKER','ENERGY','SILENT','TOXINS','SIGNAL','ORACLE','MARKET','HUNTER','DEPLOY','SEALED','FUSION','CAUSES','CIRCLE','LIVING','GARDEN','HEALTH','FAMILY','OUTPUT','ORDERS','SHIELD','CRYPTO','DOCTOR','MASTER','DANGER','PLANET','SYSTEM','UNREST'],
    7: ['MACHINE','REALITY','PROBLEM','CHAMBER','RECLAIM','SURFACE','VIOLENT','CAUTION','PROTECT','DEFENSE','SERVICE','PROCESS','CENTRAL','FREEDOM','BALANCE','MISSION','OVERSEE','PROJECT','CONTROL','COMMAND','NETWORK','MONITOR','WARNING','SURVIVE','GENESIS','LOCKING','GATEWAY'],
    8: ['SECURITY','OVERSEER','PROTOCOL','MAINTAIN','RESOLVED','CONTROLS','CAMPAIGN','SHELTERS','BUNKERED','REACTION','DISASTER','ANTENNAE','ELEVATOR','FUNCTION','HOSTILES','KEYBOARD','MOLECULE','PLATFORM','SURVIVOR','TERMINAL','VAULTTEC','CRYOGENS','EXECUTES','BLASTING'],
};
const HACK_JUNK = '!@#$%^&*()_-+=[]{}<>;:\'",./?|\\`~';
const HACK_PAIRS = { '(': ')', '[': ']', '{': '}', '<': '>' };
const HACK_ROWS = 17, HACK_W = 12, HACK_COLS = 2, HACK_TOTAL = HACK_ROWS * HACK_W * HACK_COLS;
const HACK_MAX_TRIES = 4, HACK_LOCK_SECONDS = 30;

window.hackGame = null;

function hackRand(n) { return Math.floor(Math.random() * n); }
function hackShuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = hackRand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* Likeness = number of letters matching in the same position */
function hackLikeness(a, b) { let n = 0; for (let i = 0; i < a.length; i++) if (a[i] === b[i]) n++; return n; }

function hackDifficulty(targetId) {
    const t = typeof FILE_SYSTEM !== 'undefined' ? FILE_SYSTEM[targetId] : null;
    if (t && t.hackLength) return t.hackLength;
    return 7;
}

/* Build the memory dump and the word / bracket maps */
function hackGenerate(len) {
    const pool = hackShuffle(HACK_WORDS[len] || HACK_WORDS[7]);
    const count = 12 + hackRand(3);
    const password = pool[0];
    // make sure at least a few decoys share letters with the password so likeness is useful
    const rest = pool.slice(1).sort((a, b) => hackLikeness(b, password) - hackLikeness(a, password));
    const near = rest.slice(0, 3);
    const far = hackShuffle(rest.slice(3)).slice(0, count - 4);
    const words = hackShuffle([password, ...near, ...far]);

    const chars = Array.from({ length: HACK_TOTAL }, () => HACK_JUNK[hackRand(HACK_JUNK.length)]);
    const isWord = new Array(HACK_TOTAL).fill(-1);
    const placed = [];
    const rowOf = (i) => Math.floor(i / HACK_W);

    // distribute words across the rows: a row can only host one word, with room around it
    const rows = hackShuffle([...Array(HACK_ROWS * HACK_COLS).keys()]);
    let ri = 0;
    for (const w of words) {
        if (ri >= rows.length) break;
        const row = rows[ri++];
        const start = row * HACK_W + hackRand(HACK_W - w.length + 1);
        for (let k = 0; k < w.length; k++) { chars[start + k] = w[k]; isWord[start + k] = placed.length; }
        placed.push({ word: w, start, end: start + w.length - 1, removed: false });
    }

    // plant a handful of guaranteed bracket pairs in junk gaps
    const keys = Object.keys(HACK_PAIRS);
    let planted = 0, tries = 0;
    while (planted < 9 && tries++ < 400) {
        const row = hackRand(HACK_ROWS * HACK_COLS);
        const span = 1 + hackRand(7);
        const a = row * HACK_W + hackRand(HACK_W - span - 1);
        const b = a + span + 1;
        let ok = true;
        for (let i = a; i <= b; i++) if (isWord[i] !== -1) ok = false;
        if (!ok) continue;
        const o = keys[hackRand(keys.length)];
        chars[a] = o; chars[b] = HACK_PAIRS[o];
        planted++;
    }
    return { len, password, chars, isWord, words: placed };
}

/* Find the closing bracket for an opening bracket at index i (same row, junk only) */
function hackBracketRange(g, i) {
    const o = g.chars[i];
    if (!HACK_PAIRS[o] || g.isWord[i] !== -1 || g.gone[i]) return null;
    const row = Math.floor(i / HACK_W), rowEnd = row * HACK_W + HACK_W - 1;
    const close = HACK_PAIRS[o];
    for (let j = i + 1; j <= rowEnd; j++) {
        if (g.isWord[j] !== -1 && !g.words[g.isWord[j]].removed) return null; // a word blocks the pair
        if (g.gone[j]) return null;
        if (g.chars[j] === close) return [i, j];
    }
    return null;
}

/* ---------- Rendering ---------- */
function hackAddr(n) { return '0x' + (0xF000 + n * 12).toString(16).toUpperCase().padStart(4, '0'); }

function hackInner(targetId) {
    const name = FILE_SYSTEM[targetId] ? FILE_SYSTEM[targetId].name : 'TERMINAL';
    return `
        <div class="hack-head">
            <div id="hack-status">ENTER PASSWORD NOW</div>
            <div class="mt-2"><span id="hack-attempts-line"></span></div>
            <div class="text-sm opacity-70 mb-2" id="hack-target">TARGET: ${name}</div>
        </div>
        <div class="hack-body">
            <div class="hack-cols" id="hack-cols"></div>
            <div class="hack-side">
                <div class="hack-log" id="hack-log"></div>
                <div class="hack-prompt">&gt; <span id="hack-hover"></span><span class="cursor-block"></span></div>
            </div>
        </div>`;
}

function renderHackApp(targetId) {
    return `<div class="hack" id="hack-root" tabindex="0">${hackInner(targetId)}</div>`;
}

window.initHack = function (targetId) {
    const rootEl = document.getElementById('hack-root');
    if (!rootEl) return;
    if (window.hackGame && window.hackGame.rootEl === rootEl) return; // already running on this DOM
    const len = hackDifficulty(targetId);
    startHackRound(targetId, len, rootEl);
};

window.stopHack = function () {
    if (window.hackGame) {
        clearInterval(window.hackGame.lockTimer);
        document.removeEventListener('keydown', window.hackGame.keyHandler, true);
        window.hackGame = null;
    }
};

function startHackRound(targetId, len, rootEl) {
    window.stopHack();
    const data = hackGenerate(len);
    const g = {
        targetId, rootEl, ...data,
        gone: new Array(HACK_TOTAL).fill(false),
        tries: HACK_MAX_TRIES,
        cursor: 0,
        over: false,
        lockTimer: null,
        group: [],
    };
    window.hackGame = g;
    drawHack(g);
    g.keyHandler = (e) => hackKey(e, g);
    document.addEventListener('keydown', g.keyHandler, true);
    logHack(g, `ATTEMPTS: ${HACK_MAX_TRIES}`, true);
    hackSetStatus(g, 'ENTER PASSWORD NOW');
    hackUpdateAttempts(g);
    hackHover(g, 0);
}

function drawHack(g) {
    const colsEl = document.getElementById('hack-cols');
    const rowsHtml = [];
    for (let c = 0; c < HACK_COLS; c++) {
        let col = '<div class="hack-col">';
        for (let r = 0; r < HACK_ROWS; r++) {
            const base = (c * HACK_ROWS + r) * HACK_W;
            let spans = '';
            for (let k = 0; k < HACK_W; k++) {
                const ch = g.chars[base + k].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
                spans += `<span data-i="${base + k}">${ch}</span>`;
            }
            col += `<div class="hack-row" style="animation-delay:${(c * HACK_ROWS + r) * 22}ms"><span class="hack-addr">${hackAddr(c * HACK_ROWS + r)}</span><span class="hack-chars">${spans}</span></div>`;
        }
        col += '</div>';
        rowsHtml.push(col);
    }
    colsEl.innerHTML = rowsHtml.join('');
    g.cells = colsEl.querySelectorAll('.hack-chars span');

    colsEl.addEventListener('mouseover', (e) => { const i = hackIdx(e); if (i !== null) hackHover(g, i); });
    colsEl.addEventListener('mouseleave', () => hackClearHover(g));
    colsEl.addEventListener('click', (e) => { const i = hackIdx(e); if (i !== null) { hackHover(g, i); hackSelect(g, i); } });
}

function hackIdx(e) {
    const t = e.target.closest('[data-i]');
    return t ? Number(t.dataset.i) : null;
}

/* ---------- Hover / selection ---------- */
function hackGroupAt(g, i) {
    const w = g.isWord[i];
    if (w !== -1 && !g.words[w].removed) {
        const wd = g.words[w];
        return { type: 'word', from: wd.start, to: wd.end, text: wd.word, word: wd };
    }
    const br = hackBracketRange(g, i);
    if (br) return { type: 'bracket', from: br[0], to: br[1], text: g.chars.slice(br[0], br[1] + 1).join('') };
    return { type: 'char', from: i, to: i, text: g.chars[i] };
}

function hackClearHover(g) {
    g.group.forEach(i => g.cells[i] && g.cells[i].classList.remove('hl'));
    g.group = [];
    const h = document.getElementById('hack-hover');
    if (h) h.textContent = '';
}

function hackHover(g, i) {
    if (g.over) return;
    hackClearHover(g);
    g.cursor = i;
    const grp = hackGroupAt(g, i);
    for (let k = grp.from; k <= grp.to; k++) { g.cells[k].classList.add('hl'); g.group.push(k); }
    const h = document.getElementById('hack-hover');
    if (h) h.textContent = grp.text;
    hackBeep('tick');
}

function hackSelect(g, i) {
    if (g.over) return;
    const grp = hackGroupAt(g, i);
    if (grp.type === 'char') return;
    if (grp.type === 'bracket') return hackUseBracket(g, grp);
    hackGuess(g, grp.word);
}

function hackBlank(g, from, to) {
    for (let k = from; k <= to; k++) { g.gone[k] = true; g.chars[k] = '.'; g.cells[k].textContent = '.'; g.cells[k].classList.add('gone'); }
}

function hackUseBracket(g, grp) {
    hackBlank(g, grp.from, grp.to);
    hackClearHover(g);
    logHack(g, grp.text.replace(/\./g, '.'));
    // ~1 in 4 replenishes attempts, otherwise removes a dud
    const duds = g.words.filter(w => !w.removed && w.word !== g.password);
    if (Math.random() < 0.25 || duds.length === 0) {
        g.tries = HACK_MAX_TRIES;
        logHack(g, 'ALLOWANCE REPLENISHED.');
        hackSetStatus(g, 'ALLOWANCE REPLENISHED');
        hackUpdateAttempts(g);
    } else {
        const d = duds[hackRand(duds.length)];
        d.removed = true;
        hackBlank(g, d.start, d.end);
        logHack(g, 'DUD REMOVED.');
        hackSetStatus(g, 'DUD DETECTED');
    }
    hackBeep('ok');
    hackHover(g, g.cursor);
}

function hackGuess(g, wd) {
    const guess = wd.word;
    logHack(g, guess);
    if (guess === g.password) {
        g.over = true;
        logHack(g, 'EXACT MATCH!');
        logHack(g, 'PLEASE WAIT WHILE SYSTEM IS ACCESSED...');
        hackSetStatus(g, 'ACCESS GRANTED');
        hackBeep('win');
        setTimeout(() => hackSuccess(g), 1400);
        return;
    }
    g.tries--;
    const like = hackLikeness(guess, g.password);
    wd.removed = true;
    hackBlank(g, wd.start, wd.end);
    logHack(g, 'ENTRY DENIED.');
    logHack(g, `LIKENESS=${like}/${g.len}`);
    hackSetStatus(g, `ENTRY DENIED. ${like}/${g.len}`);
    hackBeep('bad');
    hackUpdateAttempts(g);
    hackClearHover(g);
    if (g.tries <= 0) return hackLockout(g);
    hackHover(g, g.cursor);
}

function hackSuccess(g) {
    const id = g.targetId;
    const { unlocked, path } = window.state.terminal;
    window.stopHack();
    window.setState({ terminal: { hacking: null, unlockTarget: null, unlocked: unlocked.includes(id) ? unlocked : [...unlocked, id], path: [...path, id] } });
}

function hackAbort() {
    const g = window.hackGame;
    const id = g ? g.targetId : null;
    window.stopHack();
    window.setState({ terminal: { hacking: null, unlockTarget: id } });
}
window.hackAbort = hackAbort;

function hackLockout(g) {
    g.over = true;
    hackBeep('lock');
    let left = HACK_LOCK_SECONDS;
    const draw = () => {
        g.rootEl.innerHTML = `
        <div class="hack-lock">
            <div class="big">TERMINAL LOCKED</div>
            <div>PLEASE CONTACT AN ADMINISTRATOR</div>
            <div id="hack-lock-timer" class="mt-2">SYSTEM REBOOT IN ${String(left).padStart(2, '0')}S</div>
            <button class="menu-button mt-4" onclick="hackAbort()">&lt; [ESC] ABORT</button>
        </div>`;
    };
    draw();
    g.lockTimer = setInterval(() => {
        left--;
        if (left <= 0) {
            clearInterval(g.lockTimer);
            g.rootEl.innerHTML = hackInner(g.targetId);
            startHackRound(g.targetId, hackDifficulty(g.targetId), g.rootEl);
        } else {
            const t = document.getElementById('hack-lock-timer');
            if (t) t.textContent = `SYSTEM REBOOT IN ${String(left).padStart(2, '0')}S`;
        }
    }, 1000);
}

/* ---------- Header / log helpers ---------- */
function hackUpdateAttempts(g) {
    const el = document.getElementById('hack-attempts-line');
    if (!el) return;
    let blocks = '';
    for (let i = 0; i < g.tries; i++) blocks += '<span class="blk"></span>';
    el.innerHTML = `${g.tries} ATTEMPT(S) LEFT: ${blocks}` + (g.tries === 1 ? '<div class="hack-warn mt-1">!!! WARNING: LOCKOUT IMMINENT !!!</div>' : '');
}

function hackSetStatus(g, text) {
    const el = document.getElementById('hack-status');
    if (el) el.textContent = text.startsWith('ENTER') ? text : 'STATUS: ' + text;
}

function logHack(g, text, silent) {
    const el = document.getElementById('hack-log');
    if (!el) return;
    const line = document.createElement('div');
    line.textContent = '> ' + text;
    el.appendChild(line);
    while (el.children.length > 14) el.removeChild(el.firstChild);
}

/* ---------- Keyboard ---------- */
function hackKey(e, g) {
    if (!window.hackGame || g !== window.hackGame) return;
    if (e.key === 'Escape') {
        e.preventDefault(); e.stopPropagation();
        hackAbort();
        return;
    }
    if (g.over) return;
    const toRC = (i) => { const col = i >= HACK_ROWS * HACK_W ? 1 : 0; const w = i - col * HACK_ROWS * HACK_W; return { r: Math.floor(w / HACK_W), c: col * HACK_W + (w % HACK_W) }; };
    const fromRC = (r, c) => (c >= HACK_W ? HACK_ROWS * HACK_W : 0) + r * HACK_W + (c % HACK_W);
    let { r, c } = toRC(g.cursor);
    let moved = true;
    switch (e.key) {
        case 'ArrowLeft':  c = Math.max(0, c - 1); break;
        case 'ArrowRight': c = Math.min(HACK_W * 2 - 1, c + 1); break;
        case 'ArrowUp':    r = Math.max(0, r - 1); break;
        case 'ArrowDown':  r = Math.min(HACK_ROWS - 1, r + 1); break;
        case 'Enter': e.preventDefault(); hackSelect(g, g.cursor); return;
        default: moved = false;
    }
    if (moved) { e.preventDefault(); e.stopPropagation(); hackHover(g, fromRC(r, c)); }
}

/* ---------- Tiny synth for terminal beeps ---------- */
let hackAudio = null;
function hackBeep(kind) {
    if (window.hackMuted) return;
    try {
        hackAudio = hackAudio || new (window.AudioContext || window.webkitAudioContext)();
        const ctx = hackAudio, o = ctx.createOscillator(), v = ctx.createGain();
        const t = ctx.currentTime;
        const spec = { tick: [1200, 0.02, 0.015], ok: [880, 0.12, 0.04], bad: [180, 0.25, 0.06], win: [1320, 0.35, 0.05], lock: [90, 0.6, 0.07] }[kind];
        if (!spec) return;
        o.type = 'square'; o.frequency.value = spec[0];
        v.gain.setValueAtTime(spec[2], t); v.gain.exponentialRampToValueAtTime(0.0001, t + spec[1]);
        o.connect(v); v.connect(ctx.destination);
        o.start(t); o.stop(t + spec[1]);
    } catch (_) { /* audio unavailable */ }
}
window.hackToggleMute = () => { window.hackMuted = !window.hackMuted; };
