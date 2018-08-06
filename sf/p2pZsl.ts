/*
// Notice we have the peerId specified when the driver is created in makeSockDriver(peerId). 
// If the main() needs to dynamically connect to different peers according to some logic, 
// then we shouldn’t use this API anymore. Instead, we need the driver function to take instructions 
// as input, such as “connect to peerId”, or “send message to peerId”. 
// This is one example of the considerations you should take when designing a driver API.
function main(sources) {
  const incoming$ = sources.sock;
  // Create outgoing$ (stream of string messages)
  // ...
  return {
    sock: outgoing$
  };
}

run(main, {
  sock: makeSockDriver('B23A79D5-some-unique-id-F2930')
});

//*/