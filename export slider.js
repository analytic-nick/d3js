
function _nCols(Inputs){return(
Inputs.range([1, 60], {
  step: 1,
  value: 13,
  label: "number of columns"
})
)}

export default function define(runtime, observer) {
    const main = runtime.module();
   main.variable(observer("viewof nCols")).define("viewof nCols", ["Inputs"], _nCols);
   main.variable(observer("nCols")).define("nCols", ["Generators", "viewof nCols"], (G, _) => G.input(_));
}