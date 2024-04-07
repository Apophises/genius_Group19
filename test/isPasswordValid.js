function isPasswordValid(password) {
return /^[a-zA-Z0-9]{1,18}$/.test(password);
}

module.exports = isPasswordValid