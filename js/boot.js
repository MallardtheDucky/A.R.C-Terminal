const BOOT_TEXT_FULL = [
    "VAULT-TEC BIOS v6.21",
    "COPYRIGHT 2077 ROBCO INDUSTRIES",
    "INITIALIZING HARDWARE...",
    "> CPU_MAIN (ZAX-PC) ... OK",
    "> MEMORY_BANK_0 ... OK",
    "> MEMORY_BANK_1 ... OK",
    "> CRYOGENIC CONTROLS ... LINKED",
    "> WATER CHIP ... DETECTED",
    "LOADING OS...",
    "MOUNTING DRIVE: A.R.C. ARCHIVE ... DONE",
    "CONNECTING TO NETWORK: LOCAL VAULT 254 ... DONE",
    " ",
    "WELCOME, OVERSEER CALDWELL.",
    "REMINDER: RECLAMATION DAY IS PENDING.",
    "STARTING DESKTOP ENVIRONMENT..."
];
function appendBootLine(line) {
    const log = document.getElementById('boot-log');
    if (!log) return;
    const row = document.createElement('div');
    row.className = 'mb-1';
    row.textContent = line;
    log.appendChild(row);
}

function initBootProcess() {
    if (window.bootInterval) clearInterval(window.bootInterval);
    let lineIndex = 0;
    window.bootInterval = setInterval(() => {
        if (lineIndex < BOOT_TEXT_FULL.length) {
            const line = BOOT_TEXT_FULL[lineIndex];
            window.state.bootLog.push(line);
            appendBootLine(line);
            const bar = document.getElementById('boot-progress');
            if (bar) bar.style.width = Math.round(((lineIndex + 1) / BOOT_TEXT_FULL.length) * 100) + '%';
            lineIndex++;
        } else {
            clearInterval(window.bootInterval);
            setTimeout(() => window.setState({ booted: true }), 1200);
        }
    }, 220);
}

function renderBootSequence() {
    return `
        <div class="h-full w-full p-4 md:p-8 flex justify-center bg-black">
            <div class="w-full max-w-2xl flex flex-col h-full">
                <div class="flex-1 min-h-0 flex flex-col items-center justify-center gap-3">
                    <img src="assets/loading.gif?v=5" alt="" class="max-h-full w-full max-w-xs object-contain">
                    <div class="text-lg md:text-xl tracking-widest">LOADING<span class="animate-blink">_</span></div>
                    <div class="w-full max-w-xs h-2 border border-green-500">
                        <div id="boot-progress" class="h-full bg-green-500" style="width: 0%"></div>
                    </div>
                </div>
                <div id="boot-log" class="shrink-0 h-32 overflow-hidden flex flex-col justify-end text-sm md:text-lg text-green-500"></div>
            </div>
        </div>
    `;
}
