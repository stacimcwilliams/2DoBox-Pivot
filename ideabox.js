function append(idea) {
  var $ideaTitle = $('.title-input').val()
  var $ideaBody = $('.body-input').val()
  $('.bottom-container').append(
    `<li class='idea-title'>${$ideaTitle}</li>
    <button class='delete-button buttons'>delete</button>
    <li class='idea-body'>${$ideaBody}</li>
    <button class='up-vote buttons'>up</button>
    <button class='down-vote buttons'>down</button>
    `
  )}

  // function idea (title, body) {
  //   this.title = title
  //   this.body = body
  // }

$('.save-button').on('click', function() {
  append()
  clearFields()
})

function clearFields() {
  $('.title-input').val('')
  $('.body-input').val('')
}
