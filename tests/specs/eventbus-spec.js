define(['EventBus'], function (EventBus) {
    describe('EventBus', function () {

        var events;
        var counter;
        var event = 'event';

        function increment(n) {
            counter += n || 1;
        }

        beforeEach(function () {
            events = new EventBus();
            counter = 0;
        });

        it('calls a function associated with an event every time this event is emitted', function () {
            events.on(event, increment);
            events.emit(event);
            events.emit(event);
            expect(counter).toBe(2);
        });

        it('disassociates a function from an event', function () {
            events.on(event, increment);
            events.off(event, increment);
            events.emit(event);
            expect(counter).toBe(0);
        });

        it('automatically disassociates a function after its execution', function () {
            events.once(event, increment);
            events.emit(event);
            events.emit(event);
            expect(counter).toBe(1);
        });

        it('associates more than a function to an event', function () {
            events.on(event, increment);
            events.on(event, increment);
            events.emit(event);
            expect(counter).toBe(2);
        });

        it('passes arguments emitted with the event to the associated function', function () {
            events.on(event, increment);
            events.emit(event, 2);
            expect(counter).toBe(2);
        });

        it('handles hierarchies of events', function () {
            var subEvent = 'event.sub';
            var subCounter = 0;

            function subIncrement(n) {
                subCounter += n || 1;
            }

            events.on(event, increment);
            events.on(subEvent, subIncrement);
            events.on(event, function () {
                var array = Array.slice(arguments);
                events.emit.apply(events, [subEvent].concat(array));
            });

            events.emit(subEvent);
            events.emit(event);
            expect(counter).toBe(1);
            expect(subCounter).toBe(2);
        });
    });
});