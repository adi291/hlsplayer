'use strict';

const links = [];
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.link && !links.includes(message.link))
        links.push(message.link);
    try {
        sendResponse({ data: links });
    } catch (reason) { }
});
