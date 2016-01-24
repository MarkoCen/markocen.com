var months = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
];

module.exports = {
    formatTime: function (time) {
        var date = new Date(time);
        return `Posted on ${months[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`
    }
};