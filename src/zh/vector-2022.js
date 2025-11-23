function loadGHGadget(github) {
    mw.loader.load(`//fastly.jsdelivr.net/gh/${github}.min.js`);
}

function loadMyGadget(mygadget) {
    loadGHGadget(`Saoutax/MWGadgets@main/dist/${mygadget}`);
}

function loadUserGadget(pagename) {
    mw.loader.load(`//mzh.moegirl.org.cn/index.php?title=${pagename}&action=raw&ctype=text/javascript`);
}

// eslint-disable-next-line no-undef
if (namespace === 2) {
    loadUserGadget("User:AnnAngela/js/userStatus.js"); // 快速更改个人状态
}

loadMyGadget("DiscussionBoardLinks"); // 讨论版快捷链接