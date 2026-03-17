const Task = require("../../models/taskModel");


// @desc - mark the task as completed
// @route - GET - /api/task/mark/:id -- id is the task id
// @access - Public
const markCompleted = async(req, res) => {
    try{
        const id = req.params.id;
        const task = await Task.findById(id);

        if(!task){
            res.status(200).send({message: "Task not found"})
        }

        task.complete = true;
        await task.save();

        res.send({message: "task marked completed", task});

    } catch (err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong!"})
    }
}

module.exports = markCompleted;