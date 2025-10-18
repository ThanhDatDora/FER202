import React, { useEffect, useMemo, useReducer, useState } from "react";
import { Button, Container, Card, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaFlagCheckered } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Atlantic Ocean", "Canberra", "Melbourne", "Perth"], // giữ nguyên bài cũ nếu bạn muốn
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  checked: false,
  feedback: "",
  timeLeft: 10
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      if (state.checked || state.showScore) return state;
      return { ...state, selectedOption: action.payload };
    case "CHECK_ANSWER": {
      if (state.checked || state.showScore) return state;
      const correct = state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        score: correct ? state.score + 1 : state.score,
        checked: true,
        feedback: correct ? "correct" : "incorrect"
      };
    }
    case "TIME_TICK": {
      if (state.showScore || state.timeLeft === 0) return state;
      const next = state.timeLeft - 1;
      if (next > 0) return { ...state, timeLeft: next };
      if (!state.checked) {
        return { ...state, timeLeft: 0, checked: true, feedback: "incorrect" };
      }
      return { ...state, timeLeft: 0 };
    }
    case "NEXT_QUESTION": {
      const last = state.currentQuestion === state.questions.length - 1;
      if (last) return { ...state, showScore: true };
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        checked: false,
        feedback: "",
        timeLeft: 10
      };
    }
    case "RESTART_QUIZ":
      return { ...initialState };
    default:
      return state;
  }
}

export default function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, checked, feedback, timeLeft } = state;

  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("quizHighScore") || 0));

  // high score
  useEffect(() => {
    if (showScore) {
      const prev = Number(localStorage.getItem("quizHighScore") || 0);
      if (score > prev) {
        localStorage.setItem("quizHighScore", String(score));
        setHighScore(score);
      } else setHighScore(prev);
    }
  }, [showScore, score]);

  // timer
  useEffect(() => {
    if (showScore) return;
    const id = setInterval(() => dispatch({ type: "TIME_TICK" }), 1000);
    return () => clearInterval(id);
  }, [currentQuestion, showScore]);

  const headingIndexText = useMemo(
    () => `Question ${questions[currentQuestion].id}:`,
    [questions, currentQuestion]
  );
  const actionText = currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question";

  // ==== Styles để giống ảnh mẫu ====
  const wrap = { maxWidth: 900, margin: "24px auto" };
  const hIndex = { fontWeight: 800, textAlign: "center", fontSize: "2rem", marginBottom: 8 };
  const hQuestion = { textAlign: "center", fontSize: "1.5rem", marginBottom: 20 };
  const choices = { display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 8 };
  const footer = { display: "flex", justifyContent: "center", marginTop: 18 };

  const getVariant = (option) => {
    const isSelected = selectedOption === option;
    if (!checked) return isSelected ? "success" : "outline-secondary";
    // Sau khi đã chọn, nút đã chọn vẫn fill xanh như ảnh; các nút khác outline và disabled
    return isSelected ? "success" : "outline-secondary";
  };

  return (
    <Container style={wrap}>
      <Card className="p-4">
        {showScore ? (
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontWeight: 700, marginBottom: 8 }}>
              <FaFlagCheckered className="me-2" />
              Your Score: {score} / {questions.length}
            </h2>
            <div style={{ marginBottom: 16 }}>High score: <strong>{highScore}</strong> / {questions.length}</div>
            <Button size="lg" onClick={() => dispatch({ type: "RESTART_QUIZ" })}>Restart Quiz</Button>
          </div>
        ) : (
          <>
            <div style={hIndex}>{headingIndexText}</div>
            <div style={hQuestion}>{questions[currentQuestion].question}</div>

            <div style={choices}>
              {questions[currentQuestion].options.map((option, idx) => (
                <Button
                  key={idx}
                  size="lg"
                  variant={getVariant(option)}
                  disabled={checked || timeLeft === 0}
                  onClick={() => {
                    dispatch({ type: "SELECT_OPTION", payload: option });
                    dispatch({ type: "CHECK_ANSWER" });
                  }}
                >
                  {option}
                </Button>
              ))}
            </div>

            {checked && feedback === "incorrect" && (
              <Alert
                variant="light"
                className="mt-3"
                style={{ textAlign: "left", maxWidth: 520, margin: "12px auto 0" }}
              >
                <span style={{ color: "#dc3545", fontWeight: 700, display: "inline-flex", alignItems: "center" }}>
                  <FaTimesCircle style={{ marginRight: 8 }} />
                  Incorrect!
                </span>{" "}
                <span style={{ fontWeight: 600 }}>The correct answer is: {questions[currentQuestion].answer}</span>
              </Alert>
            )}

            {checked && feedback === "correct" && (
              <Alert
                variant="light"
                className="mt-3"
                style={{ textAlign: "left", maxWidth: 480, margin: "12px auto 0" }}
              >
                <span style={{ color: "#28a745", fontWeight: 700, display: "inline-flex", alignItems: "center" }}>
                  <FaCheckCircle style={{ marginRight: 8 }} />
                  Correct! 🎉
                </span>
              </Alert>
            )}

            <div style={footer}>
              <Button
                size="lg"
                variant="primary"
                disabled={!checked}
                onClick={() => dispatch({ type: "NEXT_QUESTION" })}
              >
                {actionText}
              </Button>
            </div>
          </>
        )}
      </Card>
    </Container>
  );
}
