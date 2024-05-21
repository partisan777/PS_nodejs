function division(a, b) {
    if (b === 0 ) {
        return 'На ноль делить нельзя'
    }
    return a / b
};

module.exports = division;
