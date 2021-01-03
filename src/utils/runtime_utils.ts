/**
 * 能够在content script通用的api
 */
/**
 * 获取扩展中资源的路径
 * @param path 资源路径
 */
export function getUrl(path:string):string {
        return chrome.runtime.getURL(path);
}