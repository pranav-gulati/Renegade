
// popup.js

var notesArray = [];

function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
  description: 'Begin typing to add a note or type event: to enter an event or b'
  });
}
resetDefaultSuggestion();


document.body.onload = function() {
  chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
        var printThis = '';
        for(var i = 0; i < items.data.length; i++){
          if(items.data[i] != '\n'){
          printThis = printThis + "- " + items.data[i];
        }
          else{
            printThis = printThis + items.data[i];
          }
      }
      document.getElementById("data").innerText = printThis;
    }
  });
}
chrome.omnibox.onInputChanged.addListener(function(text) {
  if(text.includes('event:')){
    chrome.omnibox.setDefaultSuggestion({
    description: 'event: (Name of Event, Description, Place, Start Date and Time, End Date and Time)'
    });
  }
  });


chrome.omnibox.onInputEntered.addListener(function(text) {

  chrome.storage.sync.get("data", function(notesArray) {
    if (!chrome.runtime.error) {
      console.log(items);
    }
  });

  if(text.includes('event:')){
    var cal = ics();
    var result = text.split(",");
    cal.addEvent(result[0], result[1], result[2], result[3], result[4]);
    cal.download(result[0])
  }
  notesArray.push(text)
  notesArray.push('\n')
  //set the new array
  chrome.storage.sync.set({"data": notesArray }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
});



