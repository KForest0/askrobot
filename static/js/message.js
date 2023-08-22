import { UUID } from "../lib/js/unpkg.com_uuidjs@5.0.1_dist_uuid.js";
import Textarea from './form.js'
import Request from '../utils/api.js';
import { isEmpty, stringToDOM } from '../utils/utils.js';
import { urls, headers, bodys } from '../utils/config.js'
import { htmlStrings } from "../utils/templates.js";
import { HistoryManagement } from "./history.js";

export const messageData = {
    requestData: {
        url: urls.chatGPT.chat,
        header: headers.chatGPT,
        bodys: bodys.chatGPT
    },
    responseData: {
        "id": "",
        "title": "",
        "create_time": 0,
        "update_time": 0,
        "history": []
    }
}

const updateResponseBaseData = function (title = '') {
    const times = dayjs().valueOf();

    messageData.responseData.title = title;
    messageData.responseData.update_time = times;
}

const initResponseBaseData = function (message) {
    const times = dayjs().valueOf();
    const firstContent = message.content;

    messageData.responseData.id = UUID.generate();
    messageData.responseData.title = firstContent;
    messageData.responseData.create_time = times;
    messageData.responseData.update_time = times;
}

const addHisrotyData = function (message) {
    const data = {
        "id": UUID.generate(),
        "create_time": dayjs().valueOf(),
        "update_time": dayjs().valueOf(),
        "status": "finished_successfully",
        "message": message,
    }

    if (isEmpty(messageData.responseData.history)) {
        const message = messageData.requestData.bodys.messages[0];
        initResponseBaseData(message);
    }

    messageData.responseData.history.push({ [data.id]: data });
}

const addBodyMessage = function (charactor, content) {
    const message = { "role": charactor, "content": content };
    messageData.requestData.bodys.messages.push(message);
}

/* 移除 `bodyMessage` 的关于 `charactor(user,assistant)` 的最后一条信息 */
const removeBodyMessageLast = function (charactor) {
    const messages = messageData.requestData.bodys.messages;
    let messageLength = messages.length;

    for (let i = messageLength - 1; i >= 0; i--) {
        const role = messages[i].role

        if (role === charactor) {
            messageData.requestData.bodys.messages.splice(i, 1);
            break;
        }
    }
}
/*********************************************************************/

/* 移除 `history` 的关于 `charactor(user,assistant)` 的信息 */
const getLastMessageId = function (charactor) {
    const history = messageData.responseData.history;
    let historyLength = history.length;
    let id;

    for (let i = historyLength - 1; i >= 0; i--) {
        const role = Object.values(history[i])[0].message.role;

        if (role === charactor) {
            id = Object.values(history[i])[0].id;
            // messageData.responseData.history.splice(i, 1);
            break;
        }
    }

    if (isEmpty(id)) return;

    return id;
}
/***********************************************************/

/* 移除 `bodyMessage` 的所有信息 */
const removeBodyMessageAll = function () {
    messageData.requestData.bodys.messages = [];
}
/********************************/

/* 移除 `history` 的所有信息 */
const removeHistoryAll = function () {
    messageData.responseData.id = "";
    messageData.responseData.title = "";
    messageData.responseData.create_time = 0;
    messageData.responseData.update_time = 0;
    messageData.responseData.history = [];
}
/****************************/

/* 自定义 `marked.js` 的 `code` 渲染方式 */
const setMarkedSetting = function () {
    const renderer = new marked.Renderer();

    renderer.code = function (code, language) {
        const validLanguage = language || 'plaintext';
        const highlightedCode = hljs.highlight(code, { language: validLanguage }).value;

        return htmlStrings.markedCodeRender.codeBlock
            .replace('%language%', language)
            .replace('%validLanguage%', validLanguage)
            .replace('%highlightedCode%', highlightedCode)
    };

    const options = {
        renderer: renderer,
        gfm: true,
        pedantic: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        ignoreUnescapedHTML: true,
        langPrefix: 'hljs language-',
        highlight: function (code, options) {
            return hljs.highlight(code, options).value;
        }
    };

    marked.setOptions(options);
}
/***************************************/

/* 创建 `user` 对话样式 */
const createUserContainer = function (content) {
    const userContainer = stringToDOM(htmlStrings.userChat);
    const text = userContainer.querySelector('.user-message');

    text.textContent = content;
    return userContainer;
}
/***********************/

/* 创建 `bot` 对话样式 */
const createBotContainer = function () {
    return stringToDOM(htmlStrings.botChat);;
}
/***********************/

/* 将 `user` 对话样式渲染到页面上 */
const renderUserContainer = function (content) {
    const spaceContainer = document.querySelector('.space-container');

    spaceContainer.insertAdjacentElement('beforebegin', createUserContainer(content));
}
/********************************/

/* 将 `user` 对话样式渲染到页面上 */
const renderBotContainer = function () {
    const spaceContainer = document.querySelector('.space-container');

    spaceContainer.insertAdjacentElement('beforebegin', createBotContainer());
}
/********************************/

const renderUserAndBot = async function (itemId) {
    const spaceContainer = document.querySelector('.space-container');

    const messageDatas = await getMessage(itemId);

    // console.log(messageDatas);
    const datas = messageDatas.history;
    const updateMessageData = function (datas) {
        datas.forEach(data => {

            const message = Object.values(data)[0].message
            const role = message.role;
            const content = message.content

            addBodyMessage(role, content);
        });
        messageData.responseData = messageDatas;


        console.log(messageData.responseData);
    }
    const readyContainer = function () {
        const messages = messageData.requestData.bodys.messages;

        messages.forEach(message => {
            const role = message.role;
            const content = message.content;

            if (role === 'user') {
                spaceContainer.insertAdjacentElement('beforebegin', createUserContainer(content));
            } else {
                const botContainer = createBotContainer();
                const botMessage = botContainer.querySelector('.bot-message');
                const contentToHTML = marked.marked(content);
                botMessage.innerHTML = contentToHTML;

                addBtnCopy(botMessage);

                spaceContainer.insertAdjacentElement('beforebegin', botContainer);
            }
        });
    }

    updateMessageData(datas);
    readyContainer();
}


/* 将页面上的 `user` 和 `bot` 对话全部删除 */
const clearUserAndBotContainer = function () {
    const chatContainer = document.querySelector('.chat-container');
    const spaceContainer = chatContainer.querySelector('.space-container');

    while (chatContainer.childElementCount > 1) {
        chatContainer.removeChild(chatContainer.firstElementChild);
    }

    HistoryManagement.clearSessionTitle();
}
/*****************************************/

/* 获取页面上最后一个 `botContainer` */
const getLastBotContainer = function () {
    const chatContainer = document.querySelector('.chat-container');
    const containers = chatContainer.childNodes;

    for (let i = containers.length - 1; i >= 0; i--) {
        const childNode = containers[i];

        // 检查 `childNode` 是否是有效节点
        if (childNode && childNode.classList && childNode.classList.contains("bot-container")) {
            return childNode;
        }
    }
    return null;
}
/***************************************/

/* 添加 `copy` 按钮 */// 使用Java写一个加法函数
const handleBtnCopyClick = function (btnCopy, targetContent) {
    console.log(targetContent);
    const clipboard = new ClipboardJS(btnCopy, { target: () => targetContent });

    clipboard.on('success', e => {
        const currentCopyBtn = e.trigger;
        const span = currentCopyBtn.querySelector('span');

        currentCopyBtn.classList.add('copied');
        span.textContent = "Copied";
        setTimeout(() => {
            currentCopyBtn.classList.remove('copied');
            span.textContent = "Copy code"
        }, 1000);
    });

    clipboard.on('error', e => {
        console.error('复制剪切板失败', e.text);
    });
}

const addBtnCopy = function (botMessage) {
    console.log(botMessage);
    const headers = botMessage.querySelectorAll('.pre-header');

    if (isEmpty(headers)) return;

    headers.forEach(header => {
        const span = header.querySelector('span');
        const btnCopString = htmlStrings.markedCodeRender.codeBtn;
        const btnCopyElement = stringToDOM(btnCopString);
        const codeElement = header.nextElementSibling.querySelector('code');

        handleBtnCopyClick(btnCopyElement, codeElement);

        span.insertAdjacentElement('afterend', btnCopyElement);
    })
}
/*******************/

/****** `typejs` 逐字打印输出 *****/
const typeing = function (targetElement, strings, complete) {
    new Typed(targetElement, {
        strings: [strings],
        typeSpeed: 0,
        showCursor: false,
        onComplete: function () {
            complete();
        }
    });
}
/*********************************/

/* 响应成功后   */
const success = function (data) {
    const { role, content, message, messageToHTML } = parseResponseData(data);

    const lastBotMessage = getLastBotContainer().querySelector('.bot-message');

    const addHistory = function () {
        const title = messageData.requestData.bodys.messages[0].content;
        const id = messageData.responseData.id;

        HistoryManagement.addHistory(title, id);
        HistoryManagement.isAdd = false;
    }

    const typedComplete = function () {
        Textarea.setNormalState();
        addBtnCopy(lastBotMessage);

        if (HistoryManagement.isAdd) addHistory();
        // console.log("requestData==>", messageData.requestData);
        // console.log("responseData==>", messageData.responseData);

    }
    addBodyMessage(role, content);
    addHisrotyData(message);

    typeing(lastBotMessage, messageToHTML, typedComplete);
}
/**********************/

/* 响应失败后   */
const fail = function (error) {
    console.log(error);
    Textarea.setErrorState();
}
/****************/

/* 向 `GPT API` 发送请求并获取 `data` */
const getResponseResult = function () {
    return Request.getGPTData(messageData.requestData.url, messageData.requestData.bodys, messageData.requestData.header);
}
/************************************/

/* 解析 `GPT API` 响应的 `data` */
const parseResponseData = function (data, isReturnHTML = true) {
    const choice = data.choices[0];
    const message = choice.message;
    const role = message.role;
    const content = message.content;

    if (isReturnHTML) {
        // setMarkedSetting();
        const messageToHTML = marked.marked(content);
        return { choice, message, role, content, messageToHTML }
    }
    return { choice, message, role, content }
}
/*******************************/

const sendMessage = async function (content) {
    // 添加 `user` 和 `bot` 的对话样式
    renderUserContainer(content);
    renderBotContainer();

    addBodyMessage('user', content);
    addHisrotyData({ role: 'user', content: content })
    try {
        const responseData = await getResponseResult();
        success(responseData);
        insertMessage();
    } catch (error) {
        fail(error)
    }
}

const resendMessage = async function () {
    const lastBotMessage = getLastBotContainer().querySelector('.bot-message');
    lastBotMessage.innerHTML = ''
    const lastMessageId = getLastMessageId('assistant');
    const updateTime = dayjs().valueOf();

    const getResponseMessage = async function () {
        const url = messageData.requestData.url;
        const header = messageData.requestData.header;
        const requestBody = JSON.parse(JSON.stringify(messageData.requestData.bodys));

        requestBody.messages.splice(-1, 1);

        return await Request.getGPTData(url, requestBody, header);
        // return data.choices[0].message;
    }

    const updateLastMessageData = function (id, responseMessage) {
        const requestDataLastIndex = messageData.requestData.bodys.messages.length - 1;
        const responseDataLastIndex = messageData.responseData.history.length - 1;

        messageData.requestData.bodys.messages.splice(requestDataLastIndex, 1, responseMessage);

        for (let index = responseDataLastIndex; index >= 0; index--) {
            const history = messageData.responseData.history[index];

            if (Object.hasOwnProperty.call(history, id)) {
                messageData.responseData.history[index][id].message = responseMessage;
                messageData.responseData.history[index][id].update_time = updateTime;
            }
        }
    }

    const typedComplete = function () {
        Textarea.setNormalState();
        addBtnCopy(lastBotMessage);
    }

    try {
        const responseMessage = await getResponseMessage();
        const { messageToHTML, message } = parseResponseData(responseMessage);

        updateLastMessageData(lastMessageId, responseMessage);
        updateMessage(lastMessageId, message, updateTime);

        typeing(lastBotMessage, messageToHTML, typedComplete);
    } catch (error) {
        fail(error)
    }
}



const insertMessage = function () {
    const id = messageData.responseData.id;
    const history = messageData.responseData.history.slice(-2);

    Request.insertMessageHistory(id, history);
}

const updateMessage = function (lastMessageId, responseMessage, updateTime) {
    Request.updateMessageHistory(lastMessageId, responseMessage, updateTime);
}

const removeMessage = function (titleId, messageId) {
    Request.removeMessageHistory(titleId, messageId);
}

const removeMessageAll = function () {
    Request.removeMessageHistoryAll();
}

const getMessage = async function (titleId) {
    return await Request.getMessageHistory(titleId);
}

/******************/
class MessageManagement {
    constructor() {

    }

    static init() {
        setMarkedSetting();
    }

    static sendMessage(content) {
        sendMessage(content);
    }

    static resendMessage() {
        resendMessage();
    }

    static clearChatContainer() {
        clearUserAndBotContainer();
    }

    static removeMessageDataAll() {
        removeBodyMessageAll();
        removeHistoryAll();
    }

    static removeMessageAll() {
        removeMessageAll();
    }

    static removeMessage(titleId, messageId) {
        removeMessage(titleId, messageId);
    }

    static renderUserAndBot(titleId) {
        renderUserAndBot(titleId);
    }

    static typeing(targetElement, strings, handleComplete) {
        typeing(targetElement, strings, handleComplete)
    }
}

export default MessageManagement;