import Link from "next/link";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Err404() {
    return (
        <>
            <Head>
                <title>Quiz app</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                      integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
                      crossOrigin="anonymous" referrerPolicy="no-referrer"/>
            </Head>

            <div style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px"
            }}>
                <h1>404 Not Found</h1>
                <div>
                    <Link href={"/"} >
                        <a className={"btn btn-outline-dark"}>
                            Go back
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}