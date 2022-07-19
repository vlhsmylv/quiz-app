import {useRouter} from "next/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import AllQuizzes from "../../components/AllQuizzes";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import axios from "axios"
import Link from "next/link";

export default function QuizPage() {
    const router = useRouter();

    const [quiz, setQuiz] = useState({});
    const [id, setId] = useState('');

    const getQuiz = async (id) => {
        const { data } = await axios.get(`/api/quizzes/${id}`);

        setQuiz(data);
    }

    useEffect(() => {
        if(router.isReady) {
            getQuiz(router.query.id);
            setId(router.query.id);
        }
   }, [router.isReady])

    return (
        <div>
            <Head>
                <title>Quiz app</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                      integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
                      crossOrigin="anonymous" referrerPolicy="no-referrer"/>
            </Head>

            <Layout>
                <div id="content" className={"border rounded bg-light m-auto"} style={{
                    maxWidth: "400px",
                    padding: "0px !important"
                }}>
                    {Object.keys(quiz).length === 0 ? (
                        <>Loading...</>
                    ) : (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px"
                        }}>
                            <div className={"text-center"}>
                                <img style={{
                                    maxWidth: "100%"
                                }} src={quiz.preview} className={"border rounded"} alt={quiz.description}/>
                            </div>
                            <div className={"text-center fw-bold fs-2"}>{quiz.title}</div>
                            <div className={"ps-3 pe-3"}>
                                {quiz.description}
                            </div>
                            <small className={"ps-3 pe-3"}>
                                Uploaded by {quiz.author} at {quiz.date}
                            </small>
                            <div style={{
                                display: "flex",
                                flexDirection: "column"
                            }} className={"ps-3 pe-3"}>
                                <div className={"fs-5 fw-bold"}>
                                    Information
                                </div>
                                <ul style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px"
                                }} className={"mt-2"}>
                                    {quiz.rules.map((rule, i) => (
                                        <li key={i}>
                                            {rule}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={"text-center fs-4"}>
                                {(quiz.price === "free") ? (
                                    <span className={"text-success"}>Free</span>
                                ) : (
                                    <>{quiz.price} ₼</>
                                )}
                            </div>
                            <div className={"text-center mb-3"}>
                                {id === "" ? (
                                    <>Loading...</>
                                ) : (
                                   <Link href={`/quiz/start/${id}`}>
                                       <a className={"btn btn-dark fs-4"}>
                                           Start
                                       </a>
                                   </Link>
                                )}
                            </div>
                        </div>
                     )}
                </div>
            </Layout>
        </div>
    )
}