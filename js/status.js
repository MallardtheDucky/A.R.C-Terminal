function renderStatusApp() {
    const { selectedSensor } = window.state.status;
    if (selectedSensor) {
        return renderEnhancedSensorDetail(selectedSensor);
    }
    return `
    <div class="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 custom-scrollbar">
        <div class="border border-green-600 bg-green-900/10 p-4">
            <h3 class="text-green-400 font-bold mb-4 flex items-center gap-2"><i data-lucide="users" width="16"></i> POPULATION</h3>
            <div class="grid grid-cols-3 gap-2 text-center">
                <div class="bg-black/40 p-2 rounded">
                    <div class="text-2xl font-bold text-green-500">880</div>
                    <div class="text-[10px] text-green-700">ACTIVE</div>
                </div>
                <div class="bg-black/40 p-2 rounded border border-blue-900/50">
                    <div class="text-2xl font-bold text-blue-400">120</div>
                    <div class="text-[10px] text-blue-700">FROZEN</div>
                </div>
                <div class="bg-black/40 p-2 rounded border border-red-900/30">
                    <div class="text-2xl font-bold text-red-500">6</div>
                    <div class="text-[10px] text-red-700">SICK</div>
                </div>
            </div>
            <div class="mt-4 text-[10px] text-green-600 font-mono">
                GENETIC DIVERSITY: <span class="text-yellow-500">CONCERNING</span>
            </div>
        </div>
        <div class="border border-green-600 bg-green-900/10 p-4">
            <h3 class="text-green-400 font-bold mb-4 flex items-center gap-2"><i data-lucide="zap" width="16"></i> REACTOR</h3>
            <div class="h-4 w-full bg-black mb-2 border border-green-800 overflow-hidden">
                <div class="h-full bg-green-500 w-[98%] animate-pulse-slow"></div>
            </div>
            <div class="flex justify-between text-xs text-green-500 mb-2">
                <span>OUTPUT: 98.4%</span>
                <span class="text-yellow-500 animate-glitch">VIBRATION DETECTED</span>
            </div>
            <div class="text-[10px] text-green-700 leading-tight">
                Coolant Pump B showing signs of stress. Spare parts unavailable.
            </div>
        </div>
        <div class="col-span-1 md:col-span-2 border border-red-900/50 bg-red-900/5 p-4 relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-red-900/20 px-2 py-1 text-[10px] text-red-500 font-bold animate-pulse">ZONE RED</div>
            <h3 class="text-red-400 font-bold mb-4 flex items-center gap-2"><i data-lucide="radar" width="16"></i> SURFACE SENSORS</h3>
            <div class="grid grid-cols-3 gap-2">
                <button onclick="window.setState({ status: { selectedSensor: 'SEISMIC' } })" class="p-3 border border-red-900/30 hover:bg-red-900/20 hover:border-red-500 transition-all text-center relative overflow-hidden">
                    <div class="text-red-500 font-bold text-sm mb-1 z-10 relative">SEISMIC</div>
                    <div class="h-1 w-full bg-red-900/30 overflow-hidden"><div class="h-full bg-red-500 w-3/4 animate-pulse"></div></div>
                    <div class="text-[9px] text-red-400 mt-1 animate-glitch">HEAVY MOVEMENT</div>
                </button>
                <button onclick="window.setState({ status: { selectedSensor: 'RADIATION' } })" class="p-3 border border-red-900/30 hover:bg-red-900/20 hover:border-red-500 transition-all text-center">
                    <div class="text-red-500 font-bold text-sm mb-1">RADS</div>
                    <div class="h-1 w-full bg-red-900/30 overflow-hidden"><div class="h-full bg-red-500 w-full animate-pulse-slow"></div></div>
                    <div class="text-[9px] text-red-400 mt-1 animate-pulse">LETHAL SPIKES</div>
                </button>
                <button onclick="window.setState({ status: { selectedSensor: 'AUDIO' } })" class="p-3 border border-red-900/30 hover:bg-red-900/20 hover:border-red-500 transition-all text-center">
                    <div class="text-green-500 font-bold text-sm mb-1">AUDIO</div>
                    <div class="h-1 w-full bg-green-900/30 overflow-hidden"><div class="h-full bg-green-500 w-1/2 animate-pulse"></div></div>
                    <div class="text-[9px] text-green-400 mt-1">"GHOST SIGNAL"</div>
                </button>
            </div>
        </div>
         <div class="col-span-1 md:col-span-2 border border-green-800 bg-green-900/5 p-4">
             <div class="flex justify-between items-center mb-2 border-b border-green-800 pb-2">
                 <h3 class="text-green-500 font-bold text-xs uppercase">Supply Manifest</h3>
                 <span class="text-[10px] text-green-700">LAST AUDIT: TODAY</span>
             </div>
             <div class="grid grid-cols-2 gap-4">
                 <div>
                    <div class="text-[10px] text-green-600 mb-1 font-bold">AMMUNITION STORES</div>
                    <div class="space-y-1">
                        <div class="flex justify-between text-xs bg-green-900/20 p-1">
                            <span>10mm Rounds</span> <span class="text-green-400">75,240</span>
                        </div>
                        <div class="flex justify-between text-xs bg-green-900/20 p-1">
                            <span>5.56mm Rounds</span> <span class="text-yellow-500 font-bold animate-pulse">3,420 (LOW)</span>
                        </div>
                        <div class="flex justify-between text-xs bg-green-900/20 p-1">
                            <span>Fusion Cores</span> <span class="text-red-500 font-bold">18 (CRITICAL)</span>
                        </div>
                    </div>
                 </div>
                 <div>
                    <div class="text-[10px] text-green-600 mb-1 font-bold">ORGANIC SUSTENANCE</div>
                    <div class="space-y-1">
                        <div class="flex justify-between text-xs bg-green-900/20 p-1">
                            <span>Hydroponic Yield</span> <span class="text-green-400">92% Eff.</span>
                        </div>
                        <div class="flex justify-between text-xs bg-green-900/20 p-1">
                            <span>Water Chip</span> <span class="text-green-400">Stable</span>
                        </div>
                        <div class="flex justify-between text-xs bg-green-900/20 p-1">
                            <span>Ration Packs</span> <span class="text-yellow-500">4,200 Units</span>
                        </div>
                    </div>
                 </div>
             </div>
         </div>
    </div>`;
}
function renderEnhancedSensorDetail(type) {
    let title = '';
    let graph = '';
    let stats = '';
    let colorTheme = 'green';
    const hexLog = [...Array(9)].map(() => 
        `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0')} :: ${Math.random() > 0.5 ? 'READ' : 'WAIT'}`
    ).join('<br>');
    if (type === 'SEISMIC') {
        title = 'SEISMIC ACTIVITY MONITOR';
        colorTheme = 'red';
        const bars = [...Array(30)].map((_, i) => {
            const delay = Math.random() * 2;
            const duration = 0.5 + Math.random();
            return `<div class="sensor-bar w-2 mx-[1px]" style="animation: bar-dance ${duration}s infinite ease-in-out -${delay}s;"></div>`;
        }).join('');
        graph = `
        <div class="h-64 flex gap-2">
            <div class="flex-1 border border-red-900 bg-black/80 relative flex items-end justify-center p-2 overflow-hidden grid-bg">
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    <div class="w-32 h-32 rounded-full border border-red-500" style="animation: radar-spin 4s linear infinite"></div>
                    <div class="w-48 h-48 rounded-full border border-red-900 absolute"></div>
                </div>
                <div class="absolute top-2 left-2 text-[10px] text-red-500 font-mono animate-glitch">VIBRATION DETECTED: SECTOR 4</div>
                <div class="flex items-end h-full w-full justify-between z-10">
                    ${bars}
                </div>
            </div>
            <div class="sensor-log w-56 border border-red-900 bg-black text-[8px] text-red-700 font-mono p-1 leading-tight hidden md:block">
                <div class="opacity-50">RAW_DATA_STREAM</div>
                <div class="mt-2" style="animation: quick-flicker 2s infinite">${hexLog}</div>
            </div>
        </div>`;
        stats = `
        <div class="grid grid-cols-2 gap-4 text-xs font-mono text-red-400">
            <div class="border border-red-900/50 p-2">MAGNITUDE: <span class="text-red-500 font-bold text-lg animate-pulse">4.2</span></div>
            <div class="border border-red-900/50 p-2">EPICENTER: <span class="text-red-500">2km NORTH</span></div>
            <div class="border border-red-900/50 p-2">PATTERN: <span class="text-yellow-500 animate-glitch">RHYTHMIC (MARCHING)</span></div>
            <div class="border border-red-900/50 p-2">EST. MASS: <span class="text-red-500">>2000kg</span></div>
        </div>`;
    } 
    else if (type === 'AUDIO') {
        title = 'AUDIO SPECTRUM ANALYZER';
        colorTheme = 'green';
        const bars = [...Array(20)].map((_, i) => {
             const height = Math.random() * 100;
             return `<div class="sensor-bar w-full border-t-2 border-green-300" style="height: ${height}%; animation: bar-dance ${0.2 + Math.random()*0.5}s infinite alternate;"></div>`;
        }).join('');
        graph = `
        <div class="h-64 flex gap-2">
            <div class="flex-1 border border-green-900 bg-black/80 relative p-4 grid-bg">
                <div class="absolute top-2 right-2 text-[10px] text-green-500 animate-pulse">LIVE FEED</div>
                <div class="flex items-end h-full gap-1">
                    ${bars}
                </div>
            </div>
            <div class="sensor-log w-56 border border-green-900 bg-black text-[8px] text-green-700 font-mono p-1 leading-tight hidden md:block">
                <div class="opacity-50">DECRYPTION_LOG</div>
                <div class="mt-2">${hexLog}</div>
            </div>
        </div>`;
        stats = `
        <div class="grid grid-cols-2 gap-4 text-xs font-mono text-green-400">
            <div class="border border-green-900/50 p-2">SIGNAL: <span class="text-green-300 font-bold animate-glitch">ENCLAVE_RADIO_LOOP</span></div>
            <div class="border border-green-900/50 p-2">CONFIDENCE: <span class="text-green-300">98%</span></div>
            <div class="border border-green-900/50 p-2">ORIGIN: <span class="text-yellow-500">UNKNOWN</span></div>
            <div class="border border-green-900/50 p-2">STATUS: <span class="text-red-500 animate-glitch">DECRYPTING...</span></div>
        </div>`;
    }
    else if (type === 'RADIATION') {
        title = 'GEIGER COUNTER HISTORY';
        colorTheme = 'yellow';
         const bars = [...Array(40)].map((_, i) => {
             let h = 10 + Math.random() * 20;
             if (i > 30) h += 50;
             let color = h > 50 ? 'bg-red-500' : 'bg-yellow-500';
             return `<div class="flex-1 ${color} mx-[1px]" style="height: ${h}%;"></div>`;
        }).join('');
        graph = `
         <div class="h-64 flex gap-2">
            <div class="flex-1 border border-yellow-900 bg-black/80 relative p-2 flex items-end grid-bg">
                <div class="absolute inset-0 bg-yellow-500/5 animate-pulse"></div>
                <div class="absolute top-2 left-2 text-[10px] text-red-500 font-bold animate-blink">DANGER: HIGH LEVELS</div>
                ${bars}
            </div>
            <div class="sensor-log w-56 border border-yellow-900 bg-black text-[8px] text-yellow-700 font-mono p-1 leading-tight hidden md:block">
                <div class="opacity-50">RAD_DOSIMETER</div>
                <div class="mt-2">${hexLog}</div>
            </div>
        </div>`;
        stats = `
        <div class="grid grid-cols-2 gap-4 text-xs font-mono text-yellow-500">
            <div class="border border-yellow-900/50 p-2">CURRENT: <span class="text-red-500 font-bold text-lg animate-glitch">450 RADS</span></div>
            <div class="border border-yellow-900/50 p-2">TREND: <span class="text-red-500">RISING RAPIDLY</span></div>
            <div class="border border-yellow-900/50 p-2">SAFE LIMIT: <span class="text-green-400">50 RADS</span></div>
            <div class="border border-yellow-900/50 p-2">WIND: <span class="text-yellow-200">SW 15mph (FROM CRATER)</span></div>
        </div>`;
    }
    return `
    <div class="flex flex-col h-full p-4 animate-fade-in">
        <button onclick="window.setState({ status: { selectedSensor: null } })" class="mb-4 flex items-center gap-2 text-${colorTheme}-500 hover:text-white w-fit text-sm">
            <i data-lucide="arrow-left" width="16"></i> RETURN TO SENSORS
        </button>
        <div class="border-2 border-${colorTheme}-700 p-4 flex-1 flex flex-col bg-black/80 relative overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div class="flex justify-between items-center mb-4 border-b border-${colorTheme}-800 pb-2">
                <h2 class="text-${colorTheme}-400 font-bold text-lg">${title}</h2>
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-${colorTheme}-500 animate-pulse-slow"></div>
                    <span class="text-[10px] text-${colorTheme}-500">ONLINE</span>
                </div>
            </div>
            ${graph}
            <div class="mt-4 border-t border-${colorTheme}-800 pt-4">
                ${stats}
            </div>
             <div class="mt-auto pt-4 text-[10px] text-${colorTheme}-700 font-mono flex justify-between">
                <span>SENSOR ID: SENS-${type}-001</span>
                <span class="animate-glitch">NO CONNECTION TO NETWORK</span>
            </div>
        </div>
    </div>`;
}
