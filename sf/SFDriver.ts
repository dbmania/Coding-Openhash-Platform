/*
// Listen all function in OP.
 // The DOM Driver, for instance, outputs a queryable collection of streams. 
  // The collection is in fact lazy: none of the streams outputted by select(selector).events(eventType) 
  // existed prior to the call of events(). This is because we cannot afford creating streams for 
  // all possible events on all elements on the DOM. Take inspiration from the lazy queryable 
  // collection of streams from the DOM Driver whenever the output source contains a large (possibly infinite) amount of streams.
  
eachOfFunctionsInOP.addListener({
  next: function handleNextEvent(event) {
    // do something with `event`
  },
  error: function handleError(error) {
    // do something with `error`
  },
  complete: function handleCompleted() {
    // do something when it completes
  },
});

// drivers only create source streams that emit events to the main(), 
// but don’t take in any sink from main(). An example of such would be 
// a read-only Web Socket driver, drafted below:
// no sinks
function WSDriver() {
  return xs.create({
    start: listener => {
      this.connection = new WebSocket('ws://localhost:4000');
      connection.onerror = (err) => {
        listener.error(err)
      }
      connection.onmessage = (msg) => {
        listener.next(msg)
      }
    },
    stop: () => {
      this.connection.close();
    },
  });
}


//*/