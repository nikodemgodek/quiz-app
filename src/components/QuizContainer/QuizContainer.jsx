import './quizcontainer.scss';
import { useState } from 'react';

export default function QuizContainer() {
    const questions = [
        {
            questionText: 'Stolica Rzeczypospolitej polskiej to:',
            answerOptions: [
                { answerText: 'Nowy Jork', isCorrect: false },
                { answerText: 'Warszawa', isCorrect: true },
                { answerText: 'Gniezno', isCorrect: false },
                { answerText: 'Kępno', isCorrect: false },
            ],
        },
        {
            questionText: 'Jak nazywa się gra, w której występują klasy postaci: Wojownik, Ninja, Sura, Szaman:',
            answerOptions: [
                { answerText: 'Grand Theft Auto 3', isCorrect: false },
                { answerText: 'Etan7', isCorrect: false },
                { answerText: 'Tibia', isCorrect: false },
                { answerText: 'Metin2', isCorrect: true },
            ],
        },
        {
            questionText: 'Które miasto z poniższych leży w województwie opolskim?',
            answerOptions: [
                { answerText: 'Syców', isCorrect: false },
                { answerText: 'Namysłów', isCorrect: true },
                { answerText: 'Wieruszów', isCorrect: false },
                { answerText: 'Kępno', isCorrect: false },
            ],
        },
        {
            questionText: 'Jaką liczbę należy podzielić przez 5, aby uzyskać liczbę 1:',
            answerOptions: [
                { answerText: '7', isCorrect: false },
                { answerText: '1', isCorrect: false },
                { answerText: '10', isCorrect: false },
                { answerText: '5', isCorrect: true },
            ],
        },
        {
            questionText: 'Cocker spaniel to rasa jakiego zwierzęcia:',
            answerOptions: [
                { answerText: 'Małpy', isCorrect: false },
                { answerText: 'Psa', isCorrect: true },
                { answerText: 'Kota', isCorrect: false },
                { answerText: 'Tygrysa', isCorrect: false },
            ],
        },
        
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const resetGame = () => {
        setShowScore(false);
        setScore(0);
        setCurrentQuestion(0);
    }

    const handleAnswerButtonClick = (isCorrect) => {

        if(isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;

        if(nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        }else{
            setShowScore(true);
        }
    }

    const renderScoreMessage = (score) => {
        const result = Math.round(score / questions.length * 100);
        let msg = "";
        if(result < 30) {
            msg = 'Nie poddawaj się!';
        }else if(result > 30 && result < 50) {
            msg = 'Nieźle!';
        }else if(result > 50 && result < 80) {
            msg = 'Dobrze!';
        }else if(result > 80 && result < 100) {
            msg = 'Bardzo dobrze!';
        }else {
            msg = 'Wspaniale!';
        }
        return msg;
    }

    return(
            <div className="container">
                {showScore ? 
                    (
                        <div className="score-container">
                            <h2>{renderScoreMessage(score)}</h2>
                            <h1>{(score / questions.length) * 100}%</h1>
                            <p>Udało Ci się uzyskać {score} punkty z {questions.length} możliwych!</p>
                            <button class="retry" onClick={resetGame}>Spróbuj ponownie</button>
                        </div>
                    )
                    :(
                    <>
                    <div className="left">
                    <div className="questionHeader">
                        <h1>Question <span>{currentQuestion + 1}</span>/{questions.length}</h1>
                    </div>
                    <div className="question">
                        <p>{questions[currentQuestion].questionText}</p>
                    </div>
                </div>
                <div className="right">
                    <div className="answers">
                        <ul>
                            {questions[currentQuestion].answerOptions.map(answerQuestion => (
                                <li onClick={() => handleAnswerButtonClick(answerQuestion.isCorrect)} className="answerButton">{answerQuestion.answerText}</li>
                            ))};
                        </ul>
                    </div>
                </div>
                </>)
            }
        </div>            
    )
}