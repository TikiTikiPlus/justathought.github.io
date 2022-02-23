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
  content = document.querySelectorAll('.card-resources');
  contentParagraph = document.querySelectorAll('div.card-resources > p');
  contentTitle = document.querySelectorAll('div.card-resources > h2');
  buttonWrapperButtons = document.querySelectorAll('#buttonWrapper > button');
  cardResourcesButton = document.querySelectorAll('.card-resources_Button');
input.addEventListener('keyup', function (event) {
  var keyName = event.key;
  if (keyName === 'Enter' || keyName === 'Tab') {
    if ($('.results').length == 1) {
      $('.results')[0].click();
    }
    if (keyName === 'Enter' && $('.results').length > 1) {
      input.blur();
    }
  }
});
buttonsPressed = false;
input.addEventListener('focus', function () {
  console.log("focus");
  console.log("event input focus");
  $('#autoComplete').keyup();
});
input.addEventListener('change', function () {
  return input.hasChanged = true;
});
input.addEventListener('blur', function () {
  document.getElementsByClassName('autoComplete_Wrapper')[0].style.borderRadius = '25px';
});
  for(i=0; i< content.length; i++)
  {
    cardResourcesButton[i].setAttribute('aria-label', cardResourcesButton[i].textContent + " on " + contentTitle[i].textContent);
  }
  for(buttonIndex = 0; buttonIndex<buttonWrapperButtons.length; buttonIndex++)
  {
    buttonWrapperButtons[buttonIndex].setAttribute('aria-label','quick search '+buttonWrapperButtons[buttonIndex].textContent);
  }
  centeredCard(content.length);
}
//starts when the buttons are pressed
//searches if texts in the button is the same as the value of input/buttons
//and shows the cards up
function buttonPressed(buttonValue) {
  if (buttonValue.getAttribute("buttonStatus") === "notPressed") {
    input.value = buttonValue.textContent;
    buttonsPressed = true;
    $('#autoComplete').keyup();
  } 
  else {
    input.value = "";
    buttonsPressed = false;
    buttonValue.setAttribute("buttonStatus", "notPressed");
    $('#autoComplete').keyup();
  }
} //checks if input is zero or not
//if it is, then show every content
function inputZero(valueLength) {
  if(valueLength > 0)
  {
    $('.magnifyingGlass').attr('class','noGlass');
    $('.noGlass').attr('aria-label','clear search');
    $('.noGlass').attr('aria-role','button');
  }
  else
  {
    $('.noGlass').attr('class','magnifyingGlass');
    $('.magnifyingGlass').removeAttr("aria-label");
    $('.magnifyingGlass').removeAttr("aria-role");
  }
  if (valueLength <= 2) {
    $('.card-resources').css('visibility', 'visible');
    $('.card-resources').css('display','block');
    document.getElementsByClassName('autoComplete_Wrapper')[0].style.borderRadius= "25px";
  }
}
//deletes the value of autoComplete bar
function clearAutoComplete(xButton) {
    if(xButton.className=='noGlass')
    {
        document.querySelector('#autoComplete').value = "";
        $('.card-resources').css('marginLeft','0px');
        $('.card-resources').css('marginLeft','auto');
        $('.card-resources').css('marginRight','0px');
        $('.card-resources').css('marginLeft','auto');
        $('#autoComplete').keyup();
        input.blur();
        console.log("autoComplete focus")
        input.focus();
    }
}
function buttonSearching(buttonText) {
  buttonsPressed = false;
  var a = 0;
  for (j = 0; j < buttonWrapperButtons.length; j++) {
    if (buttonWrapperButtons[j].textContent.toLowerCase() === buttonText.toLowerCase()) {
      buttonWrapperButtons[j].setAttribute('buttonstatus', 'pressed');
      buttonWrapperButtons[j].style.color = 'white';
      buttonWrapperButtons[j].style.backgroundColor = '#c9467f';
      a = j;
      input.value = buttonText;
      buttonsPressed = true;
    } 
    else {
      buttonWrapperButtons[j].setAttribute('buttonstatus', 'notPressed');
      buttonWrapperButtons[j].style.color = '#c9467f';
      buttonWrapperButtons[j].style.backgroundColor = 'white';
    }
  }
  buttonChange(buttonText,buttonsPressed);
} 
//shows which button lights up and also shows the card resources relating to the button
function buttonChange(textSearch, buttonPressed) {
  let visibleCardNumber = 0;
  if (buttonPressed) {
    for (i = 0; i < content.length; i++) {
      if (content[i].getAttribute('data-tag').toLowerCase().indexOf(textSearch.toLowerCase())>=0) {
        content[i].style.visibility = "visible";
        content[i].style.display = "block";
        visibleCardNumber++;
      } 
      else {
        content[i].style.visibility = "hidden";
        content[i].style.display = "none";
      }
    }
    for (i = 0; i < buttonWrapperButtons.length; i++)
    {
      if(buttonWrapperButtons[i].textContent.toLowerCase()==textSearch.toLowerCase())
      {
        buttonWrapperButtons[i].setAttribute("buttonStatus", "pressed");
      }
    }
    console.log("buttonChange focus");
    input.focus();
  }
} 
function centeredCard(visibleCardCount)
{
  let visibleLast = false;
  let windowWidth = window.innerWidth;
    $(".card-resources").css("marginLeft","0px");
    $(".card-resources").css("marginLeft","auto");
    $(".card-resources").css("marginRight","0px");
    $(".card-resources").css("marginRight","auto");
  if(visibleCardCount%3 == 2)
  {
    for(let cardIndex = content.length-1; cardIndex > 0; cardIndex--)
    {
      if(content[cardIndex].style.visibility == "visible" && visibleLast==false)
      {

        if(windowWidth>991)
        {
          content[cardIndex].style.marginRight="160px";
          visibleLast = true;
        }
        else
        {
          content[cardIndex].style.marginRight="0px";
          content[cardIndex].style.marginRight="auto";
          visibleLast = true;
        }
      }
      else if(content[cardIndex].style.visibility == "visible" && visibleLast == true)
      {
        if(windowWidth>991)
        {
          content[cardIndex].style.marginLeft="160px";
          return;
        }
        else
        {
          content[cardIndex].style.marginLeft="0px";
          content[cardIndex].style.marginLeft="auto";
          return;
        }
      }
    }
  }
}
