
class Request {

    constructor() {

    }

    /**
     * @description: 向 `GPT API`请求数据
     * @param {*} url 
     * @param {*} body 
     * @param {*} header
     * @return {json} 返回的是 `JSON` 格式数据
     */
    static async getGPTData(url, body, header) {
        try {
            return this.#post(url, body, header);
        } catch (error) {
            throw new Error(`Error while fetching GPT data: ${error}`);
        }
    }

    static async getItemsData() {
        const url = '/items/getItems'
        try {
            return this.#post(url);
        } catch (error) {
            throw new Error(`Error while fetching GPT data: ${error}`);
        }
    }

    static async insertItemData(itemData) {
        const url = '/items/insertItem'
        try {
            return this.#post(url, itemData);
        } catch (error) {
            throw new Error(`error`);
        }
    }

    static async updateItemData(currentItemData) {
        const url = '/items/updateItem'
        try {
            return this.#post(url, currentItemData);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async deleteItemData(id) {
        const url = '/items/deleteItem'
        try {
            return this.#post(url, id);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async deleteItemDataAll() {
        const url = '/items/deleteItemAll'
        try {
            return this.#post(url);
        } catch (error) {
            throw new Error(error);
        }
    }


    static async getMessageHistory(itemId) {
        const url = '/message/get'
        try {
            return this.#post(url, itemId);
        } catch (error) {
            throw new Error(error);
        }
    }


    static async insertMessageHistory(itemId, history) {
        console.log(itemId, history);
        const url = '/message/add'
        try {
            return this.#post(url, { [itemId]: history });
        } catch (error) {
            throw new Error(error);
        }
    }

    static async updateMessageHistory(answerId, history, updateTime) {
        const url = '/message/update'
        const body = { answerId, history, updateTime }
        try {
            return this.#post(url, body);
        } catch (error) {
            throw new Error(error);
        }

    }

    static async removeMessageHistory(titleId, messageId) {
        console.log(titleId, messageId);
        const url = '/message/remove';
        const body = { 'targetId': titleId, 'messageId': messageId }
        try {
            return this.#post(url, body);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async removeMessageHistoryAll() {
        const url = '/message/removeAll';
        try {
            return this.#post(url);
        } catch (error) {
            throw new Error(error);
        }
    }


    async login(values) {
        const url = '/login';
        // const data = JSON.stringify(values);
        try {
            return this.#post(url, values);
        } catch (error) {
            throw new Error(error);
        }
    }



    static async #post(url, body = {}, headers = {}) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        };

        return this.#send(url, options);
    }

    static async #send(url, options) {
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    }

    static async #get(url, params = {}, headers = {}) {
        const query = new URLSearchParams(params);
        const urlWithParams = `${url}?${query.toString()}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
        };

        return this.send(urlWithParams, options);
    }

}


export default Request









