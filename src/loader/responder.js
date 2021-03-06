/* @flow */

export function responder() : { respond : (error : ?Error, result : ?mixed) => void, listen : (callback : (error : ?Error, result : ?mixed) => void) => void } {

    let callbacks = [];
    let loaded = false;

    let err;
    let res;

    function flush() {
        if (loaded) {
            while (callbacks.length) {
                callbacks.shift().call(null, err, res);
            }
        }
    }

    function respond(error : ?Error, result : ?mixed) {

        loaded = true;
        err    = error;
        res    = result;

        flush();
    }

    function listen(callback : (error : ?Error, result : ?mixed) => void) {
        callbacks.push(callback);
        flush();
    }

    return { respond, listen };
}
