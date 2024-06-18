document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取URL中的会议ID
    const urlParams = new URLSearchParams(window.location.search);
    const conferenceId = urlParams.get('conferenceId');

    if (conferenceId) {
        // 2. 使用会议ID调用API获取详细信息
        fetchConferenceDetails(conferenceId);
    } else {
        console.error("会议ID未提供！");
        alert("会议ID未提供！");
    }
});

function fetchConferenceDetails(conferenceId) {
    const apiUrl = `http://47.100.138.113:7777/conference/selectById?id=${conferenceId}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.code === 100) {
            // 3. 填充会议信息到页面
            populateConferenceDetails(data.data);
        } else {
            console.error('获取会议详情失败:', data.msg);
            alert('获取会议详情失败: ' + data.msg);
        }
    })
    .catch(error => {
        console.error('Error fetching conference details:', error);
        alert('无法获取会议详情，请检查网络连接');
    });
}

function populateConferenceDetails(details) {
    document.getElementById('conferenceName').textContent = details.name;
    document.getElementById('submissionDeadline').textContent = formatDate(details.dueDate);
    document.getElementById('notificationDate').textContent = formatDate(details.infoDate);
    document.getElementById('conferenceDate').textContent = formatDate(details.meetingDate);
    document.getElementById('conferenceLocation').textContent = details.location;
    document.getElementById('edition').textContent = details.session;
    document.getElementById('viewCount').textContent = details.views;
    document.getElementById('callforpapers').textContent=details.introduction;

    // 设置会议ID为关注按钮的数据属性
    const followBtn = document.getElementById('followBtn');
    followBtn.setAttribute('data-conference-id', details.id);
    
    followBtn.addEventListener('click', function() {
        followConference(details.id);
    });
}

function formatDate(dateStr) {
    // 如果日期存在并且不是null，才尝试转换和格式化
    if (dateStr) {
        const date = new Date(dateStr);
        // 检查转换后的日期是否有效
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString();
        }
    }
    // 如果日期是null或无法转换，返回空字符串
    return '';
}


function followConference(conferenceId) {
    const userId = JSON.parse(localStorage.getItem('userDetails'))?.id;
    console.log(userId);
    if (!userId) {
        alert("你还未登录，请先登录！");
        window.location.href = 'login.html';
        return;
    }
    console.log(conferenceId);

    const url = `http://47.100.138.113:7777/follow/add?uid=${userId}&cid=${conferenceId}`;
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
