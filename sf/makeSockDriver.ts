/*
// Notice we have the peerId specified when the driver is created in makeSockDriver(peerId). 
// If the main() needs to dynamically connect to different peers according to some logic, 
// then we shouldn’t use this API anymore. Instead, we need the driver function to take instructions 
// as input, such as “connect to peerId”, or “send message to peerId”. 
// This is one example of the considerations you should take when designing a driver API.
// import {adapt} from '@cycle/run/lib/adapt';

function makeSockDriver(peerId) {
  let sock = new Sock(peerId);

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

  return sockDriver;
}

//*/