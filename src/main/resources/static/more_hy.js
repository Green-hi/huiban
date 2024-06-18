document.addEventListener('DOMContentLoaded', function() {
    let totalPages = 0; // 初始化总页数

    function fetchMeetings(page) {
        fetch(`http://47.100.138.113:7777/conference/getAllPagingCon?pageNo=${page}&pageSize=20`)
        .then(response => response.json())
        .then(data => {
            if (data.code === 100 && data.data.records) {
                totalPages = data.data.pages; // 从响应中获取总页数
                populateTable(data.data.records);
                createPagination(page); // 每次获取数据后重新创建分页按钮
            } else {
                console.error('Failed to fetch data:', data.msg);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function populateTable(records) {
        const tbody = document.getElementById('meeting-data');
        tbody.innerHTML = ''; // 清空现有的表格行
        records.forEach(record => {
            const row = `<tr>
                <td>${record.ccflevel || ''}</td>
                <td>${record.corelevel || ''}</td>
                <td>${record.qualislevel || ''}</td>
                <td>${record.shortName || ''}</td>
                <td><a href="detail_hy.html?conferenceId=${record.id}" style="text-decoration: underline;">${record.name}</a></td>
                <td>${formatDate(record.dueDate)}</td>
                <td>${formatDate(record.infoDate)}</td>
                <td>${formatDate(record.meetingDate)}</td>
                <td>${record.location || ''}</td>
                <td>${record.session || ''}</td>
                <td>${record.views || ''}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }

    function createPagination(currentPage) {
        const container = document.querySelector('.pagination');
        container.innerHTML = ''; // 清空现有的分页按钮

        // 创建“前页”按钮
        const prevButton = document.createElement('button');
        prevButton.textContent = '<< 前页';
        prevButton.onclick = () => changePage(currentPage - 1);
        container.appendChild(prevButton);

        // 计算页码按钮的起始和结束范围
        let startPage = Math.max(1, currentPage - 4);
        let endPage = Math.min(totalPages, startPage + 9);
        startPage = Math.max(1, endPage - 9); // 确保总是显示10个按钮

        // 创建页码按钮
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = currentPage === i ? 'active' : '';
            pageButton.onclick = () => changePage(i);
            container.appendChild(pageButton);
        }

        // 创建“后页”按钮
        const nextButton = document.createElement('button');
        nextButton.textContent = '后页 >>';
        nextButton.onclick = () => changePage(currentPage + 1);
        container.appendChild(nextButton);
    }

    function changePage(page) {
        if (page < 1 || page > totalPages) return; // 超出页码范围不处理
        fetchMeetings(page); // 调用API获取新的页面数据
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';  // Directly return an empty string if the date is null
        const date = new Date(dateStr);
        return date.toLocaleDateString();  // Assuming that a valid date should be formatted
    }

    fetchMeetings(1); // 初始化页面时加载第一页
});
