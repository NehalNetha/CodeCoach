import { readFileSync } from 'fs';
import { join } from 'path';


const loadProblems = () => {
    const filePath = join(".", 'problems.json');
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

const getProblemByIdFunc = (id) => {
    const problems = loadProblems()
    return problems.find(problem => problem.id == id)
}


const GetProblemById = async (req, res) => {
    const {id} = req.params
    const problem = getProblemByIdFunc(id)

    if (problem){
        res.json(problem);
    }else{
        res.status(404).json({ error: 'Problem not found' });
    }

};

const GetProblems = async (req, res) => {
    const problems = loadProblems()

    res.json(problems)
}


export default GetProblemById
export {GetProblems}
export {loadProblems}