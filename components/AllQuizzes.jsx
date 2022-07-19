import {useEffect, useState} from "react";
import IndexQuiz from "./IndexQuiz";
import root from "../api/root";
import axios from "axios";

export default function AllQuizzes() {
    const [quizzes, setQuizzes] = useState([]);

    const getQuizzes = async () => {
        const {data} = await axios.get(`${root}/api/quizzes`);

        setQuizzes(data);
    }

    useEffect(() => {
        getQuizzes();
    }, [])

    return (
        <div id={"quizzes"} style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 0fr))",
            justifyContent: "center",
            gap: "30px"
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