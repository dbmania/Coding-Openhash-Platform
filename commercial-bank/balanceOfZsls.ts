/*
Initialize all the bank accounts of zsls to zero(0).
*/
const initBankAccounts = {

}


// state in the parent: { foo: 3, bar: 8, status: 'ready' }
/*
const fooLens = { //    { val: 3, status: 'ready' }
  get: state => ({val: state.foo, status: state.status}),
  set: (state, childState) => ({...state, foo: childState.val, status: childState.status})
};

const barLens = { //    { val: 8, status: 'ready' }
  get: state => ({val: state.bar, status: state.status}),
  set: (state, childState) => ({...state, bar: childState.val, status: childState.status})
};

const fooSinks = isolate(Child, {onion: fooLens})(sources);
const barSinks = isolate(Child, {onion: barLens})(sources);
//*/
