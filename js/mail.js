function renderMailApp() {
    const { selectedEmailId } = window.state.mail;
    const selected = EMAILS.find(e => e.id === selectedEmailId);
    const listHtml = EMAILS.map(email => `
        <button onclick="window.setState({ mail: { selectedEmailId: '${email.id}' } })" 
            class="w-full text-left p-3 border-b border-green-900 hover:bg-green-900/20 transition-colors group ${selectedEmailId === email.id ? 'bg-green-900/40 border-l-2 border-l-green-400' : ''}">
            <div class="flex justify-between items-start mb-1">
                <div class="font-bold text-green-300 text-xs w-2/3 truncate ${selectedEmailId === email.id ? 'text-green-100' : ''}">${email.from}</div>
                <div class="text-[10px] text-green-700">${email.date}</div>
            </div>
            <div class="text-xs text-green-600 truncate group-hover:text-green-400">${email.subject}</div>
        </button>
    `).join('');
    const detailHtml = selected ? `
        <div class="flex flex-col h-full animate-fade-in">
            <div class="md:hidden mb-2">
                <button onclick="window.setState({ mail: { selectedEmailId: null } })" class="text-xs flex items-center gap-1 text-green-500 border border-green-800 px-2 py-1">
                    <i data-lucide="arrow-left" width="12"></i> INBOX
                </button>
            </div>
            <div class="bg-green-900/10 border border-green-800 p-4 mb-4">
                <div class="grid grid-cols-[60px_1fr] gap-1 text-xs">
                    <span class="text-green-700">FROM:</span> <span class="text-green-300 font-bold">${selected.from}</span>
                    <span class="text-green-700">TO:</span> <span class="text-green-300">${selected.to}</span>
                    <span class="text-green-700">DATE:</span> <span class="text-green-300">${selected.date}</span>
                </div>
                <div class="border-t border-green-900 mt-2 pt-2 text-sm md:text-base font-bold text-green-100">
                    ${selected.subject}
                </div>
            </div>
            <div class="flex-1 overflow-y-auto custom-scrollbar p-2">
                <div class="text-green-400 whitespace-pre-wrap font-mono text-sm leading-relaxed max-w-2xl">${selected.body}</div>
            </div>
            <div class="mt-4 pt-2 border-t border-green-900 text-[10px] text-green-800 flex justify-between">
                <span>SECURE TRANSMISSION</span>
                <span>VAULT-TEC INTRANET</span>
            </div>
        </div>
    ` : `<div class="h-full flex flex-col items-center justify-center text-green-800">
            <i data-lucide="mail" width="64" class="mb-4 opacity-20"></i>
            <div class="text-sm tracking-widest">SELECT MESSAGE</div>
         </div>`;
    return `
    <div class="flex h-full">
        <div class="w-full md:w-1/3 border-r border-green-800 overflow-y-auto custom-scrollbar ${selectedEmailId ? 'hidden md:block' : 'block'}">
            ${listHtml}
        </div>
        <div class="flex-1 p-4 bg-black overflow-hidden ${!selectedEmailId ? 'hidden md:block' : 'block'}">
            ${detailHtml}
        </div>
    </div>`;
}
