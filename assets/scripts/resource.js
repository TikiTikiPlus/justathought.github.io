//start of code. probably name it lol
//blurs and unblurs the whole body
function blurContent() {
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
} 
//when website has been loaded, call this function.
//adds events to autocomplete searchbar
function resourceOnload() {
  input = document.querySelector('#autoComplete');
  content = $('.card-resources');
  contentParagraph = document.querySelectorAll('div.card-resources > p');
  contentTitle = document.querySelectorAll('div.card-resources > h2');
  buttonWrapperButtons = document.querySelectorAll('#buttonWrapper > button');
  cardResourcesButton = document.querySelectorAll('.card-resources_Button');
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
    $('.autoComplete_wrapper').css('border-radius','50px')
    $('#autoComplete').css('border-bottom-left-radius','25px');
  });
  for(i=0; i< content.length; i++)
  {
    cardResourcesButton[i].setAttribute('aria-label', cardResourcesButton[i].textContent + " on " + contentTitle[i].textContent);
  }
}
//whenever a list item is clicked in the results bar, check if the list item clicked is a
//dataTag property or not
function listClicky(thing) {
  buttonPressed(thing);
} 
//starts when the buttons are pressed
//searches if texts in the button is the same as the value of input/buttons
//and shows the cards up
function buttonPressed(buttonValue) {
  if (buttonValue.getAttribute("buttonStatus") === "notPressed") {
    input.value = buttonValue.textContent;
    buttonsPressed = true;
    $('#autoComplete').keyup();
  } else {
    input.value = "";
    buttonsPressed = false;
    $('#autoComplete').keyup();
    buttonValue.setAttribute("buttonStatus", "notPressed");
  }
  // buttonWrapperHover(buttonValue);
} //checks if input is zero or not
//if it is, then show every content
function inputZero(valueLength) {
  if(valueLength > 0)
  {
      $('.magnifyingGlass').attr('class','noGlass');
      $('.magnifyingGlass').attr('aria-label','clear search');
  }
  else
  {
       $('.noGlass').attr('class','magnifyingGlass');
       $('.magnifyingGlass').attr('aria-label','clear search');
  }
  if (valueLength < 3) {
    input.style.borderBottomLeftRadius = "25px";
    $('.card-resources').css('visibility', 'visible');
    $('.card-resources').css('display', 'block');
    $('#autoComplete_list_1').attr('hidden', '""');
    $(".autoComplete_wrapper").css("borderBottomRightRadius","50px");
  } else {
    input.style.borderBottomLeftRadius = "0px";
    $(".autoComplete_wrapper").css("borderBottomRightRadius","0px");
    let wrapping = document.querySelector(".autoComplete_wrapper");
    let boxWidth = wrapping.offsetWidth
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
function buttonWrapperHover(hoveredButton)
{
  if(hoveredButton.getAttribute("buttonStatus")==="notPressed")
  {
    hoveredButton.style.color ='#86043d';
    hoveredButton.style.backgroundColor = "white";
    hoveredButton.style.border ='3px solid #86043d';
  }
  hoveredButton.style.border ='3px solid #86043d';
}
function buttonWrapperMouseExit(unHoverButton)
{
  console.log(unHoverButton.getAttribute("buttonStatus"));
  if(unHoverButton.getAttribute("buttonStatus")==="notPressed")
  {
    unHoverButton.style.color = '#c9467f';
  }
  unHoverButton.style.border = '3px solid #c9467f';
}
function buttonSearching(buttonText) {
  buttonsPressed = false;
  var a = 0;
  for (j = 0; j < buttonWrapperButtons.length; j++) {
    if (buttonWrapperButtons[j].textContent.toLowerCase() === buttonText.toLowerCase()) {
      buttonWrapperButtons[j].setAttribute('buttonStatus', 'pressed');
      buttonWrapperButtons[j].style.color = 'white';
      buttonWrapperButtons[j].style.backgroundColor = '#c9467f';
      a = j;
      buttonsPressed = true;
    } 
    else {
      buttonWrapperButtons[j].setAttribute('buttonStatus', 'notPressed');
      buttonWrapperButtons[j].style.color = '#c9467f';
      buttonWrapperButtons[j].style.backgroundColor = 'white';
    }
  }
  buttonChange(buttonText, buttonsPressed);
} //shows which button to show when buttons are pressed
function buttonChange(textSearch, buttonsPressed) {
  if (buttonsPressed) {
    for (i = 0; i < content.length; i++) {
      if (content[i].getAttribute('data-tag').toLowerCase().includes(textSearch.toLowerCase())) {
        content[i].style.visibility = "visible";
        content[i].style.display = "block";
      } else {
        content[i].style.visibility = "hidden";
        content[i].style.display = "none";
      }
    }
    for (i = 0; i < buttonWrapperButtons.length; i++)
    {
      if(buttonWrapperButtons[i].textContent.toLowerCase()==textSearch.toLowerCase())
      {
        buttonWrapperButtons[i].setAttribute("buttonStatus", "pressed")
        buttonWrapperHover(buttonWrapperButtons[i]);
      }
      else
      {
        buttonWrapperMouseExit(buttonWrapperButtons[i]); 
      }
    }
  } 
  else {
    for (i = 0; i < buttonWrapperButtons.length; i++) {
      buttonWrapperMouseExit(buttonWrapperButtons[i]); 
    }
  }
  console.log("buttonChange");
  input.focus();
}