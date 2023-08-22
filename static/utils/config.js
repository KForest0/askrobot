/**
 *  用于 ChatGPT 服务的 URL 配置对象。
 *  它包含了用于聊天完成请求的 URL 地址。
 */
const urls = {
    chatGPT: {
        chat: "https://oa.api2d.net/v1/chat/completions"
        //  "https://api.openai.com/v1/chat/completions" 官方
        //  "https://oa.api2d.net/v1/chat/completions" 镜像
    }
}

/**
 * 用于向 ChatGPT 服务发起 API 请求的头部对象。
 * 它包含了身份验证和内容类型的必要信息。
 */
const headers = {
    chatGPT: {
        "Content-Type": "application/json",
        Authorization: "Bearer fk199751-qSkDrYL2j0EqxNboLsLk7Igaz9JWXvIC"
        // fk199751-qSkDrYL2j0EqxNboLsLk7Igaz9JWXvIC 镜像
        // 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 官方
    }
}

/**
* 用于向 ChatGPT 服务发送请求的主体对象。
* 它包含了发送聊天请求所需的各种参数。
*/
const bodys = {
    chatGPT: {
        model: 'gpt-3.5-turbo', // 聊天模型的名称
        messages: [], // 聊天消息的数组，初始为空
        temperature: 0.9, // 控制生成文本的多样性，值越高则生成的文本越随机
        max_tokens: 600, // 生成文本的最大长度，以令牌为单位
        stream: false, // 是否启用流式响应，如果为 true，则响应将以流的形式返回
    }
};



const SERVER_URLS = {
    chat: 'https://api.openai.com',// https://api.openai.com  https://oa.api2d.net
    // more serverUrls...
};


const API_URLS = {
    chat: '/v1/chat/completions',//  /v1/chat/completions /v1/chat/completions
    completions: '/v1/completions'
    // more APIs...
};

export const configChat = {
    SERVER_URL: SERVER_URLS.chat,
    API_URL: API_URLS.chat,
    //官方 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 api2d: fk199751-qSkDrYL2j0EqxNboLsLk7Igaz9JWXvIC
    API_KEY: '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',
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    max_tokens: 600,
    // frequency_penalty: 0.6
}

export const configCompletions = {
    SERVER_URL: SERVER_URLS.chat,
    API_URL: API_URLS.completions,
    API_KEY: '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',
    model: 'text-davinci-003',
    max_tokens: 10,
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: false,
    best_of: 1

}


export { urls, headers, bodys }