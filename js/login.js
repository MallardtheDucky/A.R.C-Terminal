function renderLoginScreen() {
    return `
    <div class="h-full w-full flex flex-col items-center justify-center px-5 relative">
        <div class="w-full max-w-2xl">
            <div class="flex flex-col items-center text-center">
                <img src="assets/logo.png?v=5" alt="A.R.C." class="h-16 md:h-24 w-auto mb-4">
                <div class="text-base md:text-xl leading-tight tracking-widest">
                    <div class="type-line mx-auto">ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</div>
                    <div class="type-line mx-auto" style="animation-delay: 0.9s">VAULT-TEC ADMINISTRATIVE RECLAMATION COMMAND</div>
                    <div class="type-line mx-auto" style="animation-delay: 1.8s">VAULT 254 // OVERSEER TERMINAL</div>
                </div>
            </div>
            <div class="border-b border-green-500 my-5"></div>
            <div class="text-base md:text-xl">
                <div class="mb-4">USER: OVERSEER_V.CALDWELL</div>
                <div class="flex items-center gap-3">
                    <span class="whitespace-nowrap">ENTER PASSWORD NOW &gt;</span>
                    <input id="login-input" type="password" class="login-input" autocomplete="off" spellcheck="false"
                        oninput="clearLoginError()"
                        onkeydown="if(event.key === 'Enter') attemptLogin()">
                </div>
                <div id="login-error" class="h-6 mt-3 text-red-500"></div>
                <button onclick="attemptLogin()" class="menu-button mt-2">[ ENTER ]</button>
            </div>
        </div>
        <div class="absolute bottom-3 left-0 w-full px-4 text-center text-xs md:text-sm text-green-700">
            UNAUTHORIZED ACCESS IS A CLASS A FELONY PUNISHABLE BY IMMEDIATE TERMINATION
        </div>
    </div>`;
}

function clearLoginError() {
    const el = document.getElementById('login-error');
    if (el) el.textContent = '';
}

function attemptLogin() {
    const input = document.getElementById('login-input');
    if (!input) return;
    if (input.value.trim().toLowerCase() === CONFIG.loginPassword) {
        window.setState({ loggedIn: true });
        initBootProcess();
    } else {
        input.value = '';
        input.focus();
        document.getElementById('login-error').textContent = 'ERROR: ACCESS DENIED';
    }
}
