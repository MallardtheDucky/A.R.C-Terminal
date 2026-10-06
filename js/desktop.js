const MENU_ITEMS = [
    { label: 'FILE ARCHIVES', app: 'terminal' },
    { label: 'VAULT-MAIL', app: 'mail' },
    { label: 'FACILITY SCHEMATICS', app: 'map' },
    { label: 'SENSOR ARRAY', app: 'status' }
];

const APPS = {
    terminal: { title: 'ROBCO FILE MANAGER', render: () => renderTerminalApp() },
    mail: { title: 'VAULT-MAIL V1.2', render: () => renderMailApp() },
    map: { title: 'VAULT 254 ARCHITECT', render: () => renderMapApp() },
    status: { title: 'OVERSEER DASHBOARD', render: () => renderStatusApp() }
};

function closeApp() {
    window.setState({
        activeApp: null,
        terminal: { unlockTarget: null, unlockInput: '', viewingFile: null },
        mail: { selectedEmailId: null },
        map: { selectedRoom: null },
        status: { selectedSensor: null }
    });
}

function selectMenu(index) {
    window.menuIndex = index;
    document.querySelectorAll('.menu-item').forEach((el, i) => {
        el.classList.toggle('selected', i === index);
    });
}

function renderMainInterface() {
    const timeNow = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    window.menuIndex = 0;
    const items = MENU_ITEMS.map((item, i) => `
        <button onclick="window.setState({ activeApp: '${item.app}' })" onmouseenter="selectMenu(${i})" class="menu-item ${i === 0 ? 'selected' : ''}">&gt; ${item.label}</button>
    `).join('');

    return `
    <div id="desktop-interface" class="h-full flex justify-center p-4 md:p-8">
        <div class="w-full max-w-3xl flex flex-col h-full">
            <div class="flex flex-col items-center text-center shrink-0">
                <img src="assets/logo.png?v=5" alt="A.R.C." class="h-14 md:h-20 w-auto mb-3">
                <div class="text-base md:text-xl leading-tight tracking-widest">
                    <div class="type-line mx-auto">ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM</div>
                    <div class="type-line mx-auto" style="animation-delay: 0.7s">COPYRIGHT 2075-2077 ROBCO INDUSTRIES</div>
                    <div class="type-line mx-auto" style="animation-delay: 1.4s">-SERVER 1-</div>
                </div>
            </div>
            <div class="border-b border-green-500 my-4 shrink-0"></div>
            <div class="text-base md:text-xl mb-3 type-line shrink-0" style="animation-delay: 2s">VAULT 254 // A.R.C. OVERSEER TERMINAL</div>
            <div class="flex-1 overflow-y-auto custom-scrollbar">
                ${items}
                <div class="px-3 py-1 text-xl"><span class="cursor-block"></span></div>
            </div>
            <div class="border-t border-green-500 pt-2 flex flex-wrap justify-between gap-2 text-sm md:text-lg shrink-0">
                <div class="animate-glitch">&#9888; SURFACE SEISMIC ACTIVITY DETECTED</div>
                <div class="flex gap-4">
                    <span>STATUS: SEALED</span>
                    <span id="system-clock">${timeNow}</span>
                    <span>${CURRENT_DATE}</span>
                </div>
            </div>
        </div>
    </div>`;
}

function renderModalWindow() {
    const app = APPS[window.state.activeApp];
    return `
    <div class="absolute inset-0 z-40 bg-black flex flex-col items-center text-shadow-glow text-green-500 p-3 md:p-6">
        <div class="w-full max-w-5xl shrink-0">
            <div class="text-base md:text-xl tracking-widest leading-tight">ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</div>
            <div class="text-base md:text-xl tracking-widest leading-tight">${app.title}</div>
            <div class="border-b border-green-500 mt-2"></div>
        </div>
        <div class="flex-1 min-h-0 w-full max-w-5xl overflow-hidden relative">
            ${app.render()}
        </div>
        <div class="w-full max-w-5xl shrink-0 pt-2 border-t border-green-500 flex justify-between text-sm md:text-lg">
            <button onclick="closeApp()" class="menu-button">&lt; [ESC] BACK</button>
            <span>VAULT 254</span>
        </div>
    </div>`;
}
