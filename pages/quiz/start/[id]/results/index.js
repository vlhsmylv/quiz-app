import Layout from "../../../../../components/Layout";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import {useRouter} from "next/router";
import Question from "../../../../../components/Question";
import Answer from "../../../../../components/Answer";
import Head from "next/head";
import ReactToPrint from "react-to-print";

export default function QuizResults() {
    const [results, setResults] = useState({});

    const router = useRouter();

    const getSession = async (id) => {
        if(typeof window !== "undefined") {
         try {
             if(window.sessionStorage.getItem("results") === null) {
                 router.push(`/quiz/${id}`)
             } else {
                 setResults(JSON.parse(window.sessionStorage.getItem("results"))[id]['output']);
             }
         } catch (error) {
             if(error.message === "JSON.parse(...)[id] is undefined") {
                 router.push(`/quiz/${id}`)
             }
         }
        }
    }

    const printResults = async (e) => {
        e.preventDefault();
        if(typeof window !== "undefined") {
            window.print();
        }
    }

    useEffect(() => {
        if(router.isReady) {
            getSession(router.query.id);
        }
    }, [router.isReady])

    return (
        <Layout>
            <Head>
                <title>Quiz app</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                      integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
                      crossOrigin="anonymous" referrerPolicy="no-referrer"/>
            </Head>

            <div id="content" className={"m-auto"} style={{
                padding: "0px !important"
            }}>
                {Object.keys(results).length === 0 ? (
                    <>Loading...</>
                ) : (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}>
                        <div id={"results"} style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px"
                        }}>
                            <div className={"fs-3 fw-bold text-center"}>
                                <Link href={`/quiz/${results.quiz.ref}`}>
                                    <a className={"text-dark text-decoration-none"}>
                                        {results.quiz.title}
                                    </a>
                                </Link>
                            </div>
                            <div id={"answers"} style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px"
                            }} className={"_answers"}>
                                {results.output.map((answer, i) => (
                                    <Answer key={i} answer={{
                                        question: answer.question,
                                        correct: answer.correct,
                                        value: answer.answer
                                    }} />
                                ))}
                            </div>
                            <div className={"text-center"}>
                                You got {results.total}/{results.quizTotal} {
                                   results.total>80 ? (
                                       <>🥳 keep going!</>
                                   ) : (
                                       <>😌 work harder!</>
                                   )
                                }
                           </div>
                            <div className={"text-center"}>
                                <button className="btn btn-outline-dark fs-4" onClick={() => {
                                    router.push("/");
                                }}>
                                    <i className="fa-solid fa-rotate-left"></i> Go back
                                </button>
                                <button className="btn btn-dark fs-4 ms-3" onClick={printResults}>
                                    <i className="fa-solid fa-print"></i> Print
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}