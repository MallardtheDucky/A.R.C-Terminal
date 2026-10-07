const root = document.getElementById('root');

function renderApp() {
    if (!document.getElementById('shell-container')) {
        root.innerHTML = `
            <div class="crt-frame crt-booting" id="crt-frame">
                <div class="crt-screen">
                    <div class="crt-inner">
                        <div id="shell-container">
                            <div id="screen-content" class="h-full w-full overflow-hidden relative font-mono text-green-500"></div>
                        </div>
                        <div id="modal-layer"></div>
                    </div>
                    <div class="crt-fx crt-scan"></div>
                    <div class="crt-fx crt-mask"></div>
                    <div class="crt-fx crt-noise"></div>
                    <div class="crt-fx crt-roll"></div>
                    <div class="crt-fx crt-vignette"></div>
                    <div class="crt-fx crt-glass"></div>
                    <div class="crt-fx crt-flash"></div>
                </div>
            </div>
        `;
        setTimeout(() => {
            const f = document.getElementById('crt-frame');
            if (f) f.classList.remove('crt-booting');
        }, 1300);
    }

    const screenContent = document.getElementById('screen-content');
    const modalLayer = document.getElementById('modal-layer');
    const { loggedIn, booted, activeApp, terminal } = window.state;

    // brief glitch whenever the active app changes
    if (window.lastActiveApp !== activeApp && window.lastActiveApp !== undefined) crtGlitch();
    window.lastActiveApp = activeApp;

    if (!loggedIn) {
        screenContent.innerHTML = '<div class="h-full w-full p-3 md:p-6" style="height:100%;padding:clamp(8px,2vh,24px)">' + renderHackApp(HACK_LOGIN) + '</div>';
        modalLayer.innerHTML = '';
    } else if (!booted) {
        screenContent.innerHTML = renderBootSequence();
        modalLayer.innerHTML = '';
    } else {
        modalLayer.innerHTML = activeApp ? renderModalWindow() : '';
        if (!document.getElementById('desktop-interface')) {
            screenContent.innerHTML = renderMainInterface();
        }
    }

    if (window.lucide) lucide.createIcons();

    const logEl = document.getElementById('terminal-log');
    if (logEl) logEl.scrollTop = logEl.scrollHeight;

    // start the hacking mini-game once its markup is on screen
    if (!loggedIn) window.initHack(HACK_LOGIN);
    else if (booted && activeApp === 'terminal' && terminal.hacking) window.initHack(terminal.hacking);
    else if (window.stopHack) window.stopHack();

    let focusId = null;
    if (!loggedIn) focusId = null;
    else if (booted && activeApp === 'terminal' && !terminal.hacking) focusId = terminal.unlockTarget ? 'term-input' : 'cmd-input';
    const el = focusId && document.getElementById(focusId);
    if (el && document.activeElement !== el) {
        el.focus();
        const end = el.value.length;
        if (el.setSelectionRange && el.type !== 'password') el.setSelectionRange(end, end);
    }
}

function crtGlitch() {
    const f = document.getElementById('crt-frame');
    if (!f) return;
    f.classList.remove('crt-glitch');
    void f.offsetWidth;
    f.classList.add('crt-glitch');
    setTimeout(() => f.classList.remove('crt-glitch'), 320);
}

// F2 toggles the CRT effects (useful on slow machines)
document.addEventListener('keydown', (e) => {
    if (e.key === 'F2') {
        e.preventDefault();
        document.body.classList.toggle('no-crt');
    }
});
