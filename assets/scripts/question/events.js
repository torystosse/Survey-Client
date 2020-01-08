'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

const onCreateQuestion = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.createQuestion(formData)
    .then((res) => {
      ui.onCreateQuestionSuccess()
    })
    .catch(ui.onCreateQuestionFailure)
}

const onGetQuestions = event => {
  event.preventDefault()
  api.getQuestions()
    .then(ui.onGetQuestionsSuccess)
    .catch(ui.onGetQuestionsFailure)
}

// const onGetOneQuestion = events => {
//   const questionId = $(event.target).data('id')
//   api.getOneQuestion(questionId)
//     .then(console.log)
//     .catch(console.error)
// }

const onShowUpdateQuestion = event => {
  // store question ID and show update form
  store.updateQuestionId = ''
  const updateQuestionId = $(event.target).data('id')
  store.updateQuestionId = updateQuestionId
  $('#update-question').show()
}

const onUpdateQuestions = event => {
  event.preventDefault()
  const form = event.target
  const questionData = getFormFields(form)
  // get stored question ID
  const questionId = store.updateQuestionId
  // pass in question ID to api call
  api.updateQuestion(questionData, questionId)
    .then(function (data) {
      onGetQuestions(event)
    })
    .then(ui.updateQuestionSuccess)
    .catch(ui.updateQuestionFailure)
}

const onDeleteQuestion = event => {
  const deleteQuestionId = $(event.target).data('id')
  api.deleteQuestion(deleteQuestionId)
    .then(data => {
      onGetQuestions(event)
    })
    .catch(ui.onDeleteQuestionFailure)
}

const addHandlers = event => {
  $('#get-questions').on('click', onGetQuestions)
  $('#questionModal').on('submit', onCreateQuestion)
  $('.question-box').on('click', '.question-update-btn', onShowUpdateQuestion)
  $('#update-question').on('submit', onUpdateQuestions)
  $('.question-box').on('click', '.question-delete-btn', onDeleteQuestion)
  // event listener for SHOW action: '.get-question-btn' to be located in question-listing handlebar
  // $('.question-box').on('click', '.get-question-btn', onGetOneQuestion)
}

module.exports = {
  addHandlers
}
