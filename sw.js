'use strict';

chrome.action.setBadgeTextColor({ color: '#fff' });
chrome.action.setBadgeBackgroundColor({ color: '#efb336' });

chrome.webRequest.onBeforeRequest.addListener(async ({ tabId, url, method }) => {
    if (method !== "GET") {
        return;
    }
    try {
        const res = await chrome.tabs.sendMessage(tabId, { link: url });
        if (!res || res?.data?.length === 0) return;
        const { data } = res;
        chrome.action.setBadgeText({ tabId, text: data.length + '' });
    } catch (reason) { }
}, { urls: ["*://*/*.m3u8*"] });


const EXT_PAGE = chrome.runtime.getURL('/player/video.html');
const RULES = {
    removeRuleIds: [1],
    addRules: [
        {
            id: 1,
            priority: 1,
            action: {
                type: "redirect",
                redirect: {
                    regexSubstitution: EXT_PAGE + '#\\0'
                }
            },
            condition: {
                regexFilter: "[^:]*://[^/]+/.*?\.m3u8.*",
                resourceTypes: [
                    "main_frame"
                ]
            }
        },
    ]
};
try {
    chrome.declarativeNetRequest.updateDynamicRules(RULES);
} catch (reason) { }
