const namespace = mw.config.get("wgNamespaceNumber");
const special = mw.config.get("wgCanonicalSpecialPageName");
const title = mw.config.get("wgTitle");
const action = mw.config.get("wgAction");
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
    case "Export":
      loadBearGadget("ExportXML");
      break;
    case "MassEdit":
      loadBearGadget("MassEdit");
      break;
    case "BulkMove":
      loadBearGadget("BulkMove");
      break;
    case "MassMove":
      loadUserGadget("User:星海子/js/MassMove.js");
      break;
    case "BatchSend":
      loadBearGadget("BatchSend");
      break;
    case "MassDelete":
      loadUserGadget("User:星海子/js/MassDelete.js");
      break;
    // case "TextDiff":
    //     loadBearGadget("TextDiff"); // 文本差异比较
    //     break;
    case "Search":
      loadBearGadget("AdvancedSearch");
      break;
    case "Newpages":
      loadBearGadget("NewpagesCat");
      break;
    case "Contributions":
      loadMyGadget("MassRollback");
      break;
    case "Movepage": {
      const reasons = [
        ["无需消歧义", "[[萌娘百科:消歧义方针|无需消歧义]]"],
        ["需要消歧义", "[[萌娘百科:消歧义方针|需要消歧义]]"],
        ["简体中文优先", "[[萌娘百科:条目命名指引#简体中文优先原则|简体中文优先]]"],
        ["官方名称优先", "[[萌娘百科:条目命名指引#官方名称优先原则|官方名称优先]]"],
        ["错误命名"],
        ["常用名称"]
      ];
      $("#wpReason").after(
        $('<div id="move-reason" style="margin-top: .3em"></div>').append(reasons.map(function(reason) {
          return $('<a title="' + (reason[1] || reason[0]) + '">' + reason[0] + "</a>").on("click", function() {
            $("#wpReason input").val(reason[1] || reason[0]);
          });
        }).reduce(function(acc, cur, index) {
          if (index !== 0) {
            acc.push("丨");
          }
          return acc.concat(cur);
        }, []))
      );
      break;
    }
    default:
      loadGHGadget("GuoPCinGitHub/MGP@master/js/ModIconPrep");
      break;
  }
} else if (namespace === 14) {
  loadBearGadget("Cat-in-Tree");
  loadUserGadget("User:穆斯塔法凯末尔/Cat-a-lot.js");
} else {
  switch (action) {
    case "edit":
    case "submit":
      loadBearGadget("Excel2Wiki");
      loadBearGadget("CtrlS");
      break;
    case "view":
      loadBearGadget("ShowContributors");
      loadBearGadget("LyricStyleToggle");
      loadBearGadget("OneKeyPurge");
      loadMyGadget("CleanUserpage");
      loadMyGadget("CleanPreload");
      loadMyGadget("DisambigHelper");
      loadMyGadget("CopyImglink");
      loadMyGadget("ExtImgRestore");
      loadMyGadget("WordCount");
      loadGHGadget("GuoPCinGitHub/MGP@master/js/TSIndicator");
      loadGHGadget("lovelyCARDINAL/wikitool@main/searchLinks");
      break;
  }
}
loadBearGadget("ListEnhancer");
loadBearGadget("VNTools");
loadUserGadget("User:Nzh21/js/QuickDiff.js");
loadMyGadget("QuickUndo");
if (special !== "Recentchanges") {
  loadMyGadget("DisabledRedlink");
}
[
  ["BulkMove", "BulkMove"],
  ["MassMove", "MassMove"],
  ["MassEdit", "批量编辑"],
  ["ExportXML", "导出页面"],
  ["BatchSend", "群发讨论"],
  ["MassDelete", "批量挂删"]
  // ["TextDiff", "文本差异"],
].forEach(function(gadget) {
  if (title !== gadget[0]) {
    mw.loader.using("mediawiki.util").then(function() {
      mw.util.addPortletLink("p-tb", "/Special:" + gadget[0], gadget[1], "t-" + gadget[0].toLowerCase());
    });
  }
});
$('img[srcset*=".svg.png"]').each(function(_, ele) {
  if ($(ele).attr("srcset").indexOf("img.moegirl.org.cn/") > -1) {
    $(ele).attr("src", $(ele).attr("src").replace(/thumb\//g, "").replace(/\.svg\/.*/g, ".svg"));
    $(ele).attr("srcset", $(ele).attr("srcset").replace(/thumb\//g, "").replace(/\.svg\/[^ ]*/g, ".svg"));
  }
});
$("img[data-lazy-src*='.svg.png']").each(function(_, ele) {
  if ($(ele).attr("data-lazy-src").indexOf("img.moegirl.org.cn/") > -1) {
    var dataLazySrcset = $(ele).attr("data-lazy-srcset");
    $(ele).attr("src", $(ele).attr("data-lazy-src").replace(/thumb\//g, "").replace(/\.svg\/.*/g, ".svg")).attr("srcset", dataLazySrcset ? dataLazySrcset.replace(/thumb\//g, "").replace(/\.svg\/[^ ]*/g, ".svg") : "").removeAttr("data-lazy-state");
    $(ele).replaceWith($(ele).clone());
  }
});
(window.InPageEdit = window.InPageEdit || {}).myPreference = {
  "doNotCollectMyInfo": false,
  "editMinor": true,
  "editSummary": "$section$oldid // Edit via InPageEdit",
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
    "fix-double-entrance.js",
    "https://wiki.biligame.com/tools/MediaWiki:DiffTool.js?action=raw&ctype=text/javascript"
  ]
};
window.popupFixRedirs = true;
window.popupRedirAutoClick = "wpSave";
window.popupFixDabs = true;
window.popupDabsAutoClick = "wpSave";
window.popupRedlinkRemoval = true;
window.popupRedlinkAutoClick = "wpSave";
window.popupStructure = "menus";
window.popupShortcutKeys = true;
window.popupTocLinks = true;
window.AxUserMsgCustomTemplate = [
  ["User:BearBin/UserMessages/FileOnlyUsedForUser", "FileOnlyUsedForUser", "文件仅用户页使用（1=文件列表）", 16, "关于您上传的文件"],
  ["User:BearBin/UserMessages/FileOnlyUsedForUser2", "FileOnlyUsedForUser2", "关于您上传的文件（含用户头像调用方式，1=文件列表）", 16, "关于您上传的文件"],
  ["User:BearBin/UserMessages/WelcomeToMGPVNG", "WelcomeToMGPVNG", "萌娘百科视觉小说研究会邀请函", 16, "邀请加入[[Template:萌娘百科视觉小说研究会|萌娘百科视觉小说研究会]]"],
  ["User:SaoMikoto/UserMessages/UnclearPreload", "UnclearPreload", "未移除预加载模板", 16, "关于预加载模板"],
  ["User:SaoMikoto/UserMessages/TopReuse", "TopReuse", "重复页顶模板（1=页面名）", 16, "关于顶部模板的使用"]
];
document.querySelectorAll("#p-namespaces a").forEach(function(pageNode) {
  pageNode.href = pageNode.href.replace(/index\.php\?title=(.*)&action=edit&redlink=1$/, "$1");
});
$(function() {
  $("pre").each(function() {
    $("head").append("<style>pre::before{content:attr(lang);display:block;text-align:left;font-weight:bold;margin-left:.5em;font-family:'Times New Roman',Times,serif;}</style>");
    var preLang = $(this).attr("lang");
    if (!preLang) {
      var className = $(this).attr("class");
      var match = className ? className.match(/lang-[a-zA-Z]*/i) : null;
      preLang = match ? match[0].replace("lang-", "") : "";
      $(this).attr("lang", preLang);
    }
  });
});
$("body>div:not([id]):not([class])").remove();
window.DisamAssist = jQuery.extend(true, {
  cfg: {
    disamCategories: ["消歧义页"],
    disamLinkTemplates: [],
    disamLinkIgnoreTemplates: [],
    disamFormat: "$1",
    disamRegExp: "^(.*)\\(消歧义页\\)$",
    disamNeededText: "null",
    redirectToDisam: "#REDIRECT [[$1]]",
    intentionalLinkOption: false,
    targetNamespaces: [0, 10, 12, 14],
    backlinkLimit: 50,
    queryTitleLimit: 1,
    radius: 600,
    numContextLines: 6,
    historySize: 2,
    editCooldown: 8,
    watch: "nochange"
  },
  txt: {
    start: "消歧义",
    startMain: "清理链接至主题的链接",
    startSame: "清理链接至消歧义页的链接",
    close: "关闭",
    undo: "复原",
    omit: "跳过",
    refresh: "重新整理",
    titleAsText: "链接到其它页面",
    disamNeeded: "标示{{需要消歧义}}",
    intentionalLink: "有意链接到消歧义页",
    titleAsTextPrompt: "请输入新的链接目标：",
    removeLink: "移除内链",
    optionMarker: " [链接至此处]",
    targetOptionMarker: " [当前目标]",
    redirectOptionMarker: " [当前目标的重定向]",
    pageTitleLine: '<a href="$1">$2</a>:',
    noMoreLinks: "没有需要消歧义的链接了。",
    pendingEditCounter: "提交中：$1；临时储存：$2",
    pendingEditBox: "编辑提交中（$1）",
    pendingEditBoxTimeEstimation: "$1; 剩余时间: $2",
    pendingEditBoxLimited: "在所有编辑均被提交前，请勿关闭此页面。您可在其它页面继续编辑，不过不建议同时在多个页面使用DisamAssist。这可能导致大量编辑出现在最近更改中，干扰到其他人。",
    error: "Error: $1",
    fetchRedirectsError: '无法获取重定向："$1".',
    getBacklinksError: '无法下载反向链接: "$1".',
    fetchRightsError: '无法获取用户权限："$1",',
    loadPageError: '无法加载 $1: "$2".',
    savePageError: '无法提交编辑到 $1: "$2".',
    dismissError: "跳过",
    pending: "存在尚未储存的编辑。如欲储存之，请按「关闭」。",
    editInProgress: "DisamAssist正在提交编辑。如果您将该页面关闭，可能会丢失您的编辑。",
    ellipsis: "…",
    notifyCharacter: "✔",
    summary: "[[User:没有羽翼的格雷塔/js#DisamAssist|DisamAssist]]：[[$1]]→$2",
    summaryChanged: "[[$1]]",
    summaryOmitted: "链接已跳过",
    summaryRemoved: "链接已移除",
    summaryIntentional: "有意链接到消歧义页",
    summaryHelpNeeded: "需要帮助",
    summarySeparator: "; ",
    redirectSummary: "[[User:没有羽翼的格雷塔/js#DisamAssist|DisamAssist]]：重定向目标：[[$1]]"
  }
}, window.DisamAssist || {});
loadGHGadget("Mustafabot/js-MoegiriPedia/DisamAssist-core");
