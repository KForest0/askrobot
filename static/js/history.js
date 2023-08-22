import { isEmpty } from '../utils/utils.js'
import { htmlStrings } from '../utils/templates.js'
import MessageManagement, { messageData } from './message.js';
import Textarea from './form.js';
import { MenuSettingManagement } from './menu-settings.js';
// import { MessageManagement } from './common.js';
// import { menu, textarea } from './script.js';
import Request from '../utils/api.js'


const itemState = {
    editing: false,
    removing: false
}

/* 监听器事件封装 */
const EventListener = {
    add: function (element, eventType, handler, param1) {
        const wrappedHandler = function (event) {
            handler.call(element, event, param1);
        };

        if (element.addEventListener) {
            element.addEventListener(eventType, wrappedHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventType, wrappedHandler);
        } else {
            element['on' + eventType] = wrappedHandler;
        }
    },

    remove: function (element, eventType, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(eventType, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + eventType, handler);
        } else {
            element['on' + eventType] = null;
        }
    }
};
/****************/

/* 将文本标签转换成 `DOM` */
const stringToDOM = function (htmlString) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    // 处理特殊情况：字符串中可能包含空白文本节点或注释节点
    const children = Array.from(tempContainer.childNodes).filter(function (node) {
        return node.nodeType === Node.ELEMENT_NODE;
    });

    // 处理特殊情况：如果字符串包含多个顶级元素，则使用文档片段包裹
    if (children.length > 1) {
        const fragment = document.createDocumentFragment();
        children.forEach(function (child) {
            fragment.appendChild(child);
        });
        return fragment;
    }

    return children[0].parentNode.removeChild(children[0]);
}
/*************************/

/* 初始化所有 `item` 的监听事件 */
const initItems = function (itemsData) {
    // 根据 `今天` `昨天` `前七天` `前三十天` 进行归类 返回的是 `Array`
    const classify = function () {
        const classifyResult = [0, 0, 0, 0]
        const titleResult = [];
        const itemIds = []

        itemsData.forEach(itemData => {
            const updateTime = dayjs(itemData.update_time);
            const date = getDateStatus(updateTime);

            switch (date) {
                case 0:
                    classifyResult[0] += 1;

                    break;
                case 1:
                    classifyResult[1] += 1;
                    break;
                case 7:
                    classifyResult[2] += 1;
                    break;
                case 30:
                    classifyResult[3] += 1;
                    break;
            }

            titleResult.push(itemData.title);
            itemIds.push(itemData.item_id);
        });
        return { classifyResult, titleResult, itemIds }
    }

    // 初始化先创建装 `item` 的 `container`
    const itemContainerElements = [
        createItemContainer('Today'), createItemContainer('Yesterday'), createItemContainer('Previous 7 Days'), createItemContainer('Previous 30 Days')
    ]


    const updateItemContainerElements = function (classifyResult, titleResult, itemIds) {
        const titleResultNum = titleResult.length - 1;
        console.log(titleResultNum);
        let currentTitleNum = 0;

        classifyResult.forEach((classifyNum, index, array) => {
            const itemContainerElement = itemContainerElements[index];
            const ul = itemContainerElement.querySelector('ul');

            for (let index = 0; index < classifyNum; index++) {

                const titleText = titleResult[currentTitleNum];
                const dataItemId = itemIds[currentTitleNum];

                const item = createItem(titleText, dataItemId);

                ul.appendChild(item);

                currentTitleNum++;
            }

            itemContainerElements[index] = itemContainerElement;
        });


    }

    const renderHTML = function (classifyResult, itemContainerElements) {
        const listsContainer = document.querySelector('.lists-container');

        classifyResult.forEach((resultNum, index, array) => {
            const itemContainerElement = itemContainerElements[index];

            if (resultNum) {
                listsContainer.appendChild(itemContainerElement)
            }
        });

    }

    const { classifyResult, titleResult, itemIds } = classify();
    updateItemContainerElements(classifyResult, titleResult, itemIds);

    renderHTML(classifyResult, itemContainerElements);

}

function getDateStatus(date) {
    var currentDate = dayjs().startOf('day');
    var yesterday = dayjs().subtract(1, 'day').startOf('day');
    var sevenDaysAgo = dayjs().subtract(7, 'day').startOf('day');
    var thirtyDaysAgo = dayjs().subtract(30, 'day').startOf('day');

    if (date.isSame(currentDate, 'day')) {
        return 0;
    } else if (date.isSame(yesterday, 'day')) {
        return 1;
    } else if (date.isAfter(sevenDaysAgo) && date.isBefore(yesterday)) {
        return 7;
    } else if (date.isAfter(thirtyDaysAgo) && date.isBefore(sevenDaysAgo)) {
        return 30;
    } else {
        return -1;
    }
}
/******************************/

const isCurrent = function (item) {
    return item.classList.contains('current');
}

/* 更改 `current` 样式 */
const setCurrentStyle = function (item, isAddCurrent = true) {
    const items = document.querySelectorAll('.lists-container li');
    items.forEach(item => item.classList.remove('current'));

    if (isAddCurrent) item.classList.add('current');
}
/**********************/

const createItemContainer = function (dayValue) {
    const itemContainerString = htmlStrings.conversationContainer.replace('%dayValue%', dayValue);
    return stringToDOM(itemContainerString);
}

/* 创建 `item` 元素 */
const createItem = function (titleText, id) {
    const itemString = htmlStrings.conversation.trim();
    const liELement = stringToDOM(itemString);
    const inputElement = liELement.querySelector('input');

    liELement.setAttribute('data-item-id', id);
    inputElement.value = titleText;

    EventListener.add(liELement, 'click', handleItemClick, liELement);
    addTitleInputListener(liELement);
    return liELement;
}
/*******************/


/* 删除 `item` 元素 */
const removeItem = function (item) {
    const itemUl = item.parentElement;
    const itemNums = itemUl.childElementCount;

    if (itemNums === 1) {
        removeItemContainer(item);
    } else {
        item.remove();
    }
    console.log('已删除');
}
/***************/

const clearSessionTitle = function () {
    const sessionTitle = document.querySelector('.session-title');
    sessionTitle.textContent = '';
}

const addItem = (titleValue, id) => {
    const item = createItem('', id);
    const itemContainers = document.querySelector('.lists-container');
    const itemNums = itemContainers.children.length;
    const typeingContainer = item.querySelector('.chat-text');
    const sessionTitle = document.querySelector('.session-title');

    const isItemHavaToday = function () {
        const today = dayjs(); // 获取当前日期
        const historyData = HistoryManagement.itemsData;

        for (let index = historyData.length - 1; index >= 0; index--) {
            const date = dayjs(historyData[index].update_time);
            if (date.isSame(today, 'day')) {
                console.log('时间戳是今天');
                return true;
            }
        }
        return false;
    }
    const handleComplete = function () {
        addItemData();

        setCurrentStyle(item);
        // 插入 `icon-edit` 和 `icon-trash` 图标
        const { editIconElement, trashIconElement } = addIconEditAndTrash(item);
        addEditAndTrashListenr(editIconElement, trashIconElement, item);
    }
    const insertContainerAndItem = function () {
        const itemContainer = createItemContainer('Today');
        const ul = itemContainer.querySelector('ul');

        ul.appendChild(item);
        itemContainers.insertAdjacentElement('afterbegin', itemContainer);
    }
    const insertItem = function () {
        const firstItemContainer = itemContainers.firstElementChild;
        const ul = firstItemContainer.querySelector('ul');

        ul.insertAdjacentElement('afterbegin', item);
    }

    console.log('addItem');
    if (!isItemHavaToday()) {
        insertContainerAndItem();
    } else {
        if (itemNums > 0) {
            insertItem();
        } else {
            insertContainerAndItem();
        }
    }

    MessageManagement.typeing(typeingContainer, titleValue, handleComplete);
    MessageManagement.typeing(sessionTitle, titleValue, () => { });

    // 后台更新 `itemData`



}

/* 删除 `item` 所在的整个列表 */
const removeItemContainer = function (item) {
    const itemContainer = item.parentElement.parentElement;

    if (!isEmpty(itemContainer)) return;

    itemContainer.remove();
}
/****************************/

/* 删除所有的 `item` 也就是 整个列表 */
const removeItemsAll = function () {
    const itemContainers = document.querySelector('.lists-container');
    itemContainers.innerHTML = '';
}
/***********************************/

/* 删除所有图标  `iconBox` 下的所有 `icons` */
const removeIconAll = function () {
    const items = document.querySelectorAll('.lists-container li');

    const remove = function (item) {
        const iconBox = item.querySelector('.icon-box');
        if (iconBox.hasChildNodes()) iconBox.innerHTML = '';
    }
    items.forEach(item => remove(item));
}
/******************************************/

/* 删除当前  `iconBox` 下的所有 `icons` */
const removeIcon = function (item) {
    const iconBox = item.querySelector('.icon-box');
    if (iconBox.hasChildNodes()) {
        const icons = iconBox.childNodes;
        icons.forEach(icon => icon.remove());
    }
}
/******************************************/

/* 插入 `编辑icon-edit` 和 `删除icon-trash` 图标 */
const addIconEditAndTrash = function (item) {
    const iconBox = item.querySelector('.icon-box');
    const editIconString = htmlStrings.menu.editIcon;
    const trashIconString = htmlStrings.menu.trashIcon;

    const editIconElement = stringToDOM(editIconString.trim());
    const trashIconElement = stringToDOM(trashIconString.trim());

    // 插入之前删除 `iconBox` 所有 `icon`
    removeIconAll();
    iconBox.insertAdjacentElement('afterbegin', trashIconElement)
    iconBox.insertAdjacentElement('afterbegin', editIconElement)

    return { editIconElement, trashIconElement }
}
/***********************************************/

/* 插入 `确认icon-confirm` 和 `取消icon-cancel` 图标 */
const addIconConfirmAndCancel = function (item) {
    const iconBox = item.querySelector('.icon-box');
    const icons = htmlStrings.menu.yesIcon + htmlStrings.menu.noIcon;

    const confirmIconString = htmlStrings.menu.yesIcon;
    const cancelIconString = htmlStrings.menu.noIcon;

    const cancelIconElement = stringToDOM(cancelIconString.trim());
    const confirmIconElement = stringToDOM(confirmIconString.trim());

    // 插入之前删除 `iconBox` 所有 `icon`
    removeIconAll();

    iconBox.insertAdjacentElement('afterbegin', cancelIconElement)
    iconBox.insertAdjacentElement('afterbegin', confirmIconElement)

    return { confirmIconElement, cancelIconElement }
}
/***************************************************/

/* 解锁 `chat-text` 状态 */
const unlockTitleInput = function (item) {
    const titleBox = item.querySelector('.chat-text-box');
    const titleInput = item.querySelector('.chat-text');

    titleInput.removeAttribute('disabled');
    titleBox.classList.add('edit');
}
/*************************/

/* 锁定 `chat-text` 状态 */
const lockTitleInputAll = function () {
    const items = document.querySelectorAll('.lists-container li');

    const lock = function (item) {
        const titleBox = item.querySelector('.chat-text-box');
        const titleInput = item.querySelector('.chat-text');

        titleInput.setAttribute('disabled', 'disabled');
        titleBox.classList.remove('edit');
    }

    items.forEach(item => lock(item));
}
/*************************/

/* 添加 `editIcon` 和 `trashIcon` 的 `click` 事件 */
const addEditAndTrashListenr = function (editIconElement, trashIconElement, item) {
    EventListener.add(editIconElement, 'click', handleEditClick, item);
    EventListener.add(trashIconElement, 'click', handleTrashClick, item);
}
/*************************************************/

/* 添加 `confirmIcon` 和 `cancelIcon` 的 `click` 事件 */
const addConfirmAndCancelLister = function (confirmIconElement, cancelIconElement, item) {
    EventListener.remove(item, 'click', handleItemClick, item);
    EventListener.add(confirmIconElement, 'click', handleConfirmClick, item);
    EventListener.add(cancelIconElement, 'click', handleCancelClick, item);
}
/****************************************************/

/* 添加 `titleInput` 的 `change` 事件 */
const addTitleInputListener = function (item) {
    itemState.editing = false;

    const titleElement = item.querySelector('.chat-text');
    EventListener.add(titleElement, 'change', handleTitleChange, item);
}
/*************************************/

const addNewItemListener = function () {
    const btnNew = document.querySelector('.btn-new');
    EventListener.add(btnNew, 'click', handleNewItemClick);
}


const handleNewItemClick = () => {
    removeIconAll();
    setCurrentStyle(null, false);
    lockTitleInputAll();
    Textarea.resetTextarea();
    MenuSettingManagement.hiddenMobileMenu();

    HistoryManagement.isAdd = true;
    MessageManagement.clearChatContainer();
    MessageManagement.removeMessageDataAll();
}

const handleItemClick = (event, item) => {
    event.stopPropagation();

    HistoryManagement.isAdd = false;


    const itemId = item.getAttribute('data-item-id');

    if (isCurrent(item)) return;

    MessageManagement.removeMessageDataAll();
    MessageManagement.clearChatContainer();
    MessageManagement.renderUserAndBot(itemId);

    Textarea.setNormalState();
    lockTitleInputAll();
    // 设置 `current` 样式
    setCurrentStyle(item);
    // 插入 `icon-edit` 和 `icon-trash` 图标
    const { editIconElement, trashIconElement } = addIconEditAndTrash(item);

    addEditAndTrashListenr(editIconElement, trashIconElement, item);


}

const handleEditClick = (event, item) => {
    event.stopPropagation();

    itemState.editing = true;
    // 插入 `icon-confirm` 和 `icon-cancel` 之前先要删除当前 `icon-box` 下的所有图标
    removeIcon(item);
    const { confirmIconElement, cancelIconElement } = addIconConfirmAndCancel(item);
    unlockTitleInput(item);

    addConfirmAndCancelLister(confirmIconElement, cancelIconElement, item);
    cancelIconElement.remove();
}

const handleTrashClick = (event, item) => {
    event.stopPropagation();

    itemState.removing = true;

    lockTitleInputAll();;
    const { confirmIconElement, cancelIconElement } = addIconConfirmAndCancel(item);

    addConfirmAndCancelLister(confirmIconElement, cancelIconElement, item);
}

const handleConfirmClick = (event, item) => {
    event.stopPropagation();

    const id = item.getAttribute('data-item-id');

    lockTitleInputAll();
    removeIcon(item);

    if (itemState.editing) {
        itemState.editing = false;
    }
    if (itemState.removing) {
        itemState.removing = false;

        removeItem(item);
        Textarea.resetTextarea();
        MessageManagement.clearChatContainer();

        HistoryManagement.isAdd = true;


        deleteItemData(id);
    }

    const { editIconElement, trashIconElement } = addIconEditAndTrash(item);
    addEditAndTrashListenr(editIconElement, trashIconElement, item);
}

const handleCancelClick = (event, item) => {
    event.stopPropagation();

    lockTitleInputAll();
    itemState.removing = false;
    console.log('取消删除对话');

    const { editIconElement, trashIconElement } = addIconEditAndTrash(item);

    addEditAndTrashListenr(editIconElement, trashIconElement, item);
}

/* 向后台请求更新 `titleValue` */
const handleTitleChange = function (event, item) {
    const titleValue = event.target.value;
    const sessionTitle = document.querySelector('.session-title');
    const id = item.getAttribute('data-item-id');

    sessionTitle.textContent = titleValue;
    console.log('确认修改');
    console.log(`titleValue=${titleValue}`);

    // 后台更新 `item`
    updateItemData(id, titleValue)
}
/*****************************/

const getItemData = async function () {
    return await Request.getItemsData();
}

const addItemData = function () {
    const itemData = {
        "id": messageData.responseData.id,
        "title": messageData.responseData.title,
        "create_time": messageData.responseData.create_time,
        "update_time": messageData.responseData.update_time
    }
    HistoryManagement.itemsData.push(itemData);

    // 后台新增 `item`
    Request.insertItemData(itemData);

}

const updateItemData = function (id, titleValue) {
    const getCurrentItemData = function (titleValue) {
        let currentData = '';
        HistoryManagement.itemsData.forEach((data) => {
            for (const key in data) {
                if (key !== 'item_id') continue;

                if (data[key] === id) {
                    data.title = titleValue;
                    data.update_time = dayjs().valueOf();
                    currentData = data;
                }
            }
        });

        // currentData.title = titleValue;
        return currentData;
    }

    const currentItemData = getCurrentItemData(titleValue);

    // console.log("currentItemData==>", currentItemData);
    messageData.responseData.title = titleValue;
    messageData.responseData.update_time = currentItemData.update_time;


    Request.updateItemData(currentItemData);
}

const deleteItemData = function (id) {
    MessageManagement.removeMessageDataAll();
    MessageManagement.removeMessage(id, "")
    Request.deleteItemData(id);
}

const deleteItemDataAll = function () {
    HistoryManagement.clearHistoryAll();
    MessageManagement.removeMessageDataAll();

    Request.deleteItemDataAll();
}




class HistoryManagement {
    constructor() {

    }
    static isAdd = true;

    static itemsData = [

    ]

    static async initHistory() {
        // initItems(HistoryManagement.itemsData);
        const results = await getItemData()
        // const results = await Request.getInstance().getItemsData()

        console.log('后台请求的itemData==>', results);

        initItems(results);
        addNewItemListener();

        this.itemsData = results;
    }

    static addHistory(titleValue, id) {
        addItem(titleValue, id);
    }

    static addListener() {
        return EventListener;
    }

    static clearHistoryAll() {
        removeItemsAll();
    }

    static newItemClick() {
        handleNewItemClick();
    }

    static clearSessionTitle() {
        clearSessionTitle();
    }

    static deleteItemDataAll() {
        deleteItemDataAll()
    }
}


export { HistoryManagement }


