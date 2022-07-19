export default function Question({question}) {
    return (
        <div className={"border rounded bg-light p-2"} style={{
            width: "400px",
            maxHeight: "500px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
        }}>
            {question.isContainsMedia ? (
                <div className={"text-center"}>
                    <img style={{
                        width: "200px"
                    }} className={"border rounded "} src={question.questionMedia} />
                </div>
            ) : (
                <></>
            )}
            {question.questionType === "texted" ? (
                <div className={"fs-2"}>
                    {question.question}
                </div>
            ) : (
                <div>
                    <img style={{
                        width: "50px"
                    }} className={"border rounded"} src={`/questions/${question.questionImage}`} />
                </div>
            )}
            <div>
                {question.description}
            </div>
            {question.answerType === "open" ? (
                <div>
                    <input placeholder={"Enter answer"}   name={`answer_${question.id}`} id={`answer_${question.id}`} />
                </div>
            ) : (
                <div>
                    <select style={{
                        cursor: "pointer"
                    }} defaultValue={"unselected"} name={`answer_${question.id}`} id={`answer_${question.id}`}>
                        <option value="unselected" disabled={true}>Select</option>
                        {(question.answers).map((answer, i) => (
                            <option  value={answer} key={i}>{answer}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}