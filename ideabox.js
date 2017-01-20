$(document).ready(function() {
  for(var i = 0; i < localStorage.length; i++){
    append(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
})

$('.save-button').on('click', function() {
  grabIdea()
  clearFields()
  disableSaveButton()
})

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


function clearFields() {
  $('.title-input').val('')
  $('.body-input').val('')
}


$('.bottom-container').on('click', '.delete-button', function (){
  $(this).closest('.idea-section').remove();
  var idKey = $(this).closest('.idea-section').attr('id');
  console.log(idKey)
  localStorage.removeItem(idKey);
});

function upVote(quality) {
  switch(quality) {
    case 'swill':
      return 'plausible';
    case 'plausible':
      return 'genius';
    default:
      return 'genius';
  };
};

function downVote(quality) {
  switch(quality) {
    case 'genius':
      return 'plausible';
    case 'plausible':
      return 'swill';
    default:
      return 'swill';
  };
};

function sortButtons(upVoteOrDownVote, quality){
  if (upVoteOrDownVote === 'up-vote buttons'){
    return upVote(quality);
  } else {
    return downVote(quality);
  };
};

$('.bottom-container').on('click', '.up-vote, .down-vote', function() {
  var $getIdea = $(this).closest('.idea-section')
  var id = $getIdea.prop('id')
  var quality = $getIdea.find('.quality').text()
  var upVoteOrDownVote = $(this).prop('class')
  var newQuality = sortButtons(upVoteOrDownVote, quality)
  $getIdea.find('.quality').text(newQuality)
  var storedObj = JSON.parse(localStorage.getItem(id))
  storedObj.quality = newQuality
  localStorage.setItem(id, JSON.stringify(storedObj))
})

// $('.bottom-container').on('click', '.up-vote', function() {
//  var $getUpQuality = $(this).closest('.idea-section').find('.quality')
//  var getUpQualityText = $getUpQuality.text()
//  var newUpQuality = upVote(getUpQualityText)
//  var id = $(this).closest('.idea-section').prop("id");
//  var storedObj = JSON.parse(localStorage.getItem(id));
//  $getUpQuality.text(newUpQuality);
//  storedObj.quality = newUpQuality;
//  localStorage.setItem(id, JSON.stringify(storedObj));
// })
//
// $('.bottom-container').on('click', '.down-vote', function() {
//  var $getDownQuality = $(this).closest('.idea-section').find('.quality')
//  var getDownQualityText = $getDownQuality.text()
//  var newDownQuality = downVote(getDownQualityText)
//  var id = $(this).closest('.idea-section').prop("id");
//  var storedObj = JSON.parse(localStorage.getItem(id));
//  $getDownQuality.text(newDownQuality);
//  storedObj.quality = newDownQuality;
//  localStorage.setItem(id, JSON.stringify(storedObj));
// })

$('.bottom-container').on('blur', '.idea-title, .idea-body', function(){
  var id = $(this).closest('.idea-section').prop('id');
  var idea = JSON.parse(localStorage.getItem(id));
  idea.title = $(this).closest('.idea-section').find('.idea-title').text();
  idea.body = $(this).closest('.idea-section').find('.idea-body').text();
  localStorage.setItem(id, JSON.stringify(idea));
});

// $('.bottom-container').on('blur', '.idea-title', function() {
//   var getIdeaTitle = $(this).closest('.idea-section').find('.idea-title')
//   var getIdeaTitleText = getIdeaTitle.text()
//   var id = $(this).closest('.idea-section').prop('id')
//   var storedObj = JSON.parse(localStorage.getItem(id))
//   storedObj.title = getIdeaTitleText
//   localStorage.setItem(id, JSON.stringify(storedObj))
// })
//
// $('.bottom-container').on('blur', '.idea-body', function() {
//   var getIdeaBody = $(this).closest('.idea-section').find('.idea-body')
//   var getIdeaBodyText = getIdeaBody.text()
//   var id = $(this).closest('.idea-section').prop('id')
//   var storedObj = JSON.parse(localStorage.getItem(id))
//   storedObj.body = getIdeaBodyText
//   localStorage.setItem(id, JSON.stringify(storedObj))
// })

$('.search-field').on('keyup', function(){
  var searchTerm = $(this).val().toLowerCase();
  $('li').each(function (index, theObject) {
    var text = $(theObject).text().toLowerCase();
    var match = !!text.match(searchTerm);
    $(this).parent().toggle(match);
  })
});

function disableSaveButton() {
  $('.save-button').prop("disabled", true)
}

function enableSaveButton(){
  $('.save-button').prop("disabled", false)
}

$('.title-input, .body-input').on('keyup', function() {
  var title = $('.title-input').val()
  var body = $('.body-input').val()
    if(title.length > 0 && body.length > 0) {
      enableSaveButton()
    } else  {
      disableSaveButton()
    }
})
