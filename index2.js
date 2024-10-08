

function _9(svgFaces)
{
  svgFaces;
  const elements = Array.from(document.querySelectorAll(".buddy"));

  const wait = () =>
    250 + Math.pow(elements.length, 0.75) * 1 * 1000 * Math.random();

  elements.forEach(function (buddy) {
    let timerId = setTimeout(function tick() {
      buddy.classList.add("wink");
      timerId = setTimeout(tick, wait());
    }, wait());
    buddy.addEventListener("animationend", () => {
      buddy.classList.remove("wink");
    });
  });
  return " ";
}


function _nCols(Inputs){return(
Inputs.range([1, 60], {
  step: 1,
  value: 13,
  label: "number of columns"
})
)}



function _splitn(Inputs){return(
  Inputs.range([0,1], {
    step: .1,
    value: .5,
    label: "Split"
  })
  )}

function _svgFaces(_,colors,chroma,svg,width,nCols,splitn)
{
  
  function looper(nx, ny) {
  
    const result = [];
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        result.push([i, j]);
      }
    }
    return result;
  }
  function oneFace(i, j) {
   

   let faceColor = "#f8e1e2";
    if (i/nCols >= splitn)  {
     faceColor =  "#BFF4BE";
    }
  

    let browColor = chroma(faceColor).darken(1);
    
    let mouthColor = chroma(faceColor).darken(2);
    return svg`<svg x=${i * w} y=${
      j * w
    } class="buddy" viewBox="-50 0 100 100">
        <ellipse cx="50" cy="30" rx="50" ry="50" class="face" fill="${faceColor}" />
        <ellipse cx="30" cy="27.5" rx="10" ry="10" class="eye right-eye" fill="white" stroke="none" vector-effect="non-scaling-stroke" stroke-width=1 />
        <ellipse cx="33" cy="27.5" rx="5" ry="5" class="eye right-eye" fill="black" stroke="none" />
        <ellipse cx="70" cy="27.5" rx="10" ry="10" class="eye left-eye" fill="white" stroke="none" vector-effect="non-scaling-stroke" stroke-width=1 />
        <ellipse cx="73" cy="27.5" rx="5" ry="5" class="eye left-eye" fill="black" stroke="none" />
        <path d="M30 50 c0 20, 40 20, 40 0" class="mouth" fill="${mouthColor}" stroke="none" />
        <path d="M17.5 10 c0 0, 12.5 -6, 25 0" class="eyebrow" fill="none" stroke="${browColor}" stroke-width=5 />
        <path d="M57.5 10 c0 0, 12.5 -6, 25 0" class="eyebrow" fill="none" stroke="${browColor}" stroke-width=5 />
      </svg>`;
  }
  
  
  const nRows = Math.floor(nCols / 2);
  const result = svg`<svg id="smileysvg" class="smiley" viewBox="-50 0 50 100">
${looper(nCols, nRows).map(([x, y]) => oneFace(x, y))}
</svg>`;
  return result;
}




function _13(htl){return(
htl.html`<style>
  /* css animations adapted from https://dev.to/5t3ph/how-to-create-an-animated-svg-face-with-css-5djd */
  svg {
    overflow: visible;
  }

  .wink > .left-eye, .wink > .right-eye {
    transform: scale(1);
    transform-origin: 45% 45%;
    animation: wink 250ms ease-in-out 1;
  }
  .blink > .left-eye, .blink > .right-eye {
    transform: scale(1);
    animation: wink 250ms ease-in-out 1;
  }
  .eye .white {
    fill: white;
  }

  .eyebrow {
    stroke-linecap: round;
    /*display: none;*/
  }
  @keyframes wink {
    50% {
      transform: scale(1.2, 0.1);
    }
    0%, 100% {
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      -webkit-animation-duration: 0.01ms !important;
              animation-duration: 0.01ms !important;
      -webkit-animation-iteration-count: 1 !important;
              animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
</style>`
)}








function _chroma(require){return(
require("chroma-js@2.4.2/chroma.js")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["svgFaces"], _9);
  main.variable(observer("viewof splitn")).define("viewof splitn", ["Inputs"], _splitn);
  main.variable(observer("splitn")).define("splitn", ["Generators", "viewof splitn"], (G, _) => G.input(_));
  main.variable(observer("viewof nCols")).define("viewof nCols", ["Inputs"], _nCols);
  main.variable(observer("nCols")).define("nCols", ["Generators", "viewof nCols"], (G, _) => G.input(_));
  main.variable(observer("svgFaces")).define("svgFaces", ["_","colors","chroma","svg","width","nCols","splitn"], _svgFaces);
  main.variable(observer()).define(["htl"], _13);
  main.variable(observer("chroma")).define("chroma", ["require"], _chroma);
  return main;
}
