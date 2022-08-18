

module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = "Username is required";
    }

    if (email.trim() === '') {
        errors.email = "email is required";
    } else {
        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!email.match(regEx)) {
            errors.email = "Invalid email address";
        }
    }

    if (password.trim() === '') {
        errors.password = "password is required";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Password must not macth confirmPassword";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}


module.exports.validateLogin = (
    username,
    password,
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = "Username is required";
    }

    if (password.trim() === '') {
        errors.password = "Password is required";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

module.exports.validateCreateMusic = (
    name
) => {
    const errors = {};
    if (name.trim() === '') {
        errors.name = "Name is required";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}