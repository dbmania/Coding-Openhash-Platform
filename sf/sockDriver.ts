/*

import {adapt} from '@cycle/run/lib/adapt';

function sockDriver(outgoing$) {
  outgoing$.addListener({
    next: outgoing => {
      sock.send(outgoing);
    },
    error: () => {},
    complete: () => {},
  });

  const incoming$ = xs.create({
    start: listener => {
      sock.onReceive(function (msg) {
        listener.next(msg);
      });
    },
    stop: () => {},
  });

  return adapt(incoming$);
}

//*/