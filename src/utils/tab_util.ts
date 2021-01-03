export function getCurrentTabId(callback: any) {
    chrome.tabs.query({active: true,currentWindow: true},function(tabs) {
        if(callback) callback(tabs.length ? tabs[0].id : null)
    })
}

