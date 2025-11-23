import { env } from "process";

const config = {
    useragent: `${env.API_USER_AGENT} (Github Actions; Saoutax) `,
    zh: {
        api: "https://mzh.moegirl.org.cn/api.php",
        name: "SaoMikoto@SaoMikoto",
        password: env.ZH,
    },
    cm: {
        api: "https://commons.moegirl.org.cn/api.php",
        name: "SaoMikoto@saomikoto",
        password: env.CM,
    },
};

export default config;
