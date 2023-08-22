// import ElementWrapper from './elements.js'
// import EventManager from './event.js'


/* 监听器事件封装 */
export const EventListener = {
    add: function (element, eventType, handler, param1, param2, param3) {
        const wrappedHandler = function (event) {
            handler.call(element, event, param1, param2, param3);
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

/**
 * 判断值是否为空
 * @param {any} value 待判断的值
 * @returns {boolean} 值为空返回 true，否则返回 false
 */
const isEmpty = function (value) {
    if (value === undefined || value === null) {
        return true;
    }
    if (typeof value === 'string' && value.trim() === '') {
        return true;
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
        return true;
    }
    if (Array.isArray(value) && value.length === 0) {
        return true;
    }
    return false;
}

const getElement = function (selector, parent = document) {
    const element = parent.querySelector(selector);
    if (!element) {
        console.log(`没有元素与此选择器匹配: ${selector}`);
        //throw new Error(`没有元素与此选择器匹配: ${selector}`);
    }
    return element;
}

const getAllElements = function (selector, parent = document) {
    const elements = parent.querySelectorAll(selector);
    if (elements.length === 0) {
        console.log(`No elements match selector: ${selector}`);
        // throw new Error(`No elements match selector: ${selector}`);
    }
    return Array.from(elements);
}

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



/**
 * 获取模板Dom对象
 */
const getTemplateDom = function (templateString) {

    const temp = document.createElement('div');
    const result = temp;
    temp.innerHTML = templateString;

    // const range = document.createRange();
    // const fragment = range.createContextualFragment(templateString);
    // const childrens = fragment.childNodes;
    // const result = document.createDocumentFragment();

    // Array.from(temp.children).forEach(children => {

    //     children.insertAdjacentElement('beforeend', children)
    //     console.log(children);
    //     // children.inset
    //     // result.appendChild(children);
    // });

    return temp.children;
}



// Observer.js
class Observer {
    constructor(options, callback) {
        this.observer = new IntersectionObserver((entries) => {
            callback(entries);
        }, options);
    }

    observe(target) {
        this.observer.observe(target);
    }

    unobserve(target) {
        this.observer.unobserve(target);
    }

    disconnect() {
        this.observer.disconnect();
    }
}

const dropMessagesLast = function (role, messages) {
    const lastIndex = messages.reduce((lastIndex, message, index) => {
        if (message.role === role) {
            lastIndex = index;
        }
        return lastIndex;
    }, -1);
    if (lastIndex !== -1) {
        messages.splice(lastIndex, 1);
    }
    return messages;
}







export { isEmpty, getElement, getAllElements, Observer, dropMessagesLast, stringToDOM }
