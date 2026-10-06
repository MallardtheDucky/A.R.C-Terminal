document.addEventListener('keydown', (e) => {
    const { booted, activeApp } = window.state;
    if (!booted) return;
    if (e.key === 'Escape' && activeApp) {
        closeApp();
    } else if (!activeApp && MENU_ITEMS[Number(e.key) - 1]) {
        window.setState({ activeApp: MENU_ITEMS[Number(e.key) - 1].app });
    }
});

window.addEventListener('DOMContentLoaded', () => {
    renderApp();
});
