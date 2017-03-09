var SIGN_REGEXP = /([yMdhsm])(\1*)/g;       //日期格式化
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

function format(date, pattern) {
    pattern = pattern || DEFAULT_PATTERN;
    return pattern.replace(SIGN_REGEXP, function($0) { //第0组开始正则匹配
        switch ($0.charAt(0)) {
            case 'y':
                return padding(date.getFullYear(), $0.length); 01
            case 'M':
                return padding(date.getMonth() + 1, $0.length);
            case 'd':
                return padding(date.getDate(), $0.length);
            case 'w':
                return date.getDay() + 1;
            case 'h':
                return padding(date.getHours(), $0.length);
            case 'm':
                return padding(date.getMinutes(), $0.length);
            case 's':
                return padding(date.getSeconds(), $0.length);
        }
    });
}

// example var k = format(new Date('2015-1-1 11:2:55'), 'yyyy-MM-dd hh:mm');console.log(k)



