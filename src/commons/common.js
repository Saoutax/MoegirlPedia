mw.loader.load("https://mzh.moegirl.org.cn/index.php?title=User:BearBin/js/CtrlS.js&action=raw&ctype=text/javascript"); //Ctrl+S快速保存
mw.loader.load("https://mzh.moegirl.org.cn/index.php?title=User:Nzh21/js/QuickDiff.js&action=raw&ctype=text/javascript"); //快速差异
mw.loader.load("https://mzh.moegirl.org.cn/index.php?title=User:BearBin/js/ListEnhancer.js&action=raw&ctype=text/javascript"); //ListEnhancer
mw.loader.load("/index.php?title=User:穆斯塔法凯末尔/Cat-a-lot.js&action=raw&ctype=text/javascript");
mw.loader.load("https://mzh.moegirl.org.cn/index.php?title=User:BearBin/js/FileUsedNotLinked.js&action=raw&ctype=text/javascript");
mw.loader.load("https://mzh.moegirl.org.cn/index.php?title=User:BearBin/js/BulkMove.js&action=raw&ctype=text/javascript");
mw.loader.load("//fastly.jsdelivr.net/gh/Saoutax/MediaWikiTools@main/src/CategoryFileInspector.min.js");
mw.loader.load("//fastly.jsdelivr.net/gh/Saoutax/MWGadgets@main/dist/DisabledRedlink.min.js");
mw.loader.load("https://mzh.moegirl.org.cn/index.php?title=User:星海子/js/MassDelete.js&action=raw&ctype=text/javascript");
window.MassDelete = true;

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
mw.loader.load("https://testingcf.jsdelivr.net/npm/mediawiki-inpageedit@latest");
mw.hook("InPageEdit").add((ctx) => {
    const InPageEdit = ctx.InPageEdit,
        _msg = ctx._msg,
        wgPageName = mw.config.get("wgRelevantPageName"),
        wgRevisionId = mw.config.get("wgRevisionId");
    switch (mw.config.get("skin")) {
    case "vector-2022": {
        $("#ca-edit").after(
            $("<li>", {
                id: "ca-quick-edit",
                "class": "vector-tab-noicon mw-list-item",
            }).append(
                $("<a>", {
                    href: "javascript:void(0)",
                    text: typeof Wikiplus !== "undefined" ? `${_msg("quick-edit")}(IPE)` : _msg("quick-edit"),
                }).on("click", () => {
                    InPageEdit.quickEdit({
                        page: wgPageName,
                        revision: wgRevisionId || undefined,
                    });
                }),
            ),
        );
        break;
    }
    case "moeskin":
    default: {
        mw.hook("moeskin.pagetools").add(({ addPageToolsButton }) => {
            const $btn = addPageToolsButton("<span style=\"align-self:center;font:0.7em bold;\">IPE</span>", "快速编辑");
            $btn.attr({
                id: "ca-inpageedit",
                href: "javascript:void(0)",
            }).on("click", () => {
                InPageEdit.quickEdit({
                    page: wgPageName,
                    revision: wgRevisionId || undefined,
                });
            });
        });
        $(".page-tool-link#ca-inpageedit").insertAfter($(".page-tool-link#ca-edit"));
        break;
    }
    }
    $(".mw-history-compareselectedversions button").addClass("cdx-button");
});

// 移动原因
if (mw.config.get("wgCanonicalSpecialPageName") === "Movepage") {
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
}
