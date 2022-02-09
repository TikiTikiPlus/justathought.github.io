//start of code. probably name it lol
//blurs and unblurs the whole body
function blurContent() {
  //test.style.opacity = "0.1";
  if (document.getElementById("page_wrapper").className == "wrapper resources") {
    $(".nav-container").css('opacity', 1);
    $(".contentAndHeaderContainer").css('opacity', 0.1);
    document.getElementsByClassName("contentAndHeaderContainer").style.transition = "opacity 0.5s";
    $(".card-resources").css('opacity', 0.1);
    $(".container").css('opacity', 0.1);
    $("footer").css('opacity', 0.1);
  } else {
    $(".contentAndHeaderContainer").css('opacity', 1);
    $(".card-resources").css('opacity', 1);
    $(".container").css('opacity', 1);
    $("footer").css('opacity', 1);
  }
} //when website has been loaded, call this function.
//adds events to autocomplete searchbar


function resourceOnload() {
  input = document.querySelector('#autoComplete');
  content = document.querySelectorAll('div.card-resources');
  contentParagraph = document.querySelectorAll('div.card-resources > p');
  contentTitle = document.querySelectorAll('div.card-resources > h4');
  buttonWrapperButtons = document.querySelectorAll('#buttonWrapper > button');
  input.addEventListener('keyup', function (event) {
    var keyName = event.key;

    if (keyName === 'Enter') {
      input.blur();
    }
  });
  buttonsPressed = false;
  input.addEventListener('focus', () => {
    console.log(document.activeElement);
    console.log("hello"); //document.querySelector("autoComplete_list_1").removeAttribute('hidden');

    if (input.value !== "") {
      $('#autoComplete_list_1').removeAttr('hidden');
    } // Do your stuff

  });
  input.addEventListener('hover', (event, eleTest) => {
    var rect = eleTest.getBoundingClientRect();
    var x = event.clientX;

    if (x < rect.x + rect.width && x > rect.x + rect.width - 55) {
      // input.value = "";
      // input.blur();
      // input.focus();
      // $('#autoComplete').keyup();
      input.style.cursor = "pointer";
    }
  });
  input.addEventListener('change', () => input.hasChanged = true);
  input.addEventListener('blur', () => {
    console.log(document.activeElement);
    $('#autoComplete_list_1').attr('hidden', '""'); // Do your stuff
  });
}

function listClicky(thing) {
  document.getElementById("autoComplete").innerHTML = thing.textContent;
  document.getElementById("autoComplete").value = thing.textContent;
  document.getElementById("autoComplete").outerText = thing.textContent;
  console.log(document.getElementById("autoComplete").value);
  return thing; //$('#autoComplete').keyup();
} //starts when the buttons are pressed
//searches if texts in the button is the same as the value of input/buttons
//and shows the cards up


function buttonPressed(buttonValue) {
  if (buttonValue.getAttribute("buttonStatus") === "notPressed") {
    input.value = buttonValue.textContent;
    buttonsPressed = true;
    $('#autoComplete').keyup(); //buttonSearching(buttonValue.textContent);
  } else {
    input.value = "";
    buttonsPressed = false;
    $('#autoComplete').keyup();
    buttonValue.setAttribute("buttonStatus", "notPressed"); //buttonChange(0,buttonsPressed);
  }
} //checks if input is zero or not
//if it is, then show every content


function inputZero(valueLength) {
  console.log(valueLength);

  if(valueLength > 0)
  {
      $('.magnifyingGlass').attr('class','noGlass');
  }
  else
  {
       $('.noGlass').attr('class','magnifyingGlass');
  }
  if (valueLength < 3) {
    input.style.borderBottomLeftRadius = "25px";
   
    // input.setAttribute('class', 'magnifyingGlass');
    $('.card-resources').css('visibility', 'visible');
    $('.card-resources').css('display', 'block');
    $('#autoComplete_list_1').attr('hidden', '""');
  } else {
    input.style.borderBottomRightRadius = "0px";
    input.style.borderBottomLeftRadius = "0px";
    
  }
} //deletes the value of autoComplete bar


function clearAutoComplete(event, eleTest) {
  var rect = eleTest.getBoundingClientRect();
  var x = event.clientX;

  if (document.querySelector('#autoComplete').className === 'noGlass') {
    // &&(y<rect.y + rect.height && y < rect.y+rect.height-55)
    if (x < rect.x + rect.width && x > rect.x + rect.width - 55) {
      input.value = "";
      input.blur();
      $('#autoComplete').keyup();
      input.focus();
    }
  }
}

function buttonSearching(buttonText) {
  buttonsPressed = false;
  var a = 0;

  for (j = 0; j < buttonWrapperButtons.length; j++) {
    if (buttonWrapperButtons[j].textContent.toLowerCase() === buttonText.toLowerCase()) {
      buttonWrapperButtons[j].setAttribute('buttonStatus', 'pressed');
      a = j;
      buttonsPressed = true;
    } else {
      buttonWrapperButtons[j].setAttribute('buttonStatus', 'notPressed');
    }
  }

  buttonChange(buttonText, buttonsPressed);
} //shows which button to show when buttons are pressed


function buttonChange(textSearch, buttonsPressed) {
  if (buttonsPressed) {
    for (i = 0; i < content.length; i++) {
      if (textSearch.toLowerCase() === content[i].getAttribute('data-tag').toLowerCase()) {
        content[i].style.visibility = "visible";
        content[i].style.display = "block";
      } else {
        content[i].style.visibility = "hidden";
        content[i].style.display = "none";
      }
    }
  } else {
    for (i = 0; i < buttonWrapperButtons.length; i++) {
      buttonWrapperButtons[i].blur();
    }
  }
}