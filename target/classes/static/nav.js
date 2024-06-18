document.addEventListener('DOMContentLoaded', function() {
    updateLoginStatus();

    function updateLoginStatus() {
        const loginContainer = document.getElementById('loginContainer');
        // 获取存储的用户详细信息
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));

        if (userDetails && userDetails.email) {
            // 如果用户已登录，显示链接到个人主页的按钮
            loginContainer.innerHTML = `<a href="./person.html">个人主页</a>`;
        } else {
            // 如果用户未登录，显示登录链接
            loginContainer.innerHTML = '<a href="./login.html">登录</a>';
        }
    }

    // 提供一个更简单的登出功能，可能放在个人主页上
    // 这里不在导航栏提供直接登出功能
});
