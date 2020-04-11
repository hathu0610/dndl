const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const nextLevelButton = document.getElementById('next-lvl-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const titleElement = document.getElementById('title')
const labelElement = document.getElementById('label')
const resultElement = document.getElementById('result')
const audioElement = document.getElementById('src_audio')
const playButton = document.getElementById('btn_play')
const resultButton = document.getElementById('result-btn')
const resetButton = document.getElementById("btn-again")
const selectedAnswerNoti = document.getElementById("noti-selected-answer")

var score = 0;

var audioright = new Audio('/audio/correct1.mp3');
var audiowrong = new Audio('/audio/wrong1.mp3');

var shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', start)
resetButton.addEventListener('click',()=> {
  reset()
})

nextButton.addEventListener('click', () => {

  selectedAnswerNoti.style.display = 'none';

  if(nextButton.dataset.correct=="true"){
    delete shuffledQuestions[currentQuestionIndex];
    score++
  }
  console.log(score)
  console.log (shuffledQuestions)
  currentQuestionIndex++
  setNextQuestion()
})

resultButton.addEventListener('click', () => {
  if(resultButton.dataset.correct=="true"){
    delete shuffledQuestions[currentQuestionIndex];
    score++
  }
  console.log(score)
  console.log (shuffledQuestions)
  result()
})

function start() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  currentField =0
  labelElement.classList.remove('hide')
  audioElement.classList.remove('hide')
  playButton.classList.remove('hide')
  titleElement.innerText = 'CÂU HỎI'
  // document.getElementById("shortcut_label").classList.remove('hide')

  setNextQuestion()
}

function reset() {
  document.getElementById('content').classList.remove('hide');
  resultButton.classList.add('hide');;
  startButton.classList.add('hide')
  shuffledQuestions = shuffledQuestions
  currentQuestionIndex = 0
  labelElement.classList.remove('hide')
  titleElement.innerText = 'CÂU HỎI'
  document.getElementById('result_content').innerText = "Chúc mừng bạn đã hoàn thành phần đào tạo phân tích sắc thái hội thoại. Bây giờ hãy bắt đầu với phần đào tạo tiếp theo."
  document.getElementById('btn-next-lvl').classList.remove('hide');
  resetButton.classList.add('hide');
  resultElement.classList.add('hide');
  shuffledQuestions = shuffledQuestions.filter(function (el) {
    return el != null;
  });
  // document.getElementById("shortcut_label").classList.remove('hide')

  setNextQuestion()
}
function setNextQuestion() {
  resetState()
  showQuestion (shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  audioElement.setAttribute("src", question.src);

  index = 0
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.id += "btn_"+index
    button.innerText = answer.text
    button.classList.add('btn-answer')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    index++
  })
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct

  selectedAnswerNoti.innerHTML = "Bạn đã chọn: " + selectedButton.innerText;
  selectedAnswerNoti.style.display = 'block';

  if (correct=='true'){
    nextButton.dataset.correct = true;
    resultButton.dataset.correct = true;
  }else{
    nextButton.dataset.correct = false;
    resultButton.dataset.correct = false;
  }
  if  (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {

    resultButton.classList.remove('hide')
  }   
  
}

function setStatusClass(element, correct) {
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function result(){
  if(score >= 9){
    // audioright.play();
    // document.getElementById('content').classList.add('hide');
    // resultElement.classList.remove('hide');
    window.location.href = '/2nd_result';
    
  }else{
    audiowrong.play();
    document.getElementById('content').classList.add('hide');
    document.getElementById('result_content').innerText = `Bạn đã làm đúng ${score} câu rồi đấy, cùng làm lại ${10-score} câu chưa hợp lý nhé!`
    document.getElementById('btn-next-lvl').classList.add('hide');
    document.getElementById('btn-again').classList.remove('hide');
    resultElement.classList.remove('hide');
    shuffledQuestions = shuffledQuestions.filter(function (el) {
      return el != null;
    });
  }
}

function goto_label(){
  index = parseInt(document.getElementById("sl_label").value) - 1;
  const id_label = "btn_"+ index
  document.getElementById(id_label).click();
}

questions = [
  {
    id: '1',
    question: 'Chọn nhãn thích hợp cho đoạn hội thoại dưới:',
    src: 'audio/audio_1.mp3',
    answers: [
      { text: 'Tích cực', correct: true},
      { text: 'Tiêu cực', correct: false},
      { text: 'Trung tính', correct: false},
      { text: 'Không biết', correct: false}
    ]
  },
  {
    id: '2',
    question: 'Chọn nhãn thích hợp cho đoạn hội thoại dưới:',
    src: 'audio/audio_2.mp3',
    answers: [
      { text: 'Tích cực', correct: false},
      { text: 'Tiêu cực', correct: true},
      { text: 'Trung tính', correct: false},
      { text: 'Không biết', correct: false}
    ]
  },
  {
    id: '3',
    question: 'Chọn nhãn thích hợp cho đoạn hội thoại dưới:',
    src: 'audio/audio_3.mp3',
    answers: [
      { text: 'Tích cực', correct: true},
      { text: 'Tiêu cực', correct: false},
      { text: 'Trung tính', correct: false},
      { text: 'Không biết', correct: false}
    ]
  },
  {
    id: '4',
    question: 'Chọn nhãn thích hợp cho đoạn hội thoại dưới:',
    src: 'audio/audio_4.mp3',
    answers: [
      { text: 'Tích cực', correct: false},
      { text: 'Tiêu cực', correct: false},
      { text: 'Trung tính', correct: true},
      { text: 'Không biết', correct: false}
    ]
  },
  {
    id: '5',
    question: 'Chọn nhãn thích hợp cho đoạn hội thoại dưới:',
    src: 'audio/audio_5.mp3',
    answers: [
      { text: 'Tích cực', correct: false},
      { text: 'Tiêu cực', correct: false},
      { text: 'Trung tính', correct: true},
      { text: 'Không biết', correct: false}
    ]
  },
  {
    id: '6',
    question: 'Chọn nhãn thích hợp cho đoạn hội thoại dưới:',
    src: 'audio/audio_6.mp3',
    answers: [
      { text: 'Tích cực', correct: true},
      { text: 'Tiêu cực', correct: false},
      { text: 'Trung tính', correct: false},
      { text: 'Không biết', correct: false}
    ]
  },
  {
    id: '7',
    question: 'Chọn nhãn thích hợp cho đoạn hội thoại dưới:',
    src: 'audio/audio_7.mp3',
    answers: [
      { text: 'Tích cực', correct: false},
      { text: 'Tiêu cực', correct: false},
      { text: 'Trung tính', correct: true},
      { text: 'Không biết', correct: false}
    ]
  },
  {
    id: '8',
    question: 'Chọn nhãn thích hợp cho đoạn hội thoại dưới:',
    src: 'audio/audio_8.mp3',
    answers: [
      { text: 'Tích cực', correct: false},
      { text: 'Tiêu cực', correct: false},
      { text: 'Trung tính', correct: true},
      { text: 'Không biết', correct: false}
    ]
  },
  {
    id: '9',
    question: 'Chọn nhãn thích hợp cho đoạn hội thoại dưới:',
    src: 'audio/audio_9.mp3',
    answers: [
      { text: 'Tích cực', correct: false},
      { text: 'Tiêu cực', correct: true},
      { text: 'Trung tính', correct: false},
      { text: 'Không biết', correct: false}
    ]
  },
  {
    id: '10',
    question: 'Chọn nhãn thích hợp cho đoạn hội thoại dưới:',
    src: 'audio/audio_10.mp3',
    answers: [
      { text: 'Tích cực', correct: false},
      { text: 'Tiêu cực', correct: false},
      { text: 'Trung tính', correct: false},
      { text: 'Không biết', correct: true}
    ]
  }
]

