const User = require("../../models/userModel");


// @desc - get the tasks for the user (pagination, sort, match)
// @route - GET - /api/task/:id?page=10&row-per-page=5 ----- note id: is of owner id
// @route - GET - /api/task/:id?page=10&row-per-page=5&complete=true
// @route - GET - /api/task/:id?page=10&row-per-page=5&complete=true&sortBy=createdAt:<desc or asc>
// @access - Public
const getTasks = async(req, res) => {
    try{
        let id = req.params.id;
        let obj = await User.findById(id);
        let page = parseInt(req.query.page);
        let rowPerPage = parseInt(req.query["row-per-page"]);
        let skip = page * rowPerPage - rowPerPage;

        const match = {};
        const sort = {};

        if(req.query.complete){
            match.complete = req.query.complete === "true" ? true : false;
        }

        if(req.query.sortBy) {
            const parts = req.query.sortBy.split(":");
            sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
        }

        //populate method: used where document is having array of id's & we wnat to get info of all id with pagination, & match, sort
        let result = await obj.populate({
            path: 'tasks',
            match,
            options: {
                limit: rowPerPage,
                skip: skip,
                sort
            }
        })

        res.status(200).send({result: result})

    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong!"})
    }
}

module.exports = getTasks;