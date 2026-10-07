function renderTerminalApp() {
    const { path, viewingFile, unlocked, unlockTarget, unlockInput, cmdLog, cmdInput, hacking } = window.state.terminal;
    if (hacking) return renderHackApp(hacking);
    const currentFolder = FILE_SYSTEM[path[path.length - 1]];
    if (unlockTarget) {
        return `
        <div class="flex flex-col items-center justify-center h-full p-8 text-center bg-black">
            <div class="border border-red-900 bg-red-900/10 p-8 max-w-sm w-full">
                <i data-lucide="lock" width="48" class="text-red-500 mb-4 mx-auto animate-pulse-slow"></i>
                <h3 class="text-red-500 font-bold text-xl mb-4 tracking-widest">RESTRICTED AREA</h3>
                <div class="text-xs text-red-700 mb-6">SECURITY CLEARANCE: OMEGA REQ.</div>
                <input id="term-input" type="password" value="${unlockInput}" 
                    onkeydown="if(event.key === 'Enter') attemptUnlock()" 
                    class="bg-black border border-red-500 text-red-500 p-2 text-center focus:outline-none uppercase text-lg w-full mb-4" 
                    placeholder="PASSWORD" autofocus>
                <button onclick="window.setState({ terminal: { hacking: '${unlockTarget}', unlockTarget: null, unlockInput: '' } })" class="w-full mb-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black py-2 font-bold tracking-widest">&gt; OVERRIDE (HACK TERMINAL)</button>
                <div class="flex gap-2">
                    <button onclick="window.setState({ terminal: { unlockTarget: null, unlockInput: '' } })" class="flex-1 border border-red-900 text-red-700 hover:text-red-500 py-2">CANCEL</button>
                    <button onclick="attemptUnlock()" class="flex-1 bg-red-900/30 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black py-2 font-bold">ACCESS</button>
                </div>
                <div id="unlock-msg" class="mt-4 h-4 text-red-500 font-bold text-xs"></div>
            </div>
        </div>`;
    }
    if (viewingFile) {
        const file = FILE_SYSTEM[viewingFile];
        return `
        <div class="flex flex-col h-full p-4 bg-[#050505]">
            <div class="flex justify-between items-center mb-4 border-b border-green-800 pb-2">
                <div class="flex flex-col">
                    <span class="text-green-400 font-bold text-lg uppercase">${file.name}</span>
                    <span class="text-[10px] text-green-700">AUTHOR: SYSTEM | SIZE: 4KB</span>
                </div>
                <button onclick="window.setState({ terminal: { viewingFile: null } })" class="text-xs border border-green-600 text-green-600 px-3 py-1 hover:bg-green-500 hover:text-black transition-colors">CLOSE</button>
            </div>
            <div class="flex-1 overflow-y-auto custom-scrollbar p-2 border border-green-900/30 bg-green-900/5">
                <pre class="whitespace-pre-wrap font-mono text-green-400 text-sm leading-relaxed">${file.content}</pre>
            </div>
        </div>`;
    }
    const pathDisplay = path.map(id => `/${FILE_SYSTEM[id].name}`).join('');
    const children = currentFolder.children.map(childId => {
        const item = FILE_SYSTEM[childId];
        const isLocked = item.locked && !unlocked.includes(childId);
        const icon = item.type === 'folder' ? (isLocked ? 'lock' : 'folder') : 'file-text';
        const color = isLocked ? 'text-red-500' : (item.type === 'folder' ? 'text-yellow-500' : 'text-green-400');
        return `
        <button onclick="handleTerminalClick('${childId}')" class="flex items-center gap-3 p-3 border border-transparent hover:border-green-800 hover:bg-green-900/10 transition-all text-left group w-full">
            <i data-lucide="${icon}" width="18" class="${color} group-hover:scale-110 transition-transform"></i>
            <div class="flex-1 min-w-0">
                <div class="font-bold text-sm truncate ${isLocked ? 'text-red-400' : 'text-green-300'}">${item.name}</div>
                <div class="text-[10px] text-green-800 uppercase">${item.type}</div>
            </div>
            ${isLocked ? '<i data-lucide="shield-alert" width="14" class="text-red-500"></i>' : ''}
        </button>`;
    }).join('');
    return `
    <div class="flex flex-col h-full p-4">
        <div class="flex items-center gap-2 mb-4 text-xs text-green-500 border-b border-green-800 pb-2 overflow-x-auto shrink-0 font-mono">
            <span class="text-green-700">ROOT:</span> ${pathDisplay}
            ${path.length > 1 ? `<button onclick="window.setState({ terminal: { path: window.state.terminal.path.slice(0, -1) } })" class="ml-auto hover:text-white px-2 border border-green-800">BACK</button>` : ''}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto custom-scrollbar flex-1 content-start">
            ${children}
        </div>
        <div class="mt-4 pt-2 border-t border-green-800 h-1/3 flex flex-col bg-black">
            <div class="text-[10px] text-green-700 mb-1 flex justify-between">
                <span>TERMINAL EMULATOR</span>
                <span>USER: OVERSEER</span>
            </div>
            <div id="terminal-log" class="flex-1 overflow-y-auto custom-scrollbar text-xs font-mono text-green-500/80 mb-2 p-1 font-bold">
                ${cmdLog.map(line => `<div>${line}</div>`).join('')}
            </div>
            <div class="flex items-center gap-2 text-green-500 bg-green-900/10 p-1">
                <span class="font-bold">&gt;</span>
                <input id="cmd-input" type="text" class="terminal-input font-bold" value="${cmdInput}" 
                    oninput="window.state.terminal.cmdInput = this.value" 
                    onkeydown="if(event.key === 'Enter') handleTerminalCommand(this.value)"
                    autocomplete="off" spellcheck="false" autofocus>
            </div>
        </div>
    </div>`;
}
