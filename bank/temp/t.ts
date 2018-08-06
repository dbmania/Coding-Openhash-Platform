import fromDiagram from 'xstream/extra/fromDiagram'
import throttle from 'xstream/extra/throttle'

const stream = fromDiagram('--1-2-----3--4----5|')
 .compose(throttle(60))

stream.addListener({
  next: i => console.log(i),
  error: err => console.error(err),
  complete: () => console.log('completed')
})