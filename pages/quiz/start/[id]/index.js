import {useRouter} from "next/router";
import Head from "next/head";
import Layout from "../../../../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios"
import Link from "next/link";
import Question from "../../../../components/Question";
import root from "../../../../api/root";

export default function QuizStart() {
    const router = useRouter();

    const [quiz, setQuiz] = useState({});
    const [content, setContent] = useState([]);
    const [id, setId] = useState('');

    const getQuiz = async (id) => {
        const { data } = await axios.get(`${root}/api/quizzes/${id}`);

        if(data==="") {
            router.push("/404");
        } else {
            setQuiz(data);
            setContent(data.content);
        }
    }

    const isUserWantToStart = async () => {
        if(typeof window !== "undefined") {
            if(confirm("Do you want to start quiz?")) {
                return true;
            } else {
                return false;
            }
        }
    }

    const finishQuiz = async (e) => {
        e.preventDefault();
        if(typeof window !== "undefined") {
            if(confirm("Do you want to submit quiz?")) {
                const output = [];
                for(let i=0; i<content.length; i++) {
                    output.push({
                        meta: e.target[i]['name'],
                        value: e.target[i]['value']
                    })
                }
                const { data } = await axios.post(`${root}/api/quiz/finish`, {
                    quiz: id,
                    output: output
                });

                if(typeof window !== "undefined") {
                    window.sessionStorage.setItem("results", JSON.stringify({[id]: {
                            output: data
                    }}))

                    await router.push(`/quiz/start/${id}/results`)
                }
            }
        }
    }

    useEffect(() => {
        if(router.isReady) {
            const query = router.query.id;
            if(isUserWantToStart()) {
                getQuiz(query);
            }
            setId(query);
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
                <div id="content" className={"m-auto"} style={{
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
                            {content.length === 0 ? (
                                <>Waiting...</>
                            ) : (
                                <form id={"quiz"} style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px"
                                }} onSubmit={finishQuiz}>
                                    <div className={"fs-3 fw-bold text-center"}>
                                        {quiz.title}
                                    </div>
                                    <div>
                                        <div className={"fw-bold fs-5"}>
                                            Information
                                        </div>
                                        <ul>
                                            {quiz.rules.map((rule, i) => (
                                                <li key={i}>{rule}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div id={"questions"} style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "20px"
                                    }}>
                                        {content.map((question, i) => (
                                            <Question key={i} question={question} />
                                        ))}
                                        <div className={"text-center"}>
                                            <input type="submit" className={"btn btn-dark fs-4"} value={"Finish"}/>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    )
}