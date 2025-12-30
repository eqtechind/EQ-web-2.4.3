"use client";
import React, { useState } from "react";
import "../../styles/FAQ.css";
const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const onQuestionClick = (index) => {
    if (selectedQuestion == index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  const questionList = [
    {
      id: 1,
      question: "What is EQvisor",
      answer: "EQvisor is your go-to investor-startup co-prosperity zone.",
    },
    {
      id: 2,
      question: "Can I register my startup?",
      answer: "With proper documentation sure. ",
    },
    {
      id: 3,
      question: "Is there any fee?",
      answer: "Yes.",
    },
  ];
  return (
    <div className="faq-container">
      <div className="faq-section">
        <span>FAQ</span>
        <div className="questions-container">
          <div className="question">
            {questionList.map((item, index) => (
              <div
              key={index+1}
                onClick={() => onQuestionClick(item.id)}
                className={` transition-show w-[96%] px-2 mt-4 flex flex-col items-center justify-center ${
                  item.id == questionList.length ? "" : "border-b-[2px]"
                } border-gray-200`}
              >
                <div className="question-item">
                  <img
                    className={selectedQuestion == item.id ? "img-active" : ""}
                    width="24"
                    height="24"
                    src="https://img.icons8.com/ios/50/plus-math.png"
                    alt="multiply"
                  />{" "}
                  {item.question}
                </div>
                <div
                  className={`answer-container w-[83%] pb-4  ${
                    selectedQuestion === item.id ? "show pt-2" : ""
                  }`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
