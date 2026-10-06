const root = document.getElementById('root');

function renderApp() {
    if (!document.getElementById('shell-container')) {
        root.innerHTML = `
            <div class="pointer-events-none fixed inset-0 z-50 overflow-hidden">
                <div class="absolute inset-0 scanlines"></div>
                <div class="absolute inset-0 crt-overlay"></div>
                <div class="absolute inset-x-0 top-0 roll-bar"></div>
            </div>
            <div id="shell-container" class="h-full w-full">
                <div id="screen-content" class="h-full w-full overflow-hidden bg-black text-shadow-glow relative font-mono text-green-500"></div>
            </div>
            <div id="modal-layer"></div>
        `;
    }

    const screenContent = document.getElementById('screen-content');
    const modalLayer = document.getElementById('modal-layer');
    const { loggedIn, booted, activeApp, terminal } = window.state;

    if (!loggedIn) {
        screenContent.innerHTML = renderLoginScreen();
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

    let focusId = null;
    if (!loggedIn) focusId = 'login-input';
    else if (booted && activeApp === 'terminal') focusId = terminal.unlockTarget ? 'term-input' : 'cmd-input';
    const el = focusId && document.getElementById(focusId);
    if (el && document.activeElement !== el) {
        el.focus();
        const end = el.value.length;
        if (el.setSelectionRange && el.type !== 'password') el.setSelectionRange(end, end);
    }
}
