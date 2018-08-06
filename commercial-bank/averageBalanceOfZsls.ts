// the average of an array of numbers:

// state in the parent: { xs: [23, 12, 25] }

const averageLens = {// { avg: 20 }
  get: state => ({avg: state.xs.reduce((a, b) => a + b, 0) / state.xs.length}),
  set: (state, childState) => state // ignore updates
}