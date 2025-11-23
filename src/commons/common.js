const namespace = mw.config.get("wgNamespaceNumber");
const special = mw.config.get("wgCanonicalSpecialPageName");
const title = mw.config.get("wgTitle");

function loadGHGadget(github) {
    mw.loader.load(`//fastly.jsdelivr.net/gh/${github}.min.js`);
}

function loadMyGadget(mygadget) {
    loadGHGadget(`Saoutax/MWGadgets@main/dist/${mygadget}`);
}

function loadBearGadget(beargadget) {
    loadGHGadget(`BearBin1215/MoegirlPedia@master/dist/gadgets/${beargadget}`);
}

function loadUserGadget(pagename) {
    mw.loader.load(`//mzh.moegirl.org.cn/index.php?title=${pagename}&action=raw&ctype=text/javascript`);
}

if (namespace === -1) {
    switch (special || title) {
    case "BulkMove":
        loadBearGadget("BulkMove"); // BulkMove批量移动
        break;
    case "MassDelete":
        loadUserGadget("User:星海子/js/MassDelete.js"); // 批量挂删
        break;
    case "Movepage": {
        // 移动原因
        const reasons = [
            ["消歧义", "[[萌娘共享:页面命名指引|消歧义]]"],
            ["主站命名"],
            ["讨论版申请"],
        ];
        $("#wpReason").after($("<div id=\"move-reason\" style=\"margin-top: .3em\"></div>")
            .append(reasons.map(function (reason) {
                return $("<a title=\"" + (reason[1] || reason[0]) + "\">" + reason[0] + "</a>").on("click", function () {
                    $("#wpReason input").val(reason[1] || reason[0]);
                });
            }).reduce(function (acc, cur, index) {
                if (index !== 0) {
                    acc.push("丨");
                }
                return acc.concat(cur);
            }, [])));
        break;
    }
    }
} else if (namespace === 14) {
    loadBearGadget("Cat-in-Tree"); // 递归查询子分类
    loadUserGadget("User:穆斯塔法凯末尔/Cat-a-lot.js"); // Cat-a-lot
} else if (namespace === 6) {
    loadBearGadget("FileUsedNotLinked"); // FileUsedNotLinked
}

loadBearGadget("CtrlS"); // Ctrl+S快速保存
loadBearGadget("ListEnhancer"); // ListEnhancer
loadUserGadget("User:Nzh21/js/QuickDiff.js"); //快速差异
loadMyGadget("DisabledRedlink"); // 移除红链编辑跳转
loadGHGadget("Saoutax/MediaWikiTools@main/src/CategoryFileInspector");

// 添加侧边栏入口
[
    ["BulkMove", "BulkMove"],
    ["MassDelete", "批量挂删"],
].forEach(function (gadget) {
    if (title !== gadget[0]) {
        mw.loader.using("mediawiki.util").then(function () {
            mw.util.addPortletLink("p-tb", "/Special:" + gadget[0], gadget[1], "t-" + gadget[0].toLowerCase());
        });
    }
});

/** InPageEdit Preferences */
(window.InPageEdit = window.InPageEdit || {}).myPreference = {
    "doNotCollectMyInfo": false,
    "editMinor": true,
    "editSummary": "$section // Edit via InPageEdit",
    "lockToolBox": false,
    "redLinkQuickEdit": false,
    "outSideClose": true,
    "watchList": "preferences",
    "noConfirmEdit": true,
    "plugins": [
        "toolbox.js",
        "wiki-editor.js",
        "quick-thank.js",
        "color-preview.js",
        "code-mirror/cm6.js",
        "edit-any-page.js",
        "fix-double-entrance.js"
    ]
};
loadGHGadget("MoegirlPediaInterfaceAdmins/MoegirlPediaInterfaceCodes@master/src/gadgets/InPageEdit-v2/Gadget-InPageEdit-v2");