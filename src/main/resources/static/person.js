document.addEventListener('DOMContentLoaded', function() {
    updateLoginStatus();
    fetchUserMeetings();
    /*fetchUserJoinMeetings();*/
    fetchUserJournals();

    function updateLoginStatus() {
        const loginContainer = document.getElementById('loginContainer');
        const userDetails = JSON.parse(localStorage.getItem('userDetails')); // 获取用户详细信息
    
        if (userDetails && userDetails.email) {
            console.log(userDetails);
            document.getElementById('welcomeMessage').innerHTML = `<span id="userId">${userDetails.userName}</span>,你好！欢迎使用会伴系统！`;
            loginContainer.innerHTML = '<a href="./person.html">个人主页</a>'; // 更新导航链接
            displayPersonalInfo(userDetails);
        } else {
            loginContainer.innerHTML = '<a href="./login.html">登录</a>';
        }
    }
    
    function displayPersonalInfo(details) {
        document.getElementById('userNameDisplay').textContent = details.userName || '';
        document.getElementById('emailDisplay').textContent = details.email || '';
        document.getElementById('occupationDisplay').textContent = details.occupation || '';
        document.getElementById('createTimeDisplay').textContent = new Date(details.createTime).toLocaleDateString() || '';
        document.getElementById('briefIntroductionDisplay').textContent = details.briefIntroduction || '';
    }
    

    function fetchUserMeetings() {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (!userDetails || !userDetails.id) {
            console.error('No user details found in localStorage.');
            return;
        }

        const url = `http://47.100.138.113:7777/follow/selectByUidCon?uid=${userDetails.id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.code === 100 && data.data) {
                    populateMeetingsTable(data.data);
                } else {
                    console.error('Failed to fetch meetings:', data.msg);
                }
            })
            .catch(error => {
                console.error('Error fetching meetings:', error);
            });
    }

    function populateMeetingsTable(meetings) {
        const tbody = document.querySelector('.conference-list table tbody');
        tbody.innerHTML = ''; // 清空现有的表格行

        meetings.forEach(meeting => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${meeting.ccflevel || ''}</td>
                <td>${meeting.corelevel || ''}</td>
                <td>${meeting.qualislevel || ''}</td>
                <td>${meeting.shortName || ''}</td>
                <td><a href="detail_hy.html?conferenceId=${meeting.id}" style="text-decoration: underline;">${meeting.name}</a></td>
                <td>${formatDate(meeting.dueDate)}</td>
                <td>${formatDate(meeting.infoDate)}</td>
                <td>${formatDate(meeting.meetingDate)}</td>
                <td>${meeting.location || ''}</td>
                <td>${meeting.session || ''}</td>
                <td>${meeting.views || ''}</td>
                <td><button class="unfollow-btn" data-mid="${meeting.id}">取消关注</button></td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners to unfollow buttons
        document.querySelectorAll('.unfollow-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                unfollowMeeting(this.getAttribute('data-mid'));
            });
        });
    }

    function unfollowMeeting(mid) {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const url = `http://47.100.138.113:7777/follow/delete?uid=${userDetails.id}&cid=${mid}`;

        fetch(url, {
            method: 'POST',
        }).then(response => response.json())
          .then(data => {
              if (data.code === 100) {
                  alert(data.msg); // Display success message
                  location.reload(); // Reload the page to update the list
              } else {
                  alert('Failed to unfollow: ' + data.msg); // Display error message
              }
          })
          .catch(error => {
              console.error('Error unfollowing meeting:', error);
              alert('Operation failed, please try again later.');
          });
    }

    function formatDate(dateStr) {
        if (dateStr) {
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString();
            }
        }
        return '';
    }

    function fetchUserJoinMeetings() {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (!userDetails || !userDetails.id) {
            console.error('No user details found in localStorage.');
            return;
        }

        const url = `http://47.100.138.113:7777/schedule/selectByEmail?email=${userDetails.email}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.code === 100 && data.data) {
                    populateJoinMeetingsTable(data.data);
                } else {
                    console.error('Failed to fetch meetings:', data.msg);
                }
            })
            .catch(error => {
                console.error('Error fetching meetings:', error);
            });
    }

    function populateJoinMeetingsTable(meetings) {
        const tbody = document.querySelector('.conference-list table tbody');
        tbody.innerHTML = ''; // 清空现有的表格行

        meetings.forEach(meeting => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${meeting.ccflevel || ''}</td>
                <td>${meeting.corelevel || ''}</td>
                <td>${meeting.qualislevel || ''}</td>
                <td>${meeting.shortName || ''}</td>
                <td><a href="detail_hy.html?conferenceId=${meeting.id}" style="text-decoration: underline;">${meeting.name}</a></td>
                <td>${formatDate(meeting.dueDate)}</td>
                <td>${formatDate(meeting.infoDate)}</td>
                <td>${formatDate(meeting.meetingDate)}</td>
                <td>${meeting.location || ''}</td>
                <td>${meeting.session || ''}</td>
                <td>${meeting.views || ''}</td>
                <td><button class="unfollow-btn" data-mid="${meeting.id}">取消关注</button></td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners to unfollow buttons
        document.querySelectorAll('.unfollow-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                unfollowMeeting(this.getAttribute('data-mid'));
            });
        });
    }

    function unfollowMeeting(mid) {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const url = `http://47.100.138.113:7777/follow/delete?uid=${userDetails.id}&cid=${mid}`;

        fetch(url, {
            method: 'POST',
        }).then(response => response.json())
          .then(data => {
              if (data.code === 100) {
                  alert(data.msg); // Display success message
                  location.reload(); // Reload the page to update the list
              } else {
                  alert('Failed to unfollow: ' + data.msg); // Display error message
              }
          })
          .catch(error => {
              console.error('Error unfollowing meeting:', error);
              alert('Operation failed, please try again later.');
          });
    }

    function fetchUserJournals() {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (!userDetails || !userDetails.id) {
            console.error('No user details found in localStorage.');
            return;
        }

        const url = `http://47.100.138.113:7777/follow/selectByUidJor?uid=${userDetails.id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.code === 100 && data.data) {
                    populateJournalsTable(data.data);
                } else {
                    console.error('Failed to fetch journals:', data.msg);
                }
            })
            .catch(error => {
                console.error('Error fetching journals:', error);
            });
    }

    function populateJournalsTable(journals) {
        const tbody = document.querySelector('.journal-list table tbody');
        tbody.innerHTML = ''; // 清空现有的表格行

        journals.forEach(journal => {
            const row = document.createElement('tr');
            const shortNameDisplay = journal.shortName !== "未知" ? journal.shortName : '';
            row.innerHTML = `
                <td>${journal.ccflevel || ''}</td>
                <td>${shortNameDisplay || ''}</td>
                <td><a href="detail_qk.html?journalId=${journal.id}" style="text-decoration: underline;">${journal.name}</a></td>
                <td>${journal.impactFactor || ''}</td>
                <td>${journal.publisher || ''}</td>
                <td>${journal.issn || ''}</td>
                <td>${journal.views || ''}</td>
                <td><button class="unfollow-btn" data-mid="${journal.id}">取消关注</button></td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners to unfollow buttons
        document.querySelectorAll('.unfollow-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                unfollowJournal(this.getAttribute('data-mid'));
            });
        });
    }

    function unfollowJournal(mid) {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const url = `http://47.100.138.113:7777/follow/delete?uid=${userDetails.id}&cid=${mid}`;

        fetch(url, {
            method: 'POST',
        }).then(response => response.json())
          .then(data => {
              if (data.code === 100) {
                  alert(data.msg); // Display success message
                  location.reload(); // Reload the page to update the list
              } else {
                  alert('Failed to unfollow: ' + data.msg); // Display error message
              }
          })
          .catch(error => {
              console.error('Error unfollowing journal:', error);
              alert('Operation failed, please try again later.');
          });
    }

    window.logout = function() {
        localStorage.removeItem('userDetails'); // Clear user information
        window.location.href = 'login.html'; // Redirect to the login page
    }
});
