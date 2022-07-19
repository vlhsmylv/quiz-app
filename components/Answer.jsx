import Image from "next/image";

export default function Answer({answer}) {
    return (
        <div className={"border rounded bg-light p-2"} style={{
            width: "400px",
            maxHeight: "500px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
        }}>
            <div>
                <span>
                    Question {answer.question.id+1}
                </span>
                <span className="float-end">
                    {answer.question.point} <i className="fa-solid fa-star"></i>
                </span>
            </div>
            {answer.question.isContainsMedia ? (
                <div className={"text-center"}>
                    <img style={{
                        width: "200px"
                    }} className={"border rounded "} src={answer.question.questionMedia} />
                </div>
            ) : (
                <></>
            )}
            {answer.question.questionType === "texted" ? (
                <div className={"fs-2"}>
                    {answer.question.question}
                </div>
            ) : (
                <div>
                    <Image width={"50px"} height={"50%"} className={"border rounded"} src={`/questions/${answer.question.questionImage}`} />
                </div>
            )}
            <div>
                {answer.question.description}
            </div>
            <div>
                Correct answer: {answer.question.answer}
            </div>
            <div>
                Your answer: <span className={answer.correct ? "text-success" : "text-danger"}>{answer.value}</span>
            </div>
            <div>
                {answer.correct ? (
                    <div className={"text-success text-center"}>
                       Correct {answer.question.point} points added 🥳
                    </div>
                ) : (
                    <div className="text-danger text-center">
                        False this question is {answer.question.point} point, but you did not get anything 😌
                    </div>
                )}
            </div>
        </div>
    )
}