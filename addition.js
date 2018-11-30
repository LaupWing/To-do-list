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

window.onload = function(){
  setTimeout(function(){
    document.querySelector("body").classList.remove("preload")
  },1500)
}

const form = document.querySelector("#itemForm");

function checkAllitems(){
  const items = document.querySelectorAll(".item-name")
  let count = 0;
  items.forEach(function(item){
    if(item.className.includes("completed")){
      count++
    }else{
      console.log("no")
    }
  })
  if(count == itemData.length){
    console.log("is gelijk")
  }
}

function changeDisplay(){
  const containerPos = document.querySelector(".container").getBoundingClientRect().top;
  if(containerPos < 60){
    // document.querySelector("body").style.display = "block"
    document.querySelector("body").classList.add("setBlock")
    document.querySelector(".container").style.marginTop = "20px"
  }
}
