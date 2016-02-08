define(function () {
    function EventBus() {
        var map = Object.create(null);

        this.on = function (event, action) {
            if (map[event])
                map[event].push(action);
            else
                map[event] = [action];
        };

        this.off = function (event, action) {
            var actions = map[event];
            if (actions) {
                var index = actions.indexOf(action);
                actions.splice(index, 1);
            }
        };

        this.once = function (event, action) {
            var that = this;
            this.on(event, function () {
                action.apply(null, arguments);
                that.off(event, action);
            });
        };

        this.emit = function (event, args) {
            var actions = map[event];
            if(actions)
                for(var i = 0; i < actions.length; i++)
                    actions[i](args);
        };
    }

    return EventBus;
});