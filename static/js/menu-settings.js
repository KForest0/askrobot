import { EventListener } from '../utils/utils.js'
import MessageManagement from './message.js';
import Textarea from './form.js';
import Request from '../utils/api.js';
import { HistoryManagement } from './history.js';

const handleShowHistoryClick = function () {
    const menuContainer = document.querySelector('.menu-container');
    const overlay = document.querySelector('.overlay');
    const btnHiddenMenu = document.querySelector('.btn-menu-cancel');

    menuContainer.classList.toggle('show-menu');
    overlay.classList.toggle('show-menu');
    btnHiddenMenu.classList.toggle('show-menu');
}

const hiddenHistory = function () {
    const menuContainer = document.querySelector('.menu-container');
    const overlay = document.querySelector('.overlay');
    const btnHiddenMenu = document.querySelector('.btn-menu-cancel');

    menuContainer.classList.remove('show-menu');
    overlay.classList.remove('show-menu');
    btnHiddenMenu.classList.remove('show-menu');
}

const handleBtnCreateClick = function () {
    HistoryManagement.newItemClick();
}

const handleShowSubMenuClick = function (event, btnMore) {
    event.stopPropagation();
    const subMenu = document.querySelector('.more-list');

    subMenu.classList.add('more');
    btnMore.classList.add('current');
}

const handleHiddenSubMenuClick = function (event) {
    event.stopPropagation();

    const btnMore = document.querySelector('#btn-more');
    const subMenu = document.querySelector('.more-list');
    const moreContainer = document.querySelector('.more-container');

    if (!subMenu.contains(event.target) && event.target !== btnMore) {
        subMenu.classList.remove('more');
        moreContainer.classList.remove('current');
        btnMore.classList.remove('current');
    }
}

const handleThemeClick = function (event, btnSwitch) {
    event.stopPropagation();

    let theme;
    if (btnSwitch.checked) {
        theme = 'Dark';
        changeDarkTheme();
    } else {
        theme = 'Light';
        changeLightTheme();
    }

    localStorage.setItem('theme', theme);
}

const changeDarkTheme = function () {
    const themeIcon = document.querySelector('.icon-theme');
    const themeText = document.querySelector('.theme-text');
    const body = document.querySelector('body');
    // 执行打开时的操作
    body.classList.add('dark');
    themeIcon.setAttribute('name', 'moon');
    themeText.textContent = 'Dark';
}

const changeLightTheme = function () {
    const themeIcon = document.querySelector('.icon-theme');
    const themeText = document.querySelector('.theme-text');
    const body = document.querySelector('body');
    // 执行关闭时的操作
    body.classList.remove('dark');
    themeIcon.setAttribute('name', 'sunny');
    themeText.textContent = 'Light';
}

const setTheme = function () {
    const theme = localStorage.getItem('theme');
    const btnSwitch = document.querySelector('.toggle');

    if (theme === 'Dark') {
        changeDarkTheme();
        btnSwitch.checked = true;
    } else {
        changeLightTheme();
        btnSwitch.checked = false;
    }
}



const handleClearItemAllClick = function (event) {
    event.stopPropagation();
    const subMenu = document.querySelector('.more-list');

    const handleConfirm = function () {
        MessageManagement.clearChatContainer();
        Textarea.resetTextarea();
        hiddenHistory();

        HistoryManagement.isAdd = true;
        alertify.success('全部内容已删除');

        // 后台删除全部记录
        HistoryManagement.deleteItemDataAll();
    }
    alertify.confirm('Are you clear all conversations ?', handleConfirm).set({ 'title': '', delay: 2000 });

    subMenu.classList.remove('more');
}


/**************************************************/
const btnCreateListener = () => {
    const btnCreate = document.querySelector('.btn-create');
    EventListener.add(btnCreate, 'click', handleBtnCreateClick);
}

const toggleMobileMenuListener = () => {
    const overlay = document.querySelector('.overlay');
    const btnHiddenMenu = document.querySelector('.btn-menu-cancel');
    const iconMenu = document.querySelector('.btn-menu');

    EventListener.add(iconMenu, 'click', handleShowHistoryClick);
    EventListener.add(btnHiddenMenu, 'click', handleShowHistoryClick);
    EventListener.add(overlay, 'click', handleShowHistoryClick);
}

const showSubMenuListener = function () {
    const btnMore = document.querySelector('#btn-more');
    EventListener.add(btnMore, 'click', handleShowSubMenuClick, btnMore);
}

const hiddenSubMenuListener = function () {
    const section = document.querySelector('section');
    EventListener.add(section, 'click', handleHiddenSubMenuClick);
}

const toggleThemeListener = function () {
    const btnSwitch = document.querySelector('.toggle');
    EventListener.add(btnSwitch, 'click', handleThemeClick, btnSwitch);
}

const clearItemAllListener = function () {
    const btnClear = document.querySelector('#clear-all');
    EventListener.add(btnClear, 'click', handleClearItemAllClick);
}


class MenuSettingManagement {
    constructor() {

    }

    static initMenuSetting() {
        btnCreateListener()
        showSubMenuListener()
        hiddenSubMenuListener()
        toggleThemeListener()
        clearItemAllListener()

        toggleMobileMenuListener();
        setTheme();
    }

    static hiddenMobileMenu() {
        hiddenHistory();
    }

}

export { MenuSettingManagement };