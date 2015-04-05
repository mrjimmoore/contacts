// inspects each keystroke and inserts text at the point of special key sequences
app.directive("jimHotKeys", function () {
    var lastKeyCode = 0;

    // insert text at cursor of element and remove the 2 character hot key sequence
    function insertAtCursor(element, myValue, event) {
        if (element.selectionStart || element.selectionStart == '0') {
            var startPos = element.selectionStart - 1; // -1 to remove the first hot key character
            var endPos = element.selectionEnd;
            var scrollTop = element.scrollTop;
            element.value = element.value.substring(0, startPos) + myValue + element.value.substring(endPos, element.value.length);
            element.focus();
            element.selectionStart = startPos + myValue.length;
            element.selectionEnd = startPos + myValue.length;
            element.scrollTop = scrollTop;
        } else {
            element.value += myValue;
            element.focus();
        }
        event.preventDefault();
    }

    // evaluate each keystroke
    return {
        link: function (scope, element, attributes) {
            element.on("keypress", function (event) {
                if (lastKeyCode == 47) { // forward slash
                    if (event.keyCode == 70 || event.keyCode == 102) { // F or f
                        lastKeyCode = 0; // set to null
                        insertAtCursor(this, "[/f here]", event);
                    }
                }
                if (!event.shiftKey) lastKeyCode = event.keyCode; // ignore shift key
            })
        }
    }
});