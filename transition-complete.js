var callbacks = [];

module.exports = function(callback) {
    if(callbacks.length === 0) {
        setEvent();
    }

    callbacks.push(callback);
};

function setEvent() {
    document.addEventListener(eventName(), function() {
        var i = callbacks.length;
        while(i--) {
            callbacks[i]();
        }

        callbacks = [];
    });
}

var _eventName;

function eventName() {
    if(!_eventName) {
        // Sourced from: http://stackoverflow.com/questions/5023514/how-do-i-normalize-css3-transition-functions-across-browsers
        var el = document.createElement('fakeelement');
            transitions = {
                transition:       'transitionend',
                OTransition:      'oTransitionEnd',
                MozTransition:    'transitionend',
                WebkitTransition: 'webkitTransitionEnd'
            };

        for(var t in transitions) {
            if(el.style[t] !== undefined) {
                _eventName = transitions[t];
            }
        }
    }

    return _eventName;
}
