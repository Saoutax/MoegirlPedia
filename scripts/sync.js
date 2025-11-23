import { MediaWikiApi } from "wiki-saikou";
import config from "./config.js";
import source from "./files.js";

const zhapi = new MediaWikiApi({
    baseURL: config.zh.api,
    headers: { "user-agent": config.useragent },
});
const cmapi = new MediaWikiApi({
    baseURL: config.cm.api,
    headers: { "user-agent": config.useragent },
});

async function postCodes(api, pages) {
    for (const [title, content] of Object.entries(pages)) {
        try {
            await api.postWithToken("csrf", {
                action: "edit",
                title: `User:SaoMikoto/${title}`,
                text: content,
                minor: true,
                tags: "Bot",
                summary: "Update JS/CSS",
                watchlist: "nochange",
            }, {
                retry: 50,
                noCache: true,
            });
            console.log(`Success: ${title}`);
        } catch {
            console.error(`Fail: ${title}`);
        }
    }
}

(async () => {
    console.log(`Start time: ${new Date().toISOString()}`);

    await Promise.all([
        zhapi.login(config.zh.name, config.zh.password, undefined, { retry: 25, noCache: true }),
        cmapi.login(config.cm.name, config.cm.password, undefined, { retry: 25, noCache: true }),
    ]).then(() => console.log("Successful login at both sites."));

    if (source.commons) {
        console.log("上传 commons...");
        await postCodes(cmapi, source.commons);
    }
    if (source.zh) {
        console.log("上传 zh...");
        await postCodes(zhapi, source.zh);
    }

    console.log(`End time: ${new Date().toISOString()}`);
})();