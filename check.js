// Global variables
const urlButton = document.getElementsByTagName("button")[0];

// object with all url parameters
let urlParameters = {
  BaseURL: '',
  Source: '',
  Medium: '',
  Campaign: '',
  Term: '',
  Content: ''
}

// Event Listeners
// check inputs for all fields
urlButton.addEventListener("click", checkDropdown("source", "sourceError", "Source"), false);
urlButton.addEventListener("click", checkDropdown("medium", "mediumError", "Medium"), false);
urlButton.addEventListener("click", checkDropdown("term", "termError", "Term"), false);
urlButton.addEventListener("click", checkDropdown("content", "contentError", "Content"), false);
urlButton.addEventListener("click", checkBaseURL);
urlButton.addEventListener("click", checkCampaignName);
// generate utl link
urlButton.addEventListener("click", generateLink);

// check base URL
function checkBaseURL(){
  // target element
  const baseURLContainer= document.getElementById("baseURL");
  // error container
  const errorContainer = document.getElementById("baseURLError");
  // regex to test for valid url entry
  const urlRegex = /(https:\/\/houseofcommons.shorthandstories.com\/[\w]+\/index\.html$)|(https:\/\/www\.parliament\.uk\/.*)/;
  if(!urlRegex.test(baseURLContainer.value)){
    // show error message and highlight relevant field
    errorContainer.style.display = "block";
    errorContainer.textContent = "Please make sure you enter a valid URL";
    errorContainer.closest("form").children[0].children[2].classList.add("error");
  }else{
    errorContainer.style.display = "none";
    errorContainer.textContent = "";
    errorContainer.closest("form").children[0].children[2].classList.remove("error");
    urlParameters.BaseURL = baseURLContainer.value+"?";
  }
}

// re-usable for all dropdowns on page
function checkDropdown(elementID, errorContainerID, parameterName){
  return function(){
    // target element
    const element = document.getElementById(elementID);
    // error message container
    const errorContainer = document.getElementById(errorContainerID);
    // check input
    if(element.value == "Select an option..." && element.id == ("source"||"medium")){
      errorContainer.style.display = "block";
      errorContainer.textContent = "Please make sure one of the dropdown options is selected";
      errorContainer.closest("form").children[2].children[0].classList.add("error");
    }else{
      errorContainer.style.display = "none";
      errorContainer.textContent = "";
      errorContainer.closest("form").children[2].children[0].classList.remove("error");
      urlParameters[parameterName] = ("utm_"+parameterName+"="+element.value).toLowerCase();
    }
  }
}

// check campaign name
function checkCampaignName(){
  // target campaign field and get its value
  const campaignFieldValue = document.getElementById("campaign").value;
  // use regex to check input and inform user of errors, offer examples
  const campaignFieldRegex = /^[a-z0-9]+\-?([a-z0-9]+\-)*[a-z0-9]+$/;
  const onlyNumbersRegex = /^\d+$/;
  const campaignFieldError = document.getElementById("campaignError");
  // check input
  if(campaignFieldValue.length < 4 || campaignFieldValue.length > 40){
    campaignFieldError.style.display = "block";
    campaignFieldError.textContent = "Please make sure this part of the URL is between 4 and 40 characters";
    campaignFieldError.closest("form").children[0].children[2].classList.add("error");
  }else if(!campaignFieldRegex.test(campaignFieldValue)){
    campaignFieldError.style.display = "block";
    campaignFieldError.textContent = "Please make sure this field is not empty and follows the correct structure";
    campaignFieldError.closest("form").children[0].children[2].classList.add("error");
  }else if(onlyNumbersRegex.test(campaignFieldValue)){
    campaignFieldError.style.display = "block";
    campaignFieldError.textContent = "Please make sure this field is a combination of numbers and letters with dashes (-) in between";
    campaignFieldError.closest("form").children[0].children[2].classList.add("error");
  }else{
    campaignFieldError.style.display = "none";
    campaignFieldError.textContent = '';
    urlParameters.Campaign = ("utm_campaign="+campaignFieldValue.trim()).toLowerCase();
    campaignFieldError.closest("form").children[0].children[2].classList.remove("error");
  }
}

// generate link
function generateLink(){
 let finalURL = '';
 check = [];
 Object.keys(urlParameters).forEach(key=>{
   if(urlParameters[key] != ""){
    check.push('check');
    finalURL += urlParameters[key]+"&";
   }
 });
 // check that all url parameters are there and generate link
 if(check.length == 6){
  document.getElementById('result').style.display = 'block';
  document.getElementById('finalURL').textContent = finalURL.slice(0,-1);
 }
}
