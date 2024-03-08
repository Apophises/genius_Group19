

function isValidIDNumber(idNumber) {
    return /^[0-9]{9}$/.test(idNumber);
}

module.exports = isValidIDNumber

