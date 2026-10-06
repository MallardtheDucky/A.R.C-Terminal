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
        <div class="h-full w-full p-6 md:p-12 flex flex-col bg-black">
            <div class="flex-1 min-h-0 flex flex-col items-center justify-center gap-4">
                <img src="assets/loading.gif" alt="" class="max-h-full max-w-full md:max-w-3xl object-contain">
                <div class="text-2xl md:text-4xl tracking-widest">LOADING<span class="animate-blink">_</span></div>
                <div class="w-full max-w-xl h-3 border border-green-500">
                    <div id="boot-progress" class="h-full bg-green-500" style="width: 0%"></div>
                </div>
            </div>
            <div id="boot-log" class="shrink-0 h-40 overflow-hidden flex flex-col justify-end text-lg md:text-2xl text-green-500"></div>
        </div>
    `;
}
