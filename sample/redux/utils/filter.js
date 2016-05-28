app.filter('textCut', function () {
    return function (value, isWordsBound, max, tail) {
        if (!value) {
            return '';
        }
        max = parseInt(max, 10);
        if (!max || value.length <= max) {
            return value;
        }
        value = value.substr(0, max);
        if (isWordsBound) {
            var lastSpace = value.lastIndexOf(' ');
            if (lastSpace !== -1) {
                value = value.substr(0, lastSpace);
            }
        }
        return value + (tail || ' ...');
    };
});

app.filter('textSplit', function () {
    return function (value, split, index) {
        var result = '';
        if (value && value.indexOf(split) > 0) {
            var valueArray = value.split(split);
            result = (index > valueArray.length - 1) ? value : valueArray[index];
        } else {
            result = value;
        }
        return result;
    };
});
