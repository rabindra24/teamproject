import React, { useState } from "react";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "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",
// });

const QuerySolver = () => {
  const [demoData, setDemoData] = useState([]);
  const [question, setQuestion] = useState("");

  const [active, setActive] = useState(false);

  const handleSubmit = async () => {
    if (question !== "") {
      await fetch("http://localhost:3000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question }),
      })
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((res) => {
          console.log(res.data);
          setDemoData([
            ...demoData,
            {
              question,
              answer: res.data,
            },
          ]);
        });
    }
  };
  return (
    <div>
      <div onClick={() => setActive(!active)} className="querySolverIcon">
        <img
          className="supportImg"
          src="https://www.iconpacks.net/icons/2/free-chat-support-icon-1721-thumb.png"
          alt=""
          srcset=""
        />
      </div>
      {active && (
        <div className="querybox_container">
          <div className="relative_container">
            <div className="querybox_chat_container">
              <div onClick={() => setActive(false)}>close</div>
              <h2>Your Queries</h2>
              <div className="content">
                {demoData.map((item) => (
                  <div>
                    <h4 className="question">{item.question}</h4>

                    <pre className="answer">{item.answer}</pre>
                  </div>
                ))}
              </div>

              <div className="inputContainer">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuerySolver;
