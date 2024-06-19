document.addEventListener('DOMContentLoaded', function() {
    let totalPages = 0; // 初始化总页数

    function fetchJournals(page) {
        fetch(`http://47.100.138.113:7777/conference/getAllPagingJor?pageNo=${page}&pageSize=20`)
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
        const tbody = document.getElementById('journal-data');
        tbody.innerHTML = ''; // 清空现有的表格行
        records.forEach(journal => {  // 此处将 journal 定义为函数的参数
            const shortNameDisplay = journal.shortName !== "未知" ? journal.shortName : ''; 
            const row = `<tr>
                <td>${journal.ccflevel || ''}</td>
                <td>${shortNameDisplay}</td>
                <td><a href="detail_qk.html?journalId=${journal.id}" style="text-decoration: underline;">${journal.name}</a></td>
                <td>${journal.impactFactor || ''}</td>
                <td>${journal.publisher || ''}</td>
                <td>${journal.issn || ''}</td>
                <td>${journal.views || ''}</td>
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
        fetchJournals(page); // 调用API获取新的页面数据
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';  // Directly return an empty string if the date is null
        const date = new Date(dateStr);
        return date.toLocaleDateString();  // Assuming that a valid date should be formatted
    }

    fetchJournals(1); // 初始化页面时加载第一页
});
