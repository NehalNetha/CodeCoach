import Problems from "../models/ProblemModel.js";
const addProblem = async (req, res) => {
  try {
    const { id, title, difficulty, description, examples, constraints, functionName, starterCode, testCases, topic } = req.body;

    if (!id || !title || !difficulty || !description || !functionName) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const newProblem = new Problems({
      id,
      title,
      difficulty,
      description,
      examples,
      constraints,
      functionName,
      starterCode,
      testCases,
      topic
    });

    const savedProblem = await newProblem.save();

    return res.status(201).json({
      message: 'Problem added successfully!',
      problem: savedProblem,
    });
  } catch (error) {
    console.error('Error adding problem:', error);
    return res.status(500).json({ error: 'Server error while adding problem' });
  }
};

const getProblem = async (req, res) => {
    try{
        const problem = await Problems.find()
        return res.json(problem)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProblemById = async (req, res) => {
  try{
    const {id} = req.params
    const problem = await Problems.findOne({id: id})

    return res.json(problem)
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}

// const updateProblem = async (req, res) => {
//   try{
//     const {id} = req.body
//     const updatedProblem = await Problems.findOneAndUpdate(
//       {id: id},
//       {$set: {finished: true}},
//       {new: true}

//     )

//     if (!updatedProblem) {
//       return res.status(404).json({ message: 'Problem not found' });
//     }

//     return res.json({
//       message: 'Problem updated successfully',
//       problem: updatedProblem
//     });

//   }catch(error){
//     res.status(500).json({ message: error.message });
//   }
// }

const updateProblem =  async (req, res) => {
  try {
    const { userId, problemId } = req.body;

    if (!userId || !problemId ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updatedProgress = await UserProgress.findOneAndUpdate(
      { userId, problemId },
      {
        $set: { finished: true }, 
        $inc: { attempts: 1 }     
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    res.json({
      message: 'User progress updated successfully',
      progress: updatedProgress
    });
  } catch (error) {
    console.error('Error updating user progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {addProblem, getProblem, getProblemById, updateProblem}



