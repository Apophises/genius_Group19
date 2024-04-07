function isValidUsername(username) {
    return /^[a-zA-Z0-9]{1,20}$/.test(username);
}

module.exports = isValidUsername