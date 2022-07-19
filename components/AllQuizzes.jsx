import {useEffect, useState} from "react";
import IndexQuiz from "./IndexQuiz";

export default function AllQuizzes() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        // Set as axios
        fetch("/api/quizzes").then((response) => response.json()).then((data) => {
            setQuizzes(data);
        })
    }, [])

    return (
        <div id={"quizzes"} style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 0fr))",
            justifyContent: "center"
        }}>
            {quizzes.length === 0 ? (
                <>Loading...</>
            ) : (
                <>
                    {quizzes.map((quiz, i) => (
                        <IndexQuiz quiz={quiz} id={i} key={i} />
                    ))}
                </>
            )}
        </div>
    )
}