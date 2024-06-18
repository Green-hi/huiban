document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取URL中的期刊ID
    const urlParams = new URLSearchParams(window.location.search);
    const journalId = urlParams.get('journalId');

    if (journalId) {
        // 2. 使用期刊ID调用API获取详细信息
        fetchjournalDetails(journalId);
    } else {
        console.error("期刊ID未提供！");
        alert("期刊ID未提供！");
    }
});

function fetchjournalDetails(journalId) {
    const apiUrl = `http://47.100.138.113:7777/conference/selectById?id=${journalId}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.code === 100) {
            // 3. 填充期刊信息到页面
            populateJournalDetails(data.data);
        } else {
            console.error('获取期刊详情失败:', data.msg);
            alert('获取期刊详情失败: ' + data.msg);
        }
    })
    .catch(error => {
        console.error('Error fetching journal details:', error);
        alert('无法获取期刊详情，请检查网络连接');
    });
}

function populateJournalDetails(details) {
    console.log(details);
    document.getElementById('journalName').textContent = details.name;
    // 更新超链接的href属性和显示文本
    const linkElement = document.getElementById('link');
    linkElement.href = details.link;  // 设置超链接目标地址
    linkElement.textContent = details.link;  // 显示链接地址，或者可替换为"访问主页"等文本

    document.getElementById('publish').textContent = details.publisher;
    document.getElementById('issn').textContent = details.issn;
    document.getElementById('viewCount').textContent = details.views;
    document.getElementById('attention').textContent = details.follows;
    document.getElementById('callforpapers').textContent = details.introduction;

    // 设置期刊ID为关注按钮的数据属性
    const followBtn = document.getElementById('followBtn');
    followBtn.setAttribute('data-journal-id', details.id);

    followBtn.addEventListener('click', function() {
        followJournal(details.id);
    });
}



function followJournal(journalId) {
    const userId = JSON.parse(localStorage.getItem('userDetails'))?.id;
    console.log(userId);
    if (!userId) {
        alert("你还未登录，请先登录！");
        window.location.href = 'login.html';
        return;
    }
    console.log(journalId);

    const url = `http://47.100.138.113:7777/follow/add?uid=${userId}&cid=${journalId}`;
    fetch(url, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
        if (data.code === 100) {
            alert("关注成功！");
        } else {
            alert("关注失败: " + data.msg);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('关注操作失败，请稍后重试。');
    });
}
