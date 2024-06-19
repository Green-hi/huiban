document.addEventListener('DOMContentLoaded', function() {
    updateLoginStatus();
    setupSearchForm();

    function updateLoginStatus() {
        const loginContainer = document.getElementById('loginContainer');
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));

        if (userDetails && userDetails.email) {
            loginContainer.innerHTML = `<a href="./person.html">个人主页</a>`;
        } else {
            loginContainer.innerHTML = '<a href="./login.html">登录</a>';
        }
    }

    function setupSearchForm() {
        const form = document.getElementById('searchForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchQuery = document.getElementById('searchInput').value.trim();
            console.log(encodeURIComponent(searchQuery));
            if (searchQuery) {
                window.location.href = `./detail_search.html?keyword=${encodeURIComponent(searchQuery)}`;
            }
        });
    }
});
