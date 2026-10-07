window.state = {
    loggedIn: false,
    booted: false,
    bootLog: [],
    activeApp: null, 
    terminal: {
        path: ['root'],
        viewingFile: null,
        unlocked: [],
        unlockTarget: null,
        unlockInput: '',
        hacking: null,
        cmdLog: ['Welcome to ROBCO Terminal v3.5', 'Type "help" for commands.'],
        cmdInput: ''
    },
    mail: {
        selectedEmailId: null,
    },
    map: {
        selectedRoom: null,
        tab: 'vault',
        selectedContact: null,
    },
    status: {
        selectedSensor: null, 
    }
};
window.setState = (newState) => {
    let shouldRender = false;
    Object.keys(newState).forEach(key => {
        if (JSON.stringify(window.state[key]) !== JSON.stringify(newState[key])) {
            if (typeof newState[key] === 'object' && newState[key] !== null && !Array.isArray(newState[key]) && window.state[key]) {
                window.state[key] = { ...window.state[key], ...newState[key] };
            } else {
                window.state[key] = newState[key];
            }
            shouldRender = true;
        }
    });
    if (shouldRender) renderApp();
};
setInterval(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const clockEl = document.getElementById('system-clock');
    if (clockEl) clockEl.innerText = timeString;
}, 1000);
