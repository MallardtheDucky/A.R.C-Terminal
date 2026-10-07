function findChild(folder, query) {
    const q = query.trim().toUpperCase();
    if (!q) return null;
    const items = folder.children.map(id => FILE_SYSTEM[id]);
    return items.find(i => i.name.toUpperCase() === q || i.id.toUpperCase() === q)
        || items.find(i => i.name.toUpperCase().startsWith(q))
        || items.find(i => i.name.toUpperCase().includes(q))
        || null;
}

window.handleTerminalCommand = (raw) => {
    const { terminal } = window.state;
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    if (!cmd) return;
    const arg = rest.join(' ');
    const folder = FILE_SYSTEM[terminal.path[terminal.path.length - 1]];
    let response = [];
    let patch = {};
    let clear = false;

    switch (cmd.toLowerCase()) {
        case 'help':
            response = ['COMMANDS: LS, CD [DIR], CD .., OPEN [FILE], CLEAR, DATE, STATUS, WHOAMI, UNLOCK, HACK [LOCKED DIR], RECLAIM'];
            break;
        case 'ls':
            response = [folder.children.map(id => FILE_SYSTEM[id].name).join('  ')];
            break;
        case 'cd': {
            if (arg === '..') {
                if (terminal.path.length > 1) patch.path = terminal.path.slice(0, -1);
                else response = ['ALREADY AT ROOT.'];
                break;
            }
            const target = findChild(folder, arg);
            if (!target) response = [`ERROR: DIRECTORY '${arg.toUpperCase()}' NOT FOUND.`];
            else if (target.type !== 'folder') response = ['ERROR: NOT A DIRECTORY.'];
            else if (target.locked && !terminal.unlocked.includes(target.id)) {
                patch.unlockTarget = target.id;
                patch.unlockInput = '';
                response = ['ACCESS RESTRICTED. PASSWORD REQUIRED.'];
            } else patch.path = [...terminal.path, target.id];
            break;
        }
        case 'open': {
            const target = findChild(folder, arg);
            if (!target) response = [`ERROR: FILE '${arg.toUpperCase()}' NOT FOUND.`];
            else if (target.type !== 'file') response = ['ERROR: NOT A FILE. USE CD.'];
            else patch.viewingFile = target.id;
            break;
        }
        case 'clear':
            clear = true;
            break;
        case 'date':
            response = [CURRENT_DATE];
            break;
        case 'whoami':
            response = ['OVERSEER VINCENT CALDWELL', 'CLEARANCE: OMEGA'];
            break;
        case 'reclaim':
            response = ['INITIATING RECLAMATION DAY PROTOCOL...', 'ERROR: MASTER KEYCARD REQUIRED.', 'ERROR: SURFACE VIABILITY < 10%'];
            break;
        case 'hack': {
            const locked = folder.children.map(id => FILE_SYSTEM[id]).filter(i => i.locked && !terminal.unlocked.includes(i.id));
            const target = arg ? findChild(folder, arg) : locked[0];
            if (!target) response = [arg ? `ERROR: '${arg.toUpperCase()}' NOT FOUND.` : 'NO LOCKED TARGETS IN THIS DIRECTORY.'];
            else if (!target.locked || terminal.unlocked.includes(target.id)) response = ['TARGET IS NOT SECURED.'];
            else { patch.hacking = target.id; response = ['INITIATING OVERRIDE...']; }
            break;
        }
        case 'unlock':
            response = ['USAGE: CD [LOCKED FOLDER] FOR PASSWORD PROMPT, OR HACK [LOCKED FOLDER].'];
            break;
        case 'status':
            response = ['VAULT 254: SEALED', 'POPULATION: 1000', 'POWER: 98%', 'WATER: STABLE'];
            break;
        default:
            response = [`ERROR: COMMAND '${cmd.toUpperCase()}' UNKNOWN.`];
    }

    let log = clear ? [] : [...terminal.cmdLog, `> ${raw}`, ...response];
    if (log.length > 50) log = log.slice(log.length - 50);
    window.setState({ terminal: { ...patch, cmdLog: log, cmdInput: '' } });
};

window.handleTerminalClick = (id) => {
    const item = FILE_SYSTEM[id];
    const { unlocked, path } = window.state.terminal;
    if (item.type === 'file') {
        window.setState({ terminal: { viewingFile: id } });
    } else if (item.locked && !unlocked.includes(id)) {
        window.setState({ terminal: { unlockTarget: id, unlockInput: '' } });
    } else {
        window.setState({ terminal: { path: [...path, id] } });
    }
};

window.attemptUnlock = () => {
    const { unlockTarget, unlocked, path } = window.state.terminal;
    const input = document.getElementById('term-input');
    const value = (input ? input.value : '').trim().toLowerCase();
    if (CONFIG.restrictedPasswords.includes(value)) {
        window.setState({
            terminal: {
                unlocked: [...unlocked, unlockTarget],
                path: [...path, unlockTarget],
                unlockTarget: null,
                unlockInput: ''
            }
        });
    } else {
        const msg = document.getElementById('unlock-msg');
        if (msg) {
            msg.textContent = 'ACCESS DENIED: INCORRECT CREDENTIALS';
            setTimeout(() => { msg.textContent = ''; }, 2000);
        }
        if (input) {
            input.value = '';
            input.focus();
        }
    }
};
