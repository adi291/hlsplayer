const tips = document.querySelector(".tips span");
const linkList = document.getElementById("linkList");

const renderLink = link => {
    const linkDiv = document.createElement("div");
    linkDiv.classList.add("link");

    const textDiv = document.createElement("div");
    textDiv.classList.add("text");
    const span = document.createElement("span");
    span.setAttribute("title", link);
    span.textContent = link;
    textDiv.appendChild(span);
    linkDiv.appendChild(textDiv);

    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon");
    const a = document.createElement("a");
    a.setAttribute("href", link);
    a.setAttribute("target", "_blank");
    const img = document.createElement("img");
    img.setAttribute("src", "images/to.png");
    a.appendChild(img);
    iconDiv.appendChild(a);
    linkDiv.appendChild(iconDiv);
    return linkDiv;
};

const renderLinkList = data => {
    data.forEach(link => {
        linkList.appendChild(renderLink(link));
    });
};

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tabId = tabs[0].id;
    try {
        chrome.tabs.sendMessage(tabId, { data: true }, res => {
            if (!res || !res?.data) return;
            const { data } = res;
            if (data.length === 0) {
                tips.textContent = "未发现m3u8请求";
            } else {
                tips.textContent = "单击链接文字可全选。单机图标打开播放";
                renderLinkList(data);
            }
        });
    } catch (reason) { }
});
/*
<div class="link">
    <div class="text">
        <span title="https://example.com/example.m3u8">
            https://example.com/example.m3u8
        </span>
    </div>
    <div class="icon">
        <a href="#">
            <img src="images/to.png" />
        </a>
    </div>
</div>
*/
