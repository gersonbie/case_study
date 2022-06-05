import { useState } from "react";
import "./quiz.css";

const questions = [
  {
    questionText: "Qual a finalidade do seguro?",
    answerOptions: [
      { answerText: "A - Equilíbrio econômico", isCorrect: true },
      { answerText: "B - Fraudar", isCorrect: false },
      { answerText: "C - Prêmio ao cliente", isCorrect: false },
      { answerText: "D - N/A", isCorrect: false },
    ],
  },
  {
    questionText: "Tem o objetivo de repor/indenizar um bem a um cliente.",
    answerOptions: [
      { answerText: "A - Seguro", isCorrect: true },
      { answerText: "B - Apólice", isCorrect: false },
      { answerText: "C - Proposta", isCorrect: false },
      { answerText: "D - N/A", isCorrect: false },
    ],
  },
  {
    questionText: "O que é apólice?",
    answerOptions: [
      { answerText: "A - Equilíbrio econômico", isCorrect: false },
      { answerText: "B - Fraudar", isCorrect: false },
      { answerText: "C - Prêmio ao cliente", isCorrect: false },
      { answerText: "D - N/A", isCorrect: true },
    ],
  },
  {
    questionText: "O que é avaria?",
    answerOptions: [
      { answerText: "A - Colisão", isCorrect: false },
      { answerText: "B - Fraudar", isCorrect: false },
      { answerText: "C - Assegurado", isCorrect: false },
      { answerText: "D - N/A", isCorrect: true },
    ],
  },
];

const CreateQuiz = () => {
  
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }

  return (
    <div className="container">
      <div className="form-header">
        <h2 className="gradient-text">Avaliação do Funcionário</h2>
      </div>
      <div className="mb-4">
        <h3 className="mb-1 gradient-text font-bold">Seguradora</h3>
        <p className="mb-4">Nível do conhecimento sobre Seguradora</p>

        <div className="quiz">
          {showScore ? (
            <div className="score-section">
              Você pontuou {score} de {questions.length}
            </div>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Questão {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">
                  {questions[currentQuestion].questionText}
                </div>
              </div>

              <div className="answer-section">
                {questions[currentQuestion].answerOptions.map(
                  (answerOption, index) => (
                    <button
                      onClick={() => handleAnswer(answerOption.isCorrect)}
                      key={index}
                    >
                      {answerOption.answerText}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default CreateQuiz;
