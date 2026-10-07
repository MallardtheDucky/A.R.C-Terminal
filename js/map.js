/* ============================================================
   FACILITY SCHEMATICS  -  VAULT 254
   Tab 1: cross-section of the vault (clickable rooms)
   Tab 2: surface scan (wasteland map with contacts)
   Artwork: Vault Boy / S.P.E.C.I.A.L. icons and map from the MIT-licensed
   MegaZegan/PipBoy-3000-Interface repo on GitHub (tinted phosphor green).
   ============================================================ */
const IMG = (n) => `assets/img/${n}`;

const ROOMS = [
    // LEVEL 1
    { id: 'door', lvl: 1, name: 'VAULT DOOR', status: 'SEALED', head: 'Overseer Eyes Only', faction: 'Loyalists', icon: 'radiation.png', personnel: '0 (AUTO)', rad: 14.2,
      desc: 'The Great Seal (Model 77-A). Main hydraulic mechanisms verified intact.\n\nExternal sensors indicate lethal radiation levels in the immediate vestibule area (Zone 0).\n\nDefense Protocols: Automated turrets active. Camouflage netting requires replacement.', alert: 'DOOR SEALED FOR 198 YEARS', x: 40, w: 150 },
    { id: 'armory', lvl: 1, name: 'SECURITY ARMORY', status: 'OK', head: 'Chief Roland Drake', faction: 'The Guards', icon: 'pistol.png', personnel: '12', rad: 0.1,
      desc: 'Inventory Audit:\n- 20 T-45d Power Armor Suits (10 Operational, 10 for parts)\n- 200 R91 Assault Rifles\n- 150 10mm Pistols\n- 100 Security Batons\n\nCRITICAL: No energy weapon capability. Ballistic ammo conservation is mandatory.', alert: null, x: 196, w: 170 },
    { id: 'overseer', lvl: 1, name: 'OVERSEER OFFICE', status: 'RESTRICTED', head: 'Vincent Caldwell', faction: 'Loyalists', icon: 'perception.png', personnel: '3', rad: 0.1,
      desc: 'Executive command center. Direct uplink to central mainframe. Access to Reclamation Day protocols. Contains "The Black Book" (Vault-Tec Executive Summary).', alert: 'BIOMETRIC LOCK ENGAGED', x: 372, w: 180 },
    // LEVEL 2
    { id: 'atrium', lvl: 2, name: 'ATRIUM', status: 'OK', head: 'Public Area', faction: 'Neutral', icon: 'charisma.png', personnel: '142', rad: 0.1,
      desc: 'Central gathering hub (Capacity: 500). LED sky-ceiling currently simulating "Overcast Afternoon" to reduce power consumption. Community notice board full of "Educator" flyers.', alert: null, x: 40, w: 104 },
    { id: 'education', lvl: 2, name: 'EDUCATION', status: 'BUSY', head: 'Daniel Cross', faction: 'Educators', icon: 'intelligence.png', personnel: '45', rad: 0.1,
      desc: 'Classrooms 1-4. Current Curriculum: "The Resource Wars: Why We Failed."\n\nStudents are undergoing G.O.A.T. prep. Head Instructor Cross has requested revised history holotapes regarding the Enclave.', alert: 'REVISIONIST HISTORY DETECTED', x: 150, w: 104 },
    { id: 'cafeteria', lvl: 2, name: 'CAFETERIA', status: 'OK', head: 'Chef Handy Unit', faction: 'Neutral', icon: 'vault-boy-walk.png', personnel: '8', rad: 0.1,
      desc: 'Serving: Algae Paste (Day 442). Coffee rations exhausted in 2274.\n\nMr. Handy unit "Chef Pierre" is requesting oil bath.', alert: null, x: 260, w: 104 },
    { id: 'quarters', lvl: 2, name: 'QUARTERS A', status: 'OK', head: 'Housing Manager', faction: 'Neutral', icon: 'luck.png', personnel: '320', rad: 0.1,
      desc: 'Staff housing block. Capacity 100%. Air filtration requires filter change in Block C.', alert: null, x: 370, w: 90 },
    { id: 'clinic', lvl: 2, name: 'CLINIC', status: 'BUSY', head: 'Dr. James Morrison', faction: 'Loyalists', icon: 'strength.png', personnel: '18', rad: 0.1,
      desc: 'Patient Load High. Tracking "Grey Drift" genetic anomalies in Generation 6 children.\n\nStimpak supply synthesis is stable. RadAway stocks: High.\nEquipment: 4 Auto-Docs (3 Operational).', alert: 'GENETIC DRIFT WARNING', x: 466, w: 86 },
    // LEVEL 3
    { id: 'reactor', lvl: 3, name: 'REACTOR', status: 'WARNING', head: 'Natasha Volkova', faction: 'Innovators', icon: 'bolt.png', personnel: '15', rad: 1.8,
      desc: 'General Atomics V-Series Nuclear Generator. Output 98.4%. Est. Fuel Lifespan: 800 Years.\n\nISSUE: Secondary Coolant Pump vibration ("The Heartbeat") is worsening. Volkova has requested permission to scavenge parts from Level 4.', alert: 'VIBRATION DETECTED', x: 40, w: 126 },
    { id: 'hydro', lvl: 3, name: 'HYDROPONICS', status: 'OK', head: 'Lawrence Ashford', faction: 'Preservationists', icon: 'luck.png', personnel: '60', rad: 0.1,
      desc: 'Three-level hydroponic bays. LED growth lights at 85% intensity.\n\nYield is nominal. Ashford reports slight mold growth in Sector 3 due to humidity controls. Producing: Tatoes, Mutfruit, Carrots, Medicinal Herbs.', alert: null, x: 172, w: 126 },
    { id: 'water', lvl: 3, name: 'WATER PURIFICATION', status: 'CRITICAL', head: 'Auto-Sys', faction: 'Neutral', icon: 'agility.png', personnel: '2', rad: 0.1,
      desc: 'Water Chip Model 2077-B functioning within parameters. Source: Mountain spring aquifer.\n\nWARNING: This is the LAST functional chip. No backups available. Failure results in total colony dehydration in 4 days.', alert: 'SINGLE POINT OF FAILURE', x: 304, w: 126 },
    { id: 'workshop', lvl: 3, name: 'WORKSHOP', status: 'OK', head: 'Eng. Team', faction: 'Innovators', icon: 'vault-boy.png', personnel: '22', rad: 0.2,
      desc: 'Fabricating 10mm rounds and basic tools.\n\nT-45d repair bay active. Robot repair station offline due to lack of fusion pulse regulators. Cannot manufacture new robots.', alert: null, x: 436, w: 116 },
    // LEVEL 4
    { id: 'cryo', lvl: 4, name: 'CRYO CONTROL', status: 'OK', head: 'Dr. Morrison', faction: 'Loyalists', icon: 'crosshair.png', personnel: '5', rad: 0.1,
      desc: 'Monitoring station for 120 Executive Pods. Liquid Nitrogen levels holding. Backup generators primed.', alert: null, x: 40, w: 170 },
    { id: 'pods', lvl: 4, name: 'PODS 001-119', status: 'STABLE', head: 'Vault-Tec Execs', faction: 'Frozen', icon: 'vault-boy-walk.png', personnel: '119', rad: 0.1,
      desc: 'Occupants: Board of Directors & Senior VPs.\nVital signs nominal. Brain wave activity: Delta Sleep. Awakening protocol ready on Overseer command.', alert: null, x: 216, w: 170 },
    { id: 'pod89', lvl: 4, name: 'POD 089', status: 'CRITICAL', head: 'S. Calvin (VP)', faction: 'Frozen', icon: 'radiation.png', personnel: '1', rad: 0.1,
      desc: 'Executive V.P. S. Calvin.\n\nWARNING: Neural decay detected. Subject appears to be experiencing "Freezer Burn" nightmares. Thaw recommended immediately.', alert: 'NEURAL DECAY DETECTED', x: 392, w: 160 },
];
const LEVELS = [
    { n: 1, name: 'ADMINISTRATION', depth: '-50 M', y: 92 },
    { n: 2, name: 'HABITATION', depth: '-100 M', y: 192 },
    { n: 3, name: 'ENGINEERING', depth: '-200 M', y: 292 },
    { n: 4, name: 'RESTRICTED', depth: '-400 M', y: 392 },
];
const SURFACE_CONTACTS = [
    { id: 'vault', name: 'VAULT 254', x: 47, y: 56, kind: 'home', text: 'Home. Blast door sealed 198 years. Surface vestibule radiation: lethal.' },
    { id: 'ghost', name: 'GHOST SIGNAL', x: 30, y: 33, kind: 'signal', text: 'Repeating transmission, 14.7 MHz. Not static: a march cadence. Source believed to be organized settlement or military column.' },
    { id: 'march', name: 'MARCHING SIGNATURE', x: 66, y: 41, kind: 'hostile', text: 'Rhythmic seismic returns, mass > 2000 kg. Bearing 042, closing ~1.2 km/day.' },
    { id: 'sector7', name: 'SECTOR 7 RAD SPIKE', x: 58, y: 72, kind: 'rad', text: 'Radiation spikes of 40+ Sv/hr recorded. Source unknown. Drones advised against.' },
    { id: 'ruins', name: 'COLLAPSED CITY', x: 22, y: 64, kind: 'ruin', text: 'Pre-war settlement, visual confirmation via old satellite relay. No life signs.' },
    { id: 'tower', name: 'RELAY TOWER 9', x: 78, y: 24, kind: 'signal', text: 'Pre-war communications relay. Still broadcasting an emergency tone.' },
];

function roomStatusClass(s) {
    if (s === 'SEALED' || s === 'CRITICAL') return { text: 'text-red-500', border: '#ef4444', fill: 'rgba(239,68,68,.10)' };
    if (s === 'OK' || s === 'STABLE') return { text: 'text-green-400', border: '#1aff6e', fill: 'rgba(26,255,110,.07)' };
    return { text: 'text-yellow-500', border: '#eab308', fill: 'rgba(234,179,8,.09)' };
}
function roomSeed(id) { let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

window.selectRoom = (id) => window.setState({ map: { selectedRoom: id } });
window.setMapTab = (tab) => window.setState({ map: { tab, selectedRoom: null, selectedContact: null } });
window.selectContact = (id) => window.setState({ map: { selectedContact: id } });

function renderRoomOverlay(room) {
    const st = roomStatusClass(room.status);
    const seed = roomSeed(room.id);
    const integrity = room.status === 'OK' || room.status === 'STABLE' ? 100 : room.status === 'CRITICAL' ? 61 : 84;
    const power = 120 + (seed % 380);
    const powerPct = Math.min(100, Math.round(power / 5));
    const radPct = Math.min(100, Math.round(room.rad * 7));
    const temp = (18 + (seed % 50) / 10).toFixed(1);
    const bar = (label, val, pct, color) => `
        <div class="mt-3 w-full">
            <div class="flex justify-between text-[10px] text-green-600 mb-1"><span>${label}</span><span>${val}</span></div>
            <div class="h-2 bg-green-900/60 w-full border border-green-900"><div class="h-full" style="width:${pct}%;background:${color}"></div></div>
        </div>`;
    return `
    <div class="absolute inset-0 z-30 flex flex-col p-4 animate-fade-in modal-solid-bg">
        <div class="flex justify-between items-center mb-4 border-b-2 border-green-500 pb-2">
            <div class="flex items-center gap-3">
                <div class="bg-green-500 text-black font-bold px-2 py-1 text-xs uppercase">LEVEL ${room.lvl}</div>
                <h3 class="font-bold text-green-400 text-xl tracking-wider uppercase">${room.name}</h3>
            </div>
            <button onclick="window.setState({ map: { selectedRoom: null } })" class="menu-button text-sm">[ESC] CLOSE</button>
        </div>
        <div class="flex-1 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
            <div class="col-span-1 border-2 border-green-900/60 relative p-4 flex flex-col items-center min-h-[240px]" style="background:rgba(0,20,10,.5)">
                <div class="absolute top-2 left-2 text-[10px] text-green-700">PIP-IMG // ${room.id.toUpperCase()}_V3</div>
                <div class="absolute top-2 right-2 text-[10px] text-green-700">LVL ${room.lvl}</div>
                <div class="relative mt-5 mb-2 flex items-center justify-center" style="width:150px;height:150px">
                    <div class="absolute inset-0 border border-green-500/30 ring-round" style="animation: radar-spin 8s linear infinite;border-top-color:#1aff6e"></div>
                    <img src="${IMG(room.icon)}" alt="" style="max-width:110px;max-height:110px;object-fit:contain" class="${room.alert ? 'animate-pulse-slow' : ''}">
                </div>
                ${bar('INTEGRITY', integrity + '%', integrity, st.border)}
                ${bar('POWER DRAW', power + ' kWh', powerPct, '#eab308')}
                ${bar('RADIATION', room.rad.toFixed(1) + ' Sv/h', radPct, room.rad > 1 ? '#ef4444' : '#1aff6e')}
                <div class="mt-3 w-full flex justify-between text-[10px] text-green-600"><span>AMBIENT TEMP</span><span>${temp} &deg;C</span></div>
            </div>
            <div class="col-span-1 md:col-span-2 flex flex-col gap-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="border border-green-800 bg-green-900/10 p-3">
                        <div class="text-green-600 text-[10px] font-bold uppercase mb-1">OPERATIONAL STATUS</div>
                        <div class="text-xl ${st.text}">${room.status}</div>
                    </div>
                    <div class="border border-green-800 bg-green-900/10 p-3">
                        <div class="text-green-600 text-[10px] font-bold uppercase mb-1">PERSONNEL COUNT</div>
                        <div class="text-xl text-green-400">${room.personnel}</div>
                    </div>
                </div>
                <div class="border-l-2 border-green-600 pl-4 py-2 bg-green-900/5">
                    <div class="text-green-600 text-[10px] font-bold uppercase">DEPARTMENT HEAD</div>
                    <div class="text-green-300 font-bold text-lg">${room.head}</div>
                    <div class="text-green-700 text-xs mt-1 uppercase tracking-wider">[ ${room.faction} FACTION ]</div>
                </div>
                <div class="flex-1">
                    <div class="text-green-600 text-[10px] font-bold mb-2 border-b border-green-900 pb-1">SYSTEM LOGS &amp; DESCRIPTION</div>
                    <div class="text-sm text-green-400 leading-relaxed whitespace-pre-wrap">${room.desc}</div>
                </div>
                ${room.alert ? `
                <div class="bg-red-900/20 border-l-4 border-red-500 p-3">
                    <div class="text-red-500 text-[10px] font-bold">&#9888; ACTIVE ALERT</div>
                    <div class="text-red-400 text-sm mt-1 animate-glitch">${room.alert}</div>
                </div>` : ''}
                <div class="mt-auto pt-3 flex justify-between items-end border-t border-green-900">
                    <div class="text-[10px] text-green-800">LAST MAINTENANCE: ${CURRENT_DATE}<br>TECH ID: #44-${100 + (seed % 899)}</div>
                    <div class="text-xs border border-green-700 px-2 py-1 text-green-600">ACCESS LEVEL: 3</div>
                </div>
            </div>
        </div>
    </div>`;
}

function renderVaultSection() {
    // ---- SVG cross-section ----
    const roomsSvg = ROOMS.map(r => {
        const lvl = LEVELS[r.lvl - 1];
        const st = roomStatusClass(r.status);
        const y = lvl.y, h = 78, cx = r.x + r.w / 2;
        const label = r.name.length > 14 && r.w < 140 ? r.name.replace('WATER PURIFICATION', 'WATER PURIF.') : r.name;
        return `
        <g class="map-room" onclick="selectRoom('${r.id}')">
            <rect x="${r.x}" y="${y}" width="${r.w}" height="${h}" fill="${st.fill}" stroke="${st.border}" stroke-width="2"/>
            <image href="${IMG(r.icon)}" x="${cx - 17}" y="${y + 6}" width="34" height="34" preserveAspectRatio="xMidYMid meet"/>
            <text x="${cx}" y="${y + 54}" text-anchor="middle" font-size="13" fill="#1aff6e">${label}</text>
            <text x="${cx}" y="${y + 70}" text-anchor="middle" font-size="11" fill="${st.border}">${r.status}</text>
        </g>`;
    }).join('');
    const levelsSvg = LEVELS.map(l => `
        <line x1="30" y1="${l.y - 8}" x2="790" y2="${l.y - 8}" stroke="rgba(26,255,110,.18)" stroke-dasharray="4 6"/>
        <text x="590" y="${l.y + 14}" font-size="13" fill="#1aff6e">LVL ${l.n}</text>
        <text x="590" y="${l.y + 30}" font-size="11" fill="#0c8c3b">${l.name}</text>
        <text x="590" y="${l.y + 46}" font-size="11" fill="#0c8c3b">${l.depth}</text>`).join('');
    const svg = `
    <svg viewBox="0 0 800 510" class="w-full" style="max-height:62vh" xmlns="http://www.w3.org/2000/svg" font-family="Monofonto, VT323, monospace">
        <defs>
            <pattern id="rock" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8L8 0" stroke="rgba(26,255,110,.07)"/></pattern>
        </defs>
        <polygon points="0,80 30,70 90,40 150,62 230,28 330,58 420,36 520,64 620,44 700,66 800,60 800,510 0,510" fill="url(#rock)" stroke="rgba(26,255,110,.35)"/>
        <text x="410" y="22" text-anchor="middle" font-size="12" fill="#0c8c3b">SURFACE // RADIATION: LETHAL</text>
        <image href="${IMG('radiation.png')}" x="30" y="2" width="22" height="22"/>
        ${levelsSvg}
        <rect x="556" y="84" width="24" height="396" fill="none" stroke="rgba(26,255,110,.4)" stroke-dasharray="3 3"/>
        <text transform="translate(573 280) rotate(-90)" font-size="11" fill="#0c8c3b" text-anchor="middle">MAIN ELEVATOR SHAFT</text>
        ${roomsSvg}
        <rect x="16" y="100" width="10" height="60" fill="rgba(26,255,110,.5)"/>
        <text x="40" y="500" font-size="11" fill="#0c8c3b">CLICK ANY SECTION FOR DETAILS</text>
    </svg>`;

    // ---- Card grid by level ----
    const cards = LEVELS.map(l => {
        const rooms = ROOMS.filter(r => r.lvl === l.n);
        const red = l.n === 4;
        return `
        <div class="mt-6">
            <h3 class="text-sm ${red ? 'text-red-500 border-red-900' : 'text-green-500 border-green-900'} font-bold border-b mb-3 flex justify-between">
                <span>LEVEL ${l.n}: ${l.name}</span><span class="${red ? 'text-red-800' : 'text-green-800'}">${l.depth}</span>
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                ${rooms.map(r => {
                    const st = roomStatusClass(r.status);
                    return `
                    <button onclick="selectRoom('${r.id}')" class="room-card text-left p-3 flex gap-3 items-center" style="border:1px solid ${st.border}66;background:${st.fill}">
                        <img src="${IMG(r.icon)}" alt="" style="width:44px;height:44px;object-fit:contain;flex:none">
                        <div class="min-w-0">
                            <div class="text-sm font-bold text-green-400 uppercase leading-tight">${r.name}</div>
                            <div class="text-[10px] text-green-700 truncate">${r.head}</div>
                            <div class="text-[10px] font-bold ${st.text} ${r.status === 'OK' ? '' : 'animate-pulse'}">${r.status}</div>
                        </div>
                    </button>`;
                }).join('')}
            </div>
        </div>`;
    }).join('');
    return `<div class="max-w-4xl mx-auto">${svg}${cards}</div>`;
}

function renderSurfaceSection() {
    const { selectedContact } = window.state.map;
    const sel = SURFACE_CONTACTS.find(c => c.id === selectedContact) || SURFACE_CONTACTS[0];
    const colors = { home: '#1aff6e', signal: '#4dff8f', hostile: '#ef4444', rad: '#eab308', ruin: '#0c8c3b' };
    const dots = SURFACE_CONTACTS.map(c => `
        <button onclick="selectContact('${c.id}')" class="map-pin ${c.id === sel.id ? 'active' : ''}" style="left:${c.x}%;top:${c.y}%;--pin:${colors[c.kind]}" title="${c.name}">
            <span class="map-pin-dot"></span><span class="map-pin-label">${c.name}</span>
        </button>`).join('');
    return `
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-5">
        <div class="map-frame">
            <div class="map-sweep"></div>
            <img src="${IMG('wasteland-map.webp')}" alt="Surface scan" class="map-image">
            <div class="map-grid"></div>
            ${dots}
            <div class="absolute top-2 left-2 text-[10px] text-green-500">SAT-RELAY 3 // SURFACE SCAN</div>
            <div class="absolute bottom-2 right-2 text-[10px] text-green-500">GRID ${Math.round(sel.x * 10)}-${Math.round(sel.y * 10)}</div>
        </div>
        <div class="flex flex-col gap-3">
            <div class="border border-green-700 bg-green-900/10 p-4">
                <div class="text-[10px] text-green-600 font-bold">SELECTED CONTACT</div>
                <div class="text-xl text-green-300 font-bold tracking-wide">${sel.name}</div>
                <div class="text-sm text-green-400 mt-2 leading-snug">${sel.text}</div>
                <div class="text-[10px] text-green-700 mt-3">BEARING ${(roomSeed(sel.id) % 360).toString().padStart(3, '0')} // RANGE ${(sel.id === 'vault' ? 0 : 1 + (roomSeed(sel.id) % 90) / 10).toFixed(1)} KM</div>
            </div>
            <div class="border border-green-900 p-3">
                <div class="text-[10px] text-green-600 font-bold mb-2">CONTACT LIST</div>
                ${SURFACE_CONTACTS.map(c => `
                    <button onclick="selectContact('${c.id}')" class="w-full flex items-center gap-2 text-left px-1 py-[2px] hover:bg-green-900/30 ${c.id === sel.id ? 'bg-green-900/40' : ''}">
                        <span style="display:inline-block;width:9px;height:9px;background:${colors[c.kind]};box-shadow:0 0 6px ${colors[c.kind]}"></span>
                        <span class="text-sm text-green-400">${c.name}</span>
                    </button>`).join('')}
            </div>
            <div class="border border-yellow-900/60 bg-yellow-900/5 p-3 flex items-center gap-3">
                <img src="${IMG('radiation.png')}" alt="" style="width:40px;height:40px" class="animate-pulse-slow">
                <div>
                    <div class="text-[10px] text-yellow-600 font-bold">SURFACE RADIATION INDEX</div>
                    <div class="text-lg text-yellow-500">LETHAL // 14.2 Sv/h</div>
                </div>
            </div>
        </div>
    </div>`;
}

function renderMapApp() {
    const { selectedRoom, tab } = window.state.map;
    const room = ROOMS.find(r => r.id === selectedRoom);
    const t = tab || 'vault';
    const tabBtn = (id, label) => `<button onclick="setMapTab('${id}')" class="map-tab ${t === id ? 'active' : ''}">${t === id ? '&gt; ' : ''}${label}</button>`;
    return `
    <div class="h-full flex flex-col relative overflow-hidden">
        ${room ? renderRoomOverlay(room) : ''}
        <div class="flex gap-4 px-2 pt-2 pb-1 border-b border-green-900 shrink-0">
            ${tabBtn('vault', 'VAULT CROSS-SECTION')}
            ${tabBtn('surface', 'SURFACE SCAN')}
        </div>
        <div class="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-5">
            ${t === 'vault' ? renderVaultSection() : renderSurfaceSection()}
        </div>
        <div class="p-2 border-t border-green-900 flex justify-between items-center text-sm text-green-700 shrink-0">
            <div class="flex gap-4"><span>O2: 98%</span><span>TEMP: 22&deg;C</span><span>PRESSURE: 101kPa</span></div>
            <div class="animate-marquee whitespace-nowrap overflow-hidden w-1/3 text-right text-green-800">*** ALERT: SEISMIC TREMORS DETECTED IN SECTOR 4 *** REPORT ALL ANOMALIES TO SECURITY ***</div>
        </div>
    </div>`;
}
