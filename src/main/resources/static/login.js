document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // 清除旧的错误信息
    clearErrors();

    // 检查输入
    if (!email) {
        displayError(emailInput, '请输入邮箱！');
        return;
    }
    if (!password) {
        displayError(passwordInput, '请输入密码！');
        return;
    }

    // API请求查找用户
    fetch(`http://47.100.138.113:7777/user/selectOneByEmail?email=${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(data => {
            // 检查用户存在且密码匹配
            if (!data || data.data.password !== password) {
                displayError(null, '用户名或密码错误！');
            } else {
                // 登录成功，保存用户数据
                localStorage.setItem('userDetails', JSON.stringify(data.data));
                alert('登录成功！');
                window.location.href = 'mainpage.html'; // 假设登录后跳转到主页
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayError(null, '登录失败，请重试！');
        });
});

function displayError(inputElement, message) {
    const errorElement = document.createElement('span');
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    if (inputElement) {
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    } else {
        document.querySelector('.login-form').appendChild(errorElement);
    }
}

function clearErrors() {
    document.querySelectorAll('.login-form span').forEach(span => span.remove());
}
