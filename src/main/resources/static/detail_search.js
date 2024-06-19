document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const searchKeyword = params.get('keyword');  // 获取名为'keyword'的查询参数

    if (searchKeyword) {
        const decodedKeyword = decodeURIComponent(searchKeyword);  // 解码查询关键词
        fetchSearchResults(decodedKeyword);
    }

    function fetchSearchResults(query) {
        fetch(`http://47.100.138.113:7777/conference/selectByName?name=${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.code === 100 && data.data) {
                    console.log(data.data);
                    displayResults(data.data);
                } else {
                    console.error('Search failed:', data.msg);
                    displayNoResults();
                }
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                displayNoResults();
            });
    }

    function displayResults(records) {
        const conferenceData = document.getElementById('conference-data');
        const journalData = document.getElementById('journal-data');
        conferenceData.innerHTML = '';  // 清空现有的表格行
        journalData.innerHTML = '';  // 清空现有的表格行
    
        records.forEach(item => {
            const row = document.createElement('tr');
            const shortNameDisplay = item.shortName !== "未知" ? item.shortName : '';
            if (item.type === "1") {  // Assuming type "1" is for journals
                row.innerHTML = `
                    <td>${item.ccflevel || ''}</td>
                    <td>${shortNameDisplay || ''}</td>
                    <td><a href="detail_qk.html?itemId=${item.id}" style="text-decoration: underline;">${item.name}</a></td>
                    <td>${item.impactFactor || ''}</td>
                    <td>${item.publisher || ''}</td>
                    <td>${item.issn || ''}</td>
                    <td>${item.views || ''}</td>
                `;
                journalData.appendChild(row);
            } else {  // Otherwise, it's a conference
                row.innerHTML = `
                    <td>${item.ccflevel || ''}</td>
                    <td>${item.corelevel || ''}</td>
                    <td>${item.qualislevel || ''}</td>
                    <td>${shortNameDisplay || ''}</td>
                    <td><a href="detail_hy.html?conferenceId=${item.id}" style="text-decoration: underline;">${item.name}</a></td>
                    <td>${formatDate(item.dueDate)}</td>
                    <td>${formatDate(item.infoDate)}</td>
                    <td>${formatDate(item.meetingDate)}</td>
                    <td>${item.location || ''}</td>
                    <td>${item.session || ''}</td>
                    <td>${item.views || ''}</td>
                `;
                conferenceData.appendChild(row);
            }
        });
    }
    

    function displayNoResults() {
        const conferenceData = document.getElementById('conference-data');
        const journalData = document.getElementById('journal-data');
        conferenceData.innerHTML = '<tr><td colspan="5">没有搜索到符合要求的会议</td></tr>';
        journalData.innerHTML = '<tr><td colspan="5">没有搜索到符合要求的期刊</td></tr>';
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    }
});
