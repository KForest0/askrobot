import { EventListener, isEmpty } from '../utils/utils.js'
import MessageManagement from './message.js';

/* 更新 `textarea` 高度 `height` */
const updateHeight = function () {
    const textareaElement = document.querySelector('.chat-textarea');

    textareaElement.style.height = 'auto'
    textareaElement.style.height = textareaElement.scrollHeight + 'px'
}
/*******************************/

/* 锁定发送按钮 `btn-send` 和 `icon-send` */
const lockBtnSend = function () {
    const btnSend = document.querySelector('.btn-send');
    const iconSend = document.querySelector('.icon-send');

    iconSend.classList.remove('type');
    btnSend.classList.remove('type');
    btnSend.setAttribute('disabled', 'disabled');
}
/*****************************************/

/* 解锁发送按钮 `btn-send` 和 `icon-send` */
const unlockBtnSend = function () {
    const btnSend = document.querySelector('.btn-send');
    const iconSend = document.querySelector('.icon-send');

    iconSend.classList.add('type');
    btnSend.classList.add('type');
    btnSend.removeAttribute('disabled');
}
/*****************************************/

/* 锁定发送按钮 `btn-send` 和 `icon-send` */
const lockBtnResend = function () {
    const resend = document.querySelector('.btn-resend');
    const resendMobile = document.querySelector('.btn-resend-mobile');

    const isShowResend = resend.classList.contains('show');
    const isShowResendMobile = resendMobile.classList.contains('show');
    if (isShowResend || isShowResendMobile) {
        resend.classList.remove('show');
        resendMobile.classList.remove('show');
    }
}
/*****************************************/

/* 请求错误时 `BtnResendError` 的样式*/
const setBtnResendError = function () {
    const iconResend = document.querySelector('.icon-resend');
    const resend = document.querySelector('.btn-resend');
    const resendMobile = document.querySelector('.btn-resend-mobile');
    const btnResendText = document.querySelector('.resend-text');

    iconResend.setAttribute('name', 'alert-outline');
    resend.classList.add('error');
    resendMobile.classList.add('error');
    btnResendText.textContent = 'Error Request';
}
/****************************************/

/* 删除请求错误时 `BtnResendError` 的样式*/
const removeBtnResendError = function () {
    const iconResend = document.querySelector('.icon-resend');
    const resend = document.querySelector('.btn-resend');
    const resendMobile = document.querySelector('.btn-resend-mobile');
    const btnResendText = document.querySelector('.resend-text');

    iconResend.setAttribute('name', 'refresh-outline');
    resend.classList.remove('error');
    resendMobile.classList.remove('error');
    btnResendText.textContent = 'Regenerate response';
}
/****************************************/

/* 解锁发送按钮 `btn-send` 和 `icon-send` */
const unlockBtnResend = function () {
    const resend = document.querySelector('.btn-resend');
    const resendMobile = document.querySelector('.btn-resend-mobile');

    resend.classList.add('show');
    resendMobile.classList.add('show');
}
/*****************************************/

/* 锁定 `textarea` 输入框 */
const lockTextarea = function () {
    const textareaElement = document.querySelector('.chat-textarea');
    const formBox = document.querySelector('.form-box');

    textareaElement.value = '';
    textareaElement.setAttribute('disabled', 'disabled');
    formBox.classList.add('loading');

    lockBtnSend();
    lockBtnResend();
    dotsAnimation().play();
}
/************************/

/* 解锁 `textarea` 输入框 */
const unlockTextarea = function () {
    const textareaElement = document.querySelector('.chat-textarea');
    const formBox = document.querySelector('.form-box');

    textareaElement.removeAttribute('disabled');
    formBox.classList.remove('loading');

    lockBtnSend();
    unlockBtnResend();
    dotsAnimation().pause();
}
/*************************/

/* 更改发送按钮 `btnSend` 的状态 */
const toggleBtnSendState = function () {
    const textareaElement = document.querySelector('.chat-textarea');
    const textareaContentText = textareaElement.value;

    if (isEmpty(textareaContentText)) {
        lockBtnSend();
    } else {
        unlockBtnSend();
    }
}
/******************************/

/* 设置等待时的小圆点 `dot` 动画 */
const dotsAnimation = function () {
    const dots = document.querySelectorAll('.dot');

    const animation = anime({
        targets: dots,
        opacity: [0, 1],
        delay: anime.stagger(300),
        loop: true,
        autoplay: false,
    });

    return animation;
}
/******************************/

/* 设置滚动到底部的 `btnScroll` */
const toggleBtnScrollState = function () {
    const spaceContainer = document.querySelector('.space-container');
    const btnScroll = document.querySelector('.btn-scroll');
    const observerOption = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9
    }
    const observerFunc = (entries) => {
        if (entries[0].isIntersecting) {
            btnScroll.classList.remove('show');
        } else {
            btnScroll.classList.add('show');
        }
    }

    const observer = new IntersectionObserver(observerFunc, observerOption);
    observer.observe(spaceContainer);
}
/******************************/


const sendMessage = function (content) {
    MessageManagement.sendMessage(content);

    lockTextarea();
    handleBtnScrollClick();
}

const resendMessage = function () {
    MessageManagement.resendMessage();
}

const handleTextareaKeyBord = function (event, textareaElement) {
    console.log(window.innerWidth <= 768);
    if (window.innerWidth <= 768) {
        if (event.key === 'Enter') {

        }
    } else {
        if (event.key === 'Enter' && !event.shiftKey) {
            // 如果输入值为空 直接 `return` 不触发 `sendMessage`
            const content = textareaElement.value;
            if (isEmpty(content)) return;
            sendMessage(content, textareaElement);
        }
    }


    // if (event.key === 'Enter' && !event.shiftKey) {
    // 如果输入值为空 直接 `return` 不触发 `sendMessage`
    // const content = textareaElement.value;
    // if (isEmpty(content)) return;
    // sendMessage(content, textareaElement);
    // }

    // 更改 `textarea` 高度 和 `btn-send` 的状态
    updateHeight();
    toggleBtnSendState();
}

const handleBtnSendClick = function (event, textareaElement) {
    event.preventDefault();
    const content = textareaElement.value;

    sendMessage(content);
    updateHeight();
}

const handleBtnRendClick = function (event) {
    event.preventDefault();

    lockBtnResend();
    lockTextarea();
    resendMessage();
}

const handleBtnScrollClick = function () {
    const conversationContainer = document.querySelector('.chat-container');

    const scrollToOption = {
        top: conversationContainer.scrollHeight,
        behavior: 'smooth', // 添加动画过渡
        block: 'end'
    }

    conversationContainer.scrollTo(scrollToOption);
}

/* `textarea` `btnRend` `btnResend` `btnScroll` 的监听事件 */
const addTextareaKeybordListener = () => {
    const textareaElement = document.querySelector('.chat-textarea');

    EventListener.add(textareaElement, 'keydown', handleTextareaKeyBord, textareaElement);
    EventListener.add(textareaElement, 'input', handleTextareaKeyBord, textareaElement);
}
const addTextareaWindowListener = () => EventListener.add(window, 'resize', updateHeight);

const addBtnSendListener = () => {
    const textareaElement = document.querySelector('.chat-textarea');
    const btnSend = document.querySelector('.btn-send');

    EventListener.add(btnSend, 'click', handleBtnSendClick, textareaElement);
}

const addBtnResendAndBtnMobileResendListener = function () {
    const btnResend = document.querySelector('.btn-resend');
    const btnResendMobile = document.querySelector('.btn-resend-mobile');

    EventListener.add(btnResend, 'click', handleBtnRendClick);
    EventListener.add(btnResendMobile, 'click', handleBtnRendClick);
}

const addBtnScrollListener = () => {
    const btnScroll = document.querySelector('.btn-scroll');
    EventListener.add(btnScroll, 'click', handleBtnScrollClick);
}
/************************************************/


class Textarea {
    constructor() {

    }

    static init() {
        toggleBtnScrollState()

        addTextareaKeybordListener()
        addBtnSendListener()
        addBtnResendAndBtnMobileResendListener()
        addTextareaWindowListener()
        addBtnScrollListener();
    }

    static setNormalState() {
        unlockTextarea();
        removeBtnResendError();
    }

    static setErrorState() {
        unlockTextarea();
        setBtnResendError();
    }

    static lockBtnResend() {
        lockBtnResend();
    }

    static resetTextarea() {
        unlockTextarea();
        lockBtnResend()
    }
}

export default Textarea;

