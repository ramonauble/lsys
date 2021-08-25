$(document).ready(function() {
  //reference canvas & get/configure context for drawing
  const $lsysCanv = $("#lsysCanv");
  const lsysCanvCtx = $lsysCanv[0].getContext("2d");
  const lCanvW = lsysCanv.width;
  const lCanvH = lsysCanv.height;
  lsysCanvCtx.fillStyle = "#5D2E7B";
  lsysCanvCtx.lineWidth = .25;
  lsysCanvCtx.strokeStyle = "#000000";
  lsysCanvCtx.font = "30px monospace";
  lsysCanvCtx.textAlign = "center";

  //A: 1, 0, <, >
  //  V: 1, 0
  //  C: <, >
  //w: 0
  //P: 1 -> 11 | 0 -> 1<0>0

  var state = "0";  //initialize system
  console.log(state + "\n");
  state = calcL(6, state);

  var base = 5;          //10px base line length
  var angle = Math.PI/2;  //init direction to 90deg
  var x = lCanvW/2;       //horizontally center
  var y = lCanvH - 90;         //start at bottom of canvas
  var xStack = [];        //xPos stack
  var yStack = [];        //yPos stack
  var aStack = [];        //angle stack
  lsysCanvCtx.beginPath();

  for(let n = 0; n < state.length; n++) {
    if (state[n] == "1") {  //draw line of base length
      lsysCanvCtx.moveTo(x, y);
      x = x + Math.cos(angle)*base;
      y = y - Math.sin(angle)*base;
      lsysCanvCtx.lineTo(x, y);
    } else if (state[n] == "0") { //draw line of half length
      lsysCanvCtx.moveTo(x, y);
      x = x + Math.cos(angle)*base;
      y = y - Math.sin(angle)*base;
      lsysCanvCtx.lineTo(x, y);
    } else if (state[n] == "<") { //push pos & angle, rotate L 45deg
      xStack.push(x); //save xPos
      yStack.push(y); //save yPos
      aStack.push(angle); //save angle
      angle = angle + (Math.PI/4);  //rotate left 45deg
    } else if (state[n] == ">") {
      x = xStack.pop(); //restore xPos
      y = yStack.pop(); //restore yPos
      angle = aStack.pop();  //restore angle
      angle = angle - (Math.PI/4);  //rotate right 45deg
    }
    lsysCanvCtx.stroke();
  }

  function calcL(depth, initState) {
    let innerState = initState;
    for(let n = 0; n < depth; n++) {  //stage loop
      let tempState = "";
      for(let l = 0; l < innerState.length; l++) { //rule loop
        if (innerState[l] == "0") { //0 -> 1<0>0
          tempState += "1<0>0";
        } else if (innerState[l] == "1") {  //1 -> 11
          tempState += "11";
        } else {  //constants | < -> <, > -> >
          tempState += innerState[l];
        }
      }
      innerState = tempState
      console.log(innerState + "\n");
    }
    return innerState;
  }
});
