$(document).ready(function() {
  for(var i = 0; i < localStorage.length; i++){
    append(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
})

function append(idea) {
  $('ul').prepend(
    `<section id=${idea.id} class="idea-section">
      <button class='delete-button buttons'>delete</button>
      <li class='idea-title' contenteditable>${idea.title}</li>
      <li class='idea-body' contenteditable>${idea.body}</li>
      <button class='up-vote buttons'>up</button>
      <button class='down-vote buttons'>down</button>
      <p>quality: <span class="quality">${idea.quality}</span></p>
    </section>`
  )}

function Idea (title, body) {
  this.title = title
  this.body = body
  this.id = Date.now()
  this.quality = 'swill'
}


function grabIdea () {
  var title = $('.title-input').val()
  var body = $('.body-input').val()
  var idea = new Idea(title, body)
  localStorage.setItem(idea.id, JSON.stringify(idea))
  append(idea)
  console.log(idea);
}

$('.save-button').on('click', function() {
  grabIdea()
  clearFields()
})

function clearFields() {
  $('.title-input').val('')
  $('.body-input').val('')
}

$('.bottom-container').on('click', '.delete-button', function (e){
  $(e.target).closest('.idea-section').remove();
});

function upVote(quality) {
  switch(quality) {
    case 'swill':
      return 'plausible'
    case 'plausible':
      return 'genius'
    default:
      return 'genius'
  }
}

function downVote(quality) {
  switch(quality) {
    case 'genius':
      return 'plausible'
    case 'plausible':
      return 'swill'
    default:
      return 'swill'
  }
}



$('.bottom-container').on('click', '.up-vote', function() {
 var $getUpQuality = $(this).closest('.idea-section').find('.quality')
 var getUpQualityText = $getUpQuality.text()
 var newUpQuality = upVote(getUpQualityText)


 var saveUpQuality = $getUpQuality.text(newUpQuality)


})

$('.bottom-container').on('click', '.down-vote', function() {
 var $getDownQuality = $(this).closest('.idea-section').find('.quality')
 var getDownQualityText = $getDownQuality.text()
 var newDownQuality = downVote(getDownQualityText)


 var saveDownQuality = $getDownQuality.text(newDownQuality)


})




















// $('.bottom-container').on('click', '.up-vote', function() {
//   var $selector = $(this).closest(".idea-section").find(".quality");
//   var quality = $selector.text();
//   var id = $(this).closest(".idea-section").prop("id");
//   var storedItem = JSON.parse(localStorage.getItem(id));
//
//   if($(this).text() === "up"){
//     var newQuality = upVote(quality);
//     storedItem.quality = newQuality;
//     $selector.text(newQuality);
//     localStorage.setItem(id, JSON.stringify(storedItem));
//   } else {
//     $selector.text(downVote(quality));
//   }
// })
