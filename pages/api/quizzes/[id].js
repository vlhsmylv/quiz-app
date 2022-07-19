import quizzes from "../../../temporary/quizzes.json";

export default async function handler(req, res) {
    const id = req.query.id;

    res.status(200).json(quizzes[id]);
}