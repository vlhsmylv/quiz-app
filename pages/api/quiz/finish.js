import quizzes from "../../../temporary/quizzes.json";

export default async function handler(req, res) {
    if(req.method === "POST") {
        const quiz = quizzes[req.body.quiz];
        const questions = quizzes[req.body.quiz].content;
        const answers = req.body.output;

        let total = 0;
        let quizTotal = 0;

        questions.map((question) => {
            quizTotal+=parseInt(question.point);
        })

        const output = [];

        answers.map((answer) => {
            const questionId = answer.meta.substring(7, answer.meta.length);
            const question = questions[questionId];

            if(question.answer === answer.value) {
                total += parseInt(question.point);
                output.push({
                    question,
                    correct: true,
                    answer: answer.value
                })
            } else {
                output.push({
                    question,
                    correct: false,
                    answer: answer.value
                })
            }
        })

        res.status(200).json({
            total: total,
            quizTotal: quizTotal,
            quiz: {
                title: quiz.title,
                ref: req.body.quiz
            },
            output: output
        })
    }
}