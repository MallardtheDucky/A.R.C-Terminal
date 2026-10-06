function renderMapApp() {
    const { selectedRoom } = window.state.map;
    let overlay = '';
    if (selectedRoom) {
        overlay = `
        <div class="absolute inset-0 z-30 flex flex-col p-4 animate-fade-in modal-solid-bg">
            <div class="flex justify-between items-center mb-4 border-b-2 border-green-500 pb-2 bg-black/50">
                <div class="flex items-center gap-3">
                    <div class="bg-green-500 text-black font-bold px-2 py-1 text-xs uppercase">ARCHITECT VIEW</div>
                    <h3 class="font-bold text-green-400 text-xl tracking-wider uppercase">${selectedRoom.name}</h3>
                </div>
                <button onclick="window.setState({ map: { selectedRoom: null } })" class="hover:bg-green-900/50 p-1 rounded transition-colors border border-transparent hover:border-green-500"><i data-lucide="x" width="24" class="text-green-500"></i></button>
            </div>
            <div class="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
                <div class="col-span-1 border-2 border-green-900/50 bg-black relative p-4 flex flex-col items-center justify-center min-h-[200px]">
                    <div class="absolute top-2 left-2 text-[10px] text-green-700">SCHEMATIC_RENDER_V2</div>
                    <div class="w-32 h-32 border-2 border-green-500/30 rotate-45 flex items-center justify-center relative">
                         <div class="absolute w-full h-[1px] bg-green-900 top-1/2 -translate-y-1/2"></div>
                         <div class="absolute h-full w-[1px] bg-green-900 left-1/2 -translate-x-1/2"></div>
                         <div class="w-16 h-16 border border-green-500/50"></div>
                         ${selectedRoom.alert ? '<div class="absolute inset-0 bg-red-500/10 animate-pulse"></div>' : ''}
                    </div>
                    <div class="mt-8 w-full">
                        <div class="flex justify-between text-[10px] text-green-600 mb-1">
                            <span>INTEGRITY</span>
                            <span>${selectedRoom.status === 'OK' ? '100%' : '84%'}</span>
                        </div>
                        <div class="h-1 bg-green-900 w-full"><div class="h-full ${selectedRoom.status === 'OK' ? 'bg-green-500' : 'bg-red-500'} w-[${selectedRoom.status === 'OK' ? '100%' : '84%'}]"></div></div>
                    </div>
                    <div class="mt-2 w-full">
                        <div class="flex justify-between text-[10px] text-green-600 mb-1">
                            <span>POWER DRAW</span>
                            <span>${Math.floor(Math.random() * 500) + 120} kWh</span>
                        </div>
                        <div class="h-1 bg-green-900 w-full"><div class="h-full bg-yellow-500 w-[45%]"></div></div>
                    </div>
                </div>
                <div class="col-span-1 md:col-span-2 flex flex-col gap-4">
                     <div class="grid grid-cols-2 gap-4">
                        <div class="border border-green-800 bg-green-900/10 p-3">
                            <div class="text-green-600 text-[9px] font-bold uppercase mb-1">OPERATIONAL STATUS</div>
                            <div class="text-xl font-mono ${selectedRoom.status === 'OK' ? 'text-green-400' : (selectedRoom.status === 'CRITICAL' || selectedRoom.status === 'SEALED' ? 'text-red-500' : 'text-yellow-500')}">
                                ${selectedRoom.status}
                            </div>
                        </div>
                        <div class="border border-green-800 bg-green-900/10 p-3">
                            <div class="text-green-600 text-[9px] font-bold uppercase mb-1">PERSONNEL COUNT</div>
                            <div class="text-xl font-mono text-green-400">
                                ${selectedRoom.personnel || 'N/A'}
                            </div>
                        </div>
                    </div>
                    <div class="border-l-2 border-green-600 pl-4 py-2 bg-green-900/5">
                         <div class="text-green-600 text-[9px] font-bold uppercase">DEPARTMENT HEAD</div>
                         <div class="text-green-300 font-bold text-lg">${selectedRoom.head}</div>
                         <div class="text-green-700 text-xs mt-1 uppercase tracking-wider">[ ${selectedRoom.faction} FACTION ]</div>
                    </div>
                    <div class="flex-1">
                        <div class="text-green-600 text-[10px] font-bold mb-2 border-b border-green-900 pb-1">SYSTEM LOGS & DESCRIPTION</div>
                        <div class="font-mono text-sm text-green-400 leading-relaxed whitespace-pre-wrap">${selectedRoom.desc}</div>
                    </div>
                    ${selectedRoom.alert ? `
                    <div class="bg-red-900/20 border-l-4 border-red-500 p-3 mt-2">
                        <div class="text-red-500 text-[10px] font-bold flex items-center gap-2">
                            <i data-lucide="alert-triangle" width="12"></i> ACTIVE ALERT
                        </div>
                        <div class="text-red-400 text-xs mt-1 animate-glitch">${selectedRoom.alert}</div>
                    </div>` : ''}
                    <div class="mt-auto pt-4 flex justify-between items-end border-t border-green-900">
                        <div class="text-[10px] text-green-800 font-mono">
                            LAST MAINTENANCE: ${CURRENT_DATE}<br>
                            TECH ID: #44-291
                        </div>
                        <div class="text-xs border border-green-700 px-2 py-1 text-green-600">
                            ACCESS LEVEL: 3
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
    const RoomBtn = (name, status, head, faction, desc, alert = null, cols = 1, personnel = '0') => {
        const safeName = name.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        const safeHead = head.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        const safeFaction = faction.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        const safeDesc = desc.replace(/'/g, "\\'").replace(/"/g, "&quot;").replace(/\n/g, "\\n");
        const safeAlert = alert ? alert.replace(/'/g, "\\'").replace(/"/g, "&quot;") : '';
        let statusColor = 'text-green-800';
        let borderColor = 'border-green-800';
        if (status !== 'OK') {
            statusColor = status === 'SEALED' || status === 'CRITICAL' ? 'text-red-500' : 'text-yellow-500';
            borderColor = status === 'SEALED' || status === 'CRITICAL' ? 'border-red-900' : 'border-yellow-900';
        }
        return `
        <button onclick="window.setState({ map: { selectedRoom: { name: '${safeName}', status: '${status}', head: '${safeHead}', faction: '${safeFaction}', desc: '${safeDesc}', alert: '${safeAlert}', personnel: '${personnel}' } } })" 
            class="border ${borderColor} bg-green-900/5 hover:bg-green-500/10 p-3 text-left relative group min-h-[80px] col-span-${cols} transition-all flex flex-col justify-between">
            <div class="flex justify-between items-start w-full">
                <div class="text-[10px] font-bold text-green-500 group-hover:text-green-300 uppercase">${name}</div>
                <i data-lucide="maximize-2" width="10" class="text-green-700 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </div>
            <div>
                <div class="text-[9px] text-green-700 uppercase mb-1 truncate">${head}</div>
                <div class="text-[9px] ${statusColor} font-bold animate-pulse">${status}</div>
            </div>
            <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-600 opacity-50"></div>
        </button>`;
    };
    return `
    <div class="h-full flex flex-col relative overflow-hidden">
        ${overlay}
        <div class="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <div class="max-w-4xl mx-auto space-y-12">
                <div class="relative">
                    <div class="absolute -left-6 top-0 bottom-0 border-l-2 border-dashed border-green-900"></div>
                    <h3 class="text-xs text-green-500 font-bold border-b border-green-900 mb-4 flex justify-between">
                        <span>LEVEL 1: ADMINISTRATION</span>
                        <span class="text-green-800">-50 METERS</span>
                    </h3>
                    <div class="grid grid-cols-4 gap-3">
                        ${RoomBtn('VAULT DOOR', 'SEALED', 'Overseer Eyes Only', 'Loyalists', 'The Great Seal (Model 77-A). Main hydraulic mechanisms verified intact. \\n\\nExternal sensors indicate lethal radiation levels in the immediate vestibule area (Zone 0). \\n\\nDefense Protocols: Automated turrets active. Camouflage netting requires replacement.', 'DOOR SEALED FOR 198 YEARS', 2, '0 (Auto)')}
                        ${RoomBtn('SECURITY ARMORY', 'OK', 'Chief Roland Drake', 'The Guards', 'Inventory Audit: \\n- 20 T-45d Power Armor Suits (10 Operational, 10 for parts)\\n- 200 R91 Assault Rifles\\n- 150 10mm Pistols\\n- 100 Security Batons\\n\\nCRITICAL: No energy weapon capability. Ballistic ammo conservation is mandatory.', null, 1, '12')}
                        ${RoomBtn('OVERSEER OFFICE', 'RESTRICTED', 'Vincent Caldwell', 'Loyalists', 'Executive command center. Direct uplink to central mainframe. Access to Reclamation Day protocols. Contains "The Black Book" (Vault-Tec Executive Summary).', 'BIOMETRIC LOCK ENGAGED', 1, '3')}
                    </div>
                </div>
                <div class="relative">
                    <div class="absolute -left-6 top-0 bottom-0 border-l-2 border-dashed border-green-900"></div>
                    <h3 class="text-xs text-green-500 font-bold border-b border-green-900 mb-4 flex justify-between">
                        <span>LEVEL 2: HABITATION</span>
                        <span class="text-green-800">-100 METERS</span>
                    </h3>
                    <div class="grid grid-cols-4 gap-3">
                        ${RoomBtn('ATRIUM', 'OK', 'Public Area', 'Neutral', 'Central gathering hub (Capacity: 500). LED sky-ceiling currently simulating "Overcast Afternoon" to reduce power consumption. Community notice board full of "Educator" flyers.', null, 4, '142')}
                        ${RoomBtn('EDUCATION', 'BUSY', 'Daniel Cross', 'Educators', 'Classrooms 1-4. Current Curriculum: "The Resource Wars: Why We Failed." \\n\\nStudents are undergoing G.O.A.T. prep. Head Instructor Cross has requested revised history holotapes regarding the Enclave.', 'REVISIONIST HISTORY DETECTED', 1, '45')}
                        ${RoomBtn('CAFETERIA', 'OK', 'Chef Handy Unit', 'Neutral', 'Serving: Algae Paste (Day 442). Coffee rations exhausted in 2274. \\n\\nMr. Handy unit "Chef Pierre" is requesting oil bath.', null, 1, '8')}
                        ${RoomBtn('QUARTERS A', 'OK', 'Housing Manager', 'Neutral', 'Staff housing block. Capacity 100%. Air filtration requires filter change in Block C.', null, 1, '320')}
                        ${RoomBtn('CLINIC', 'BUSY', 'Dr. James Morrison', 'Loyalists', 'Patient Load High. Tracking "Grey Drift" genetic anomalies in Generation 6 children. \\n\\nStimpak supply synthesis is stable. RadAway stocks: High. \\nEquipment: 4 Auto-Docs (3 Operational).', 'GENETIC DRIFT WARNING', 1, '18')}
                    </div>
                </div>
                <div class="relative">
                    <div class="absolute -left-6 top-0 bottom-0 border-l-2 border-dashed border-green-900"></div>
                    <h3 class="text-xs text-green-500 font-bold border-b border-green-900 mb-4 flex justify-between">
                        <span>LEVEL 3: ENGINEERING</span>
                        <span class="text-green-800">-200 METERS</span>
                    </h3>
                    <div class="grid grid-cols-4 gap-3">
                        ${RoomBtn('REACTOR', 'WARNING', 'Natasha Volkova', 'Innovators', 'General Atomics V-Series Nuclear Generator. Output 98.4%. Est. Fuel Lifespan: 800 Years. \\n\\nISSUE: Secondary Coolant Pump vibration ("The Heartbeat") is worsening. Volkova has requested permission to scavenge parts from Level 4.', 'VIBRATION DETECTED', 1, '15')}
                        ${RoomBtn('HYDROPONICS', 'OK', 'Lawrence Ashford', 'Preservationists', 'Three-level hydroponic bays. LED growth lights at 85% intensity. \\n\\nYield is nominal. Ashford reports slight mold growth in Sector 3 due to humidity controls. Producing: Tatoes, Mutfruit, Carrots, Medicinal Herbs.', null, 1, '60')}
                        ${RoomBtn('WATER PURIFICATION', 'CRITICAL', 'Auto-Sys', 'Neutral', 'Water Chip Model 2077-B functioning within parameters. Source: Mountain spring aquifer. \\n\\nWARNING: This is the LAST functional chip. No backups available. Failure results in total colony dehydration in 4 days.', 'SINGLE POINT OF FAILURE', 1, '2')}
                        ${RoomBtn('WORKSHOP', 'OK', 'Eng. Team', 'Innovators', 'Fabricating 10mm rounds and basic tools. \\n\\nT-45d repair bay active. Robot repair station offline due to lack of fusion pulse regulators. Cannot manufacture new robots.', null, 1, '22')}
                    </div>
                </div>
                <div class="relative">
                    <div class="absolute -left-6 top-0 bottom-0 border-l-2 border-dashed border-red-900/50"></div>
                    <h3 class="text-xs text-red-500 font-bold border-b border-red-900 mb-4 flex justify-between">
                        <span>LEVEL 4: RESTRICTED</span>
                        <span class="text-red-800">-400 METERS</span>
                    </h3>
                    <div class="grid grid-cols-4 gap-3 p-3 border border-red-900/30 bg-red-900/5">
                        ${RoomBtn('CRYO CONTROL', 'OK', 'Dr. Morrison', 'Loyalists', 'Monitoring station for 120 Executive Pods. Liquid Nitrogen levels holding. Backup generators primed.', null, 2, '5')}
                        ${RoomBtn('PODS 001-119', 'STABLE', 'Vault-Tec Execs', 'Frozen', 'Occupants: Board of Directors & Senior VPs. \\nVital signs nominal. Brain wave activity: Delta Sleep. Awakening protocol ready on Overseer command.', null, 1, '119')}
                        ${RoomBtn('POD 089', 'CRITICAL', 'S. Calvin (VP)', 'Frozen', 'Executive V.P. S. Calvin. \\n\\nWARNING: Neural decay detected. Subject appears to be experiencing "Freezer Burn" nightmares. Thaw recommended immediately.', 'NEURAL DECAY DETECTED', 1, '1')}
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 bg-black border-t border-green-900 flex justify-between items-center text-[10px] text-green-800">
            <div class="flex gap-4">
                <span>O2 LEVELS: 98%</span>
                <span>TEMP: 22°C</span>
                <span>PRESSURE: 101kPa</span>
            </div>
            <div class="animate-marquee whitespace-nowrap overflow-hidden w-1/3 text-right text-green-900">
                *** ALERT: SEISMIC TREMORS DETECTED IN SECTOR 4 *** REPORT ALL ANOMALIES TO SECURITY ***
            </div>
        </div>
    </div>`;
}
