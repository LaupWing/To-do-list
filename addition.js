const pressed = [];
const secretCode = "namara"
window.addEventListener('keyup', function(e){
  pressed.push(e.key);
  pressed.splice(-secretCode.length-1, pressed.length -secretCode.length);
  if(e.key === "Backspace"){
    pressed.splice(-1,2);
  }
  if(pressed.join("").includes(secretCode)){
    document.querySelector("audio").play();
    document.querySelector("iframe").style.transform= "scale(1)";
    setTimeout(function(){
      document.querySelector("iframe").style.transform= "scale(0)";
    },12000)
  }
})

const form = document.querySelector("#itemForm");
