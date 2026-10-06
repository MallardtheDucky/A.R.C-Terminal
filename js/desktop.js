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

function renderMainInterface() {
    const timeNow = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const items = MENU_ITEMS.map((item, i) => `
        <button onclick="window.setState({ activeApp: '${item.app}' })" class="menu-item">[${i + 1}] ${item.label}</button>
    `).join('');

    return `
    <div id="desktop-interface" class="h-full flex flex-col p-5 md:p-12">
        <div class="flex items-center gap-6">
            <img src="assets/logo.png" alt="A.R.C." class="h-16 md:h-28 w-auto shrink-0">
            <div class="text-xl md:text-3xl leading-tight tracking-widest">
                <div>ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM</div>
                <div>COPYRIGHT 2075-2077 ROBCO INDUSTRIES</div>
                <div>-SERVER 1-</div>
                <div class="mt-3">VAULT 254 // A.R.C. OVERSEER TERMINAL</div>
            </div>
        </div>
        <div class="border-b-2 border-green-500 my-5"></div>
        <div class="flex-1 overflow-y-auto custom-scrollbar max-w-3xl">
            ${items}
        </div>
        <div class="border-t-2 border-green-500 pt-3 flex flex-wrap justify-between gap-2 text-lg md:text-2xl">
            <div class="animate-glitch text-yellow-500">&#9888; SURFACE SEISMIC ACTIVITY DETECTED</div>
            <div class="flex gap-6">
                <span>STATUS: SEALED</span>
                <span id="system-clock">${timeNow}</span>
                <span>${CURRENT_DATE}</span>
            </div>
        </div>
    </div>`;
}

function renderModalWindow() {
    const app = APPS[window.state.activeApp];
    return `
    <div class="absolute inset-0 z-40 bg-black flex flex-col text-shadow-glow text-green-500">
        <div class="flex justify-between items-center px-4 md:px-8 py-3 border-b-2 border-green-500 shrink-0">
            <div class="text-xl md:text-3xl tracking-widest">ROBCO TERMLINK // ${app.title}</div>
            <button onclick="closeApp()" class="menu-button text-lg md:text-2xl">[ESC] BACK</button>
        </div>
        <div class="flex-1 overflow-hidden relative">
            ${app.render()}
        </div>
    </div>`;
}
