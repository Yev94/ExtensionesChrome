window.onload = async () => {
    const src = chrome.runtime.getURL("/modules/changePageTheme.js");
    const changePageTheme = await import(src);

    let changeTheme = new changePageTheme.changePageTheme();
    changeTheme.activate();
}
