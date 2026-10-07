document.addEventListener('keydown', (e) => {
    const { booted, activeApp } = window.state;
    if (!booted) return;
    if (window.state.terminal.hacking) return; // hack game handles its own keys
    if (e.key === 'Escape' && activeApp === 'map' && window.state.map.selectedRoom) {
        window.setState({ map: { selectedRoom: null } });
    } else if (e.key === 'Escape' && activeApp) {
        closeApp();
    } else if (!activeApp && e.key === 'ArrowDown') {
        e.preventDefault();
        selectMenu((window.menuIndex + 1) % MENU_ITEMS.length);
    } else if (!activeApp && e.key === 'ArrowUp') {
        e.preventDefault();
        selectMenu((window.menuIndex + MENU_ITEMS.length - 1) % MENU_ITEMS.length);
    } else if (!activeApp && e.key === 'Enter') {
        window.setState({ activeApp: MENU_ITEMS[window.menuIndex].app });
    } else if (!activeApp && MENU_ITEMS[Number(e.key) - 1]) {
        window.setState({ activeApp: MENU_ITEMS[Number(e.key) - 1].app });
    }
});

window.addEventListener('DOMContentLoaded', () => {
    renderApp();
});
