function renderLoginScreen() {
    return `
    <div class="h-full w-full flex flex-col justify-center px-6 md:px-20 relative">
        <img src="assets/logo.png" alt="A.R.C." class="h-20 md:h-36 w-auto self-start mb-5">
        <div class="text-xl md:text-4xl leading-tight tracking-widest">
            <div>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</div>
            <div>VAULT-TEC ADMINISTRATIVE RECLAMATION COMMAND</div>
            <div>VAULT 254 // OVERSEER TERMINAL</div>
        </div>
        <div class="border-b-2 border-green-500 my-6 md:my-8"></div>
        <div class="text-xl md:text-3xl">
            <div class="mb-6">USER: OVERSEER_V.CALDWELL</div>
            <div class="flex items-center gap-3">
                <span class="whitespace-nowrap">ENTER PASSWORD NOW &gt;</span>
                <input id="login-input" type="password" class="login-input" autocomplete="off" spellcheck="false"
                    oninput="clearLoginError()"
                    onkeydown="if(event.key === 'Enter') attemptLogin()">
            </div>
            <div id="login-error" class="h-8 mt-4 text-red-500"></div>
            <button onclick="attemptLogin()" class="menu-button mt-4 text-lg">[ ENTER ]</button>
        </div>
        <div class="absolute bottom-4 left-0 w-full px-4 text-center text-sm text-green-700">
            UNAUTHORIZED ACCESS IS A CLASS A FELONY PUNISHABLE BY IMMEDIATE TERMINATION
        </div>
    </div>`;
}

function clearLoginError() {
    const el = document.getElementById('login-error');
    if (el) el.textContent = '';
}

function enterFullscreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement && el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
    }
}

function attemptLogin() {
    const input = document.getElementById('login-input');
    if (!input) return;
    if (input.value.trim().toLowerCase() === CONFIG.loginPassword) {
        enterFullscreen();
        window.setState({ loggedIn: true });
        initBootProcess();
    } else {
        input.value = '';
        input.focus();
        document.getElementById('login-error').textContent = 'ERROR: ACCESS DENIED';
    }
}
