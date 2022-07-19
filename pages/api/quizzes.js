import quizzes from "../../temporary/quizzes.json";

export default function handler(req, res) {
    res.status(200).json(quizzes);
}