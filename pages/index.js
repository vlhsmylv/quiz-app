import Head from 'next/head'
import Nav from "../components/Nav";
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../components/Layout";
import AllQuizzes from "../components/AllQuizzes";

export default function Home() {
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
              <AllQuizzes />
          </Layout>
      </div>
  )
}
