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
    if (input.value !== "") {
      $('#autoComplete_list_1').removeAttr('hidden');
    } // Do your stuff
    $('#autoComplete').keyup();
  });
  input.addEventListener('change', () => input.hasChanged = true);
  input.addEventListener('blur', () => {
    $('#autoComplete_list_1').attr('hidden', '""'); // Do your stuff
  });
}

function listClicky(thing) {
  document.getElementById("autoComplete").innerHTML = thing.textContent;
  document.getElementById("autoComplete").value = thing.textContent;
  //$("#autoComplete").keyup();  
  //document.getElementById("autoComplete").outerText = thing.textContent;
  //return thing;
} //starts when the buttons are pressed
//searches if texts in the button is the same as the value of input/buttons
//and shows the cards up
function logKey() {
  console.log("Hello");
  var evt = new Event("look", {"bubbles":true, "cancelable":false});
  document.dispatchEvent(evt);
  input.value += `a`;
  input.value +=` `;
  input.value += `e`;
  // input.value = "";
  input.dispatchEvent(evt);
  input.focus();
  // var e = new KeyboardEvent('keyup',{'key':8,'which':8});// 32 is the keycode for the space bar
  // //var a = new KeyboardEvent('keyup',{'keyCode':a,'which':65});
  // input.dispatchEvent(e); 
  // //input.dispatchEvent(a);
  // input.blur(); 
  // input.focus();
}

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
    $(".autoComplete_wrapper").css("borderBottomRightRadius","50px");
  } else {
    input.style.borderBottomRightRadius = "0px";
    input.style.borderBottomLeftRadius = "0px";
    $(".autoComplete_wrapper").css("borderBottomRightRadius","0px");
    let wrapping = document.querySelector(".autoComplete_wrapper");
    let boxWidth = wrapping.offsetWidth
    console.log(boxWidth);
    $('#autoComplete_list_1').css("width",boxWidth);
  }
} //deletes the value of autoComplete bar


function clearAutoComplete(xButton) {
    if(xButton.className=='noGlass')
    {
        document.querySelector('#autoComplete').value = ""; 
        $('#autoComplete').keyup();
        input.blur();
        input.focus();
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
    input.foocus();
  } else {
    for (i = 0; i < buttonWrapperButtons.length; i++) {
      buttonWrapperButtons[i].blur();
    }
  }
}