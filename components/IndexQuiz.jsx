import Link from "next/link";

export default function IndexQuiz({quiz, id}) {
    return (
        <Link href={`/quiz/${id}`}>
                <div id={`questionContainer_${id}`} style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    paddingBottom: "10px"
                }} className={"border rounded bg-light"}>
                    <div className={"text-center"}>
                        <img style={{
                            width: "300px",
                            height: "200px"
                        }} src={quiz.preview} className={"border rounded"} alt={quiz.description} />
                    </div>
                    <div className={"text-center ms-3 me-3"}>
                        {quiz.title}
                    </div>
                    <small className={"ms-3 me-3"}>
                        {quiz.author}
                    </small>
                    <small className={"ms-3 me-3"}>
                        {quiz.date}
                    </small>
                </div>
        </Link>
    )
}