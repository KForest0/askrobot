/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-18 15:45:29
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-18 17:09:00
 * @FilePath: \chatGPT-1.0\static\utils\templates.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

export const htmlStrings = {
  // data-conversation-id="0"
  conversationContainer: ` <div>
                            <span class="chat-day">%dayValue%</span>
                            <ul></ul>
                          </div>`,

  conversation: ` <li>
                   <a data-index="" href="#" class="btn btn-normal">
                      <ion-icon name="chatbox-outline" class="icon"></ion-icon>
                      <div class="chat-text-box">
                        <input disabled class="chat-text" value=""></input>
                        <div class="chat-text-shadow"></div>
                      </div>
                      <div class="icon-box"></div>
                    </a>
                  </li>`,
  userChat: `<div class="user-container">
                <div class="user">
                    <div class="user-avatar bg-grey">                   
                      <img src="/static/assets/icon/icon-question.svg" alt="User">
                    </div>
                    <p class="user-message">%message%</p>
                </div>
              </div>`,
  botChat: `<div class="bot-container">
              <div class="bot">
                <div class="bot-avatar bg-green">
                  <img src="/static/assets/icon/icon-answer.svg" alt="System">
                </div>
                <div class="bot-message">

                </div>
              </div>
            </div>`,
  spaceContainer: `<div class="space-container" id="chat-bottom"></div>`,
  markedCodeRender: {
    // codeBlock: `
    //         <div class="code-block">
    //           <div class="pre-title">
    //             <span>%language%</span>

    //           </div>            
    //             <pre><div class="code-box"><code class="hljs %validLanguage%">%highlightedCode%</code></div></pre>           
    //         </div>`,
    codeBlock: `
               <pre>
                  <div class="pre-container">                                                                    
                    <div class="pre-header">
                      <span>%language%</span>
                    </div>
                    <div class="code-container">                               
                      <code class="hljs %validLanguage%">%highlightedCode%</code>  
                    </div>                                   
                </pre>  
    `,
    codeBlock1: `
     <div class="pre-container">                                                                    
                    <div class="pre-header">
                      <span>%language%</span>
                    </div>
                    <div class="code-container">                               
                      <code class="hljs %validLanguage%">%highlightedCode%</code>  
                    </div> 
    `,
    codeBtn: `
            <button data-clipboard-action="copy" data-clipboard-target=".pre-title + pre code" class="btn-copy">  
              <ion-icon class="icon icon-copied" name="checkmark-outline"></ion-icon>
              <ion-icon class="icon icon-plate" name="clipboard-outline"></ion-icon>
              <span>Copy code</span>
            </button>`
  },
  menu: {
    chatIcon: `<ion-icon name="chatbox-outline" class="icon"></ion-icon>`,
    modify: `<ion-icon name="create-outline" class="icon icon-edit"></ion-icon>
             <ion-icon name="trash-outline" class="icon icon-trash"></ion-icon>`,
    confirm: `<ion-icon name="checkmark-outline" class="icon icon-confirm"></ion-icon>
              <ion-icon name="close-outline" class="icon icon-cancel"></ion-icon>`,
    yesIcon: `<ion-icon name="checkmark-outline" class="icon icon-confirm"></ion-icon>`,
    noIcon: `<ion-icon name="close-outline" class="icon icon-cancel"></ion-icon>`,
    trashIcon: `<ion-icon name="trash-outline" class="icon icon-trash"></ion-icon>`,
    editIcon: `<ion-icon name="create-outline" class="icon icon-edit"></ion-icon>`
  }
};
/**/
