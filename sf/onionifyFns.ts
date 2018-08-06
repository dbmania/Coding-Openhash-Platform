/*
This function is to make all the functions in OP onionified streams.


const List = makeCollection({
    item: Child,
    itemKey: (childState, index) => String(index),
    itemScope: key => key,
    collectSinks: instances => {
      return {
        onion: instances.pickMerge('onion'),
        DOM: instances.pickCombine('DOM')
          .map(itemVNodes => ul(itemVNodes))
      }
    }
  });

//   To add a new child instance, the parent component just needs to concatenate the state array, like we did with this reducer in the parent:

const reducer$ = xs.periodic(1000).map(i => function reducer(prevArray) {
  return prevArray.concat({count: i})
});

// To delete a child instance, the child component to be deleted can send a reducer which returns undefined. This will tell the onionify internals to remove that piece of state from the array, and ultimately delete the child instance and its sinks too.

function Child(sources) {
  // ...

  const deleteReducer$ = deleteAction$.mapTo(function deleteReducer(prevState) {
    return undefined;
  });

  const reducer$ = xs.merge(deleteReducer$, someOtherReducer$);

  return {
    onion: reducer$,
    // ...
  };
}
//*/