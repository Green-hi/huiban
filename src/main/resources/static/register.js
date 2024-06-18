function submitRegistration() {
    var email = document.getElementById('email');
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirm-password');
    var position = document.getElementById('position');
    var bio = document.getElementById('bio');

    var isValid = true;

    // 清除以前的错误信息
    document.querySelectorAll('.error-message').forEach(function(el) {
        el.textContent = '';
    });

    // 检查必填项
    if (!email.value) {
        document.getElementById('emailError').textContent = '必选项未填！';
        isValid = false;
    }
    if (!username.value) {
        document.getElementById('usernameError').textContent = '必选项未填！';
        isValid = false;
    }
    if (!password.value) {
        document.getElementById('passwordError').textContent = '必选项未填！';
        isValid = false;
    }
    if (!confirmPassword.value) {
        document.getElementById('confirmPasswordError').textContent = '必选项未填！';
        isValid = false;
    }

    // 检查密码长度
    if (password.value && password.value.length < 6) {
        document.getElementById('passwordError').textContent = '密码长度必须大于6';
        isValid = false;
    }

    // 检查密码一致性
    if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
        document.getElementById('confirmPasswordError').textContent = '前后两次密码不一致！';
        isValid = false;
    }

    // 如果验证通过，则发送数据到服务器
    if (isValid) {
        var userData = {
            uid: "",
            email: email.value,
            userName: username.value,
            password: password.value,
            occupation: position.value || "",
            sex: "",
            briefIntroduction: bio.value || ""
        };

        fetch('http://47.100.138.113:7777/user/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(data => {
            alert('注册成功！');
            window.location.href = 'login.html'; // 跳转到登录页面
        }).catch(error => {
            console.error('Error:', error);
            alert('注册失败，请重试！');
        });
    }
}
