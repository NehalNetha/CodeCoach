import { VM } from "vm2";
import { loadProblems } from "./problems.js";
import Problems from "../models/ProblemModel.js";


const p = (req, res) => {
    res.json("dgfsdg")
}

const TestProblem = async(req, res) => {
    console.log("Received a request to /code/javascript");

    try{
        const {code} = req.body
        console.log(code)

        if(!code){
            return res.status(400).json({ error: "No code provided" });
            
        }

        const vm = new VM
        ({
            timeout: 1000,
            sandbox: {}
        })

        let output = "";
        vm.on('console.log', (...args) => {
            output += args.join(' ') + '\n';
        });
        const result = vm.run(code);

        console.log(result)

        res.json({
           result: result,
        });
    }catch(error){
        res.status(500).json({ error: error.message });
    }

}

// function RunCode(code, problem) {
//     const vm = new VM({
//         timeout: 1000,
//         sandbox: {}
//     });

//     try {
//         const wrappedCode = `
//             ${code}
        
//         ${problem.functionName}
//         `;
//         console.log(wrappedCode)
//         const userFunc = vm.run(wrappedCode);

//         const results = problem.testCases.map(testCase => {
//             try {
//                 const result = userFunc(testCase.input);
//                 return {
//                     passed: JSON.stringify(result) === JSON.stringify(testCase.expected),
//                     input: testCase.input,
//                     expected: testCase.expected,
//                     output: result
//                 };
//             } catch (error) {
//                 return {
//                     passed: false,
//                     input: testCase.input,
//                     expected: testCase.expected,
//                     error: error.message
//                 };
//             }
//         });

//         return results;
//     } catch (error) {
//         return [{ error: error.message }];
//     }
// }


// app.post('/submit/:problemId',

function RunCode(code, problem) {
    const vm = new VM({
        timeout: 1000,
        sandbox: {}
    });

    try {
        const wrappedCode = `
            ${code}
        
            ${problem.functionName}
        `;
        const userFunc = vm.run(wrappedCode);

        const results = problem.testCases.map(testCase => {
            try {
                let result;
                if (typeof testCase.input === 'object' && !Array.isArray(testCase.input)) {
                    result = userFunc(...Object.values(testCase.input));
                } else {
                    result = userFunc(testCase.input);
                }
                return {
                    passed: JSON.stringify(result) === JSON.stringify(testCase.expected),
                    input: testCase.input,
                    expected: testCase.expected,
                    output: result
                };
            } catch (error) {
                return {
                    passed: false,
                    input: testCase.input,
                    expected: testCase.expected,
                    error: error.message
                };
            }
        });

        return results;
    } catch (error) {
        return [{ error: error.message }];
    }
}

const RunSubmittedCode = async (req, res) => {

    const { problemId } = req.params;
    const { code } = req.body;

    const problem = await Problems.findOne({id: problemId})

  
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
  
    const results = RunCode(code, problem);
    res.json(results);
  };



export default TestProblem
export {p, RunSubmittedCode}




