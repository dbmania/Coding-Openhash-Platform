/*

// there shall be only one main function in OP. this is it.

function main(sources) {
    const props$ = xs.of({
      label: 'Radius', unit: '', min: 10, value: 30, max: 100
    });
    const childSources = {DOM: sources.DOM, props: props$};
    const labeledSlider = LabeledSlider(childSources);
    const childVDom$ = labeledSlider.DOM;
    const childValue$ = labeledSlider.value;
  
    // ...
  }
  //*/