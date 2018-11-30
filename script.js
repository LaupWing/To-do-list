// Elementen ophalen uit de DOM
const itemForm = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemList = document.querySelector(".item-lijst");
const clearBtn = document.querySelector("#clear-lijst");
const feedback = document.querySelector(".feedback");
const header = document.querySelector("header")



let itemData = JSON.parse(localStorage.getItem("list")) || []; // Als de parse van de localStorage
// van list niet succesvol is gelopen dus een false geeft dan word er een lege array gebruikt.

// Checken of er iets in de storage is
if (itemData.length > 0) {
  itemData.forEach(function(singleItem) {
    // Verschil tussen insertAdjacentHTML en append child is:
    // Met append child moet je de element in meegeven
    // En dan moet je dus eerst het element nog gaan creëren
    // Eerste parameter is waar wil ik de HTML code inzetten
    itemList.insertAdjacentHTML('beforeend', `
    <div class="item startTransition">
    <h5 class="item-name">${singleItem}</h5>
    <div class="item-icons">
      <a href="#" class="complete-item"><i class="far fa-check-square"></i></a>
      <a href="#" class="edit-item"><i class="far fa-edit"></i></a>
      <a href="#" class="delete-item"><i class="far fa-trash-alt"></i></a>
    </div>
    </div>
    `)
    handleItem(singleItem)
  })
}


// luister naar een form submtion event
itemForm.addEventListener('submit', function(event) {
  // Zorgt ervoor dat de page niet gaat refreshen.
  // Want dit is een default gedrag van de submit event
  event.preventDefault();

  // De input waarde word in een const gestopt
  const textValue = itemInput.value;
  if (textValue === "") {
    showFeedback('Vul wat in man!', "GEVAAR");
  } else {
    // Voeg item toe aan div
    additem(textValue);

    // Clear de input tekst itemForm
    itemInput.value = "";
    // In de array itemData word de textValue in gepushed
    // oftewel de textvalue komt in de array terecht
    itemData.push(textValue);
    localStorage.setItem("list", JSON.stringify(itemData))
    handleItem(textValue);
  }
  changeDisplay()
});
// Laat de feedback zien als er niks word ingevuld
function showFeedback(text, action) {

  feedback.classList.add("showItem", `alert-${action}`);
  feedback.innerHTML = `<p>${text}</p>`

  setTimeout(function() {
    feedback.classList.remove("showItem", `alert-${action}`);
  }, 3000)
}

// Add item function
function additem(value) {
  // Een lege div elemente word aangemaakt
  const div = document.createElement('div');
  // Aan het lege div element word een class aan toegevoegd
  div.classList.add('item');
  // De inner html van de lege div word nu gevult met de volgende elementen en content
  div.innerHTML = `
    <h5 class="item-name">${value}</h5>
    <div class="item-icons">
      <a href="#" class="complete-item"><i class="far fa-check-square"></i></a>
      <a href="#" class="edit-item"><i class="far fa-edit"></i></a>
      <a href="#" class="delete-item"><i class="far fa-trash-alt"></i></a>
    </div>
  `;
  // De div is nu gevuld en word als child ingeveogd van de itemlist
  itemList.appendChild(div);
  transitionItem(value, false)
}

function transitionItem(textValue) {
  const items = itemList.querySelectorAll(".item");
  const formOffset = itemForm.offsetTop;

  if (textValue !== " ") {
    items.forEach(function(item) {
      if (item.querySelector('.item-name').textContent === textValue) {
        const itemOffset = item.offsetTop
        const startPos = formOffset - itemOffset
        item.style.transform = `translate(0,${startPos}px)`
        setTimeout(function() {
          // item.style.opacity = 1;
          item.classList.add("startTransition")
        }, 100)
      }
    })
  } else {
    items.forEach(function(item) {
      const itemOffset = item.offsetTop
      const startPos = formOffset - itemOffset
      item.classList.remove("startTransition")
    })
    console.log("test")
  }
}

function handleItem(textValue) {
  const items = itemList.querySelectorAll(".item");
  items.forEach(function(item) {
    if (item.querySelector('.item-name').textContent === textValue) {
      // hier word gegekeken of de item name element inhoud gelijk is aan de zojuist ingevulde waarde
      // als dat zo is word er een event toegevoegd. Dit zorgt ervoor dat er niet elke keer events onnodig
      // word

      // complete button event addEventListener
      item
        .querySelector(".complete-item")
        .addEventListener("click", function() {
          item.querySelector(".item-name").classList.toggle("completed")
          this.classList.toggle("visibility")
          checkAllitems()
        })
      // edit events
      item
        .querySelector(".edit-item")
        .addEventListener("click", function() {
          itemInput.value = textValue;
          itemList.removeChild(item);
          itemData = itemData.filter(function(item) {
            return item !== textValue
          })
          localStorage.setItem("list", JSON.stringify(itemData))
        })
      // delete events
      item
        .querySelector(".delete-item")
        .addEventListener("click", function() {
          itemList.removeChild(item);
          itemData = itemData.filter(function(item) {
            return item !== textValue
          })
          localStorage.setItem("list", JSON.stringify(itemData))
          showFeedback('item deleted', 'succes')
        })

    }
  })
}

clearBtn.addEventListener("click", function() {
  itemData = [] // clear array
  localStorage.removeItem("list");
  document.querySelector("body").classList.remove("setBlock")
  transitionItem(" ");
  header.classList.add("hidden")
  clearBtn.classList.add("hidden")
  const items = itemList.querySelectorAll(".item");
  setTimeout(function() {

    if (items.length > 0) { // Om te checken of items bestaat
      items.forEach(function(item) {
        itemList.removeChild(item) // item in itemlist word verwijderd. Oftewel elke geloopte item in itemList
      })
    }
    header.classList.remove("hidden")
    clearBtn.classList.remove("hidden")
  },500)

})
