function append(idea) {
  var $ideaTitle = $('.title-input').val()
  var $ideaBody = $('.body-input').val()
  $('.bottom-container').append(
    `<li class='idea-title'>${$ideaTitle}</li>
    <li class='idea-body'>${$ideaBody}</li>
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
