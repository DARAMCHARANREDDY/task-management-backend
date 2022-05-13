var user = require("../model/task");

const addTask = (req, res) => {
    try {
        if (req.files && req.body && req.body.name && req.body.desc && req.body.price &&
            req.body.discount) {

            let new_task = new task();
            new_task.title = req.body.title;
            new_task.description = req.body.description;
            new_task.urgency = req.body.urgency;
            new_task.status = req.body.status;
            new_task.user_id = req.user.id;
            new_task.save((err, data) => {
                if (err) {
                    res.status(400).json({
                        errorMessage: err,
                        status: false
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        title: 'Task Added successfully.'
                    });
                }
            });

        } else {
            res.status(400).json({
                errorMessage: 'Add proper parameter first!',
                status: false
            });
        }
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        });
    }
}

const updateTask = (req, res) => {
    try {
        if (req.body && req.body.name && req.body.desc && req.body.price &&
            req.body.id && req.body.discount) {

            task.findById(req.body.id, (err, new_task) => {

                if (req.body.title) {
                    new_task.title = req.body.title;
                }
                if (req.body.description) {
                    new_task.description = req.body.description;
                }
                if (req.body.urgency) {
                    new_task.urgency = req.body.urgency;
                }
                if (req.body.status) {
                    new_task.status = req.body.status;
                }
                if (req.body.isCollapsed) {
                    new_task.isCollapsed = req.body.isCollapsed;
                }
                new_task.save((err, data) => {
                    if (err) {
                        res.status(400).json({
                            errorMessage: err,
                            status: false
                        });
                    } else {
                        res.status(200).json({
                            status: true,
                            title: 'Product updated.'
                        });
                    }
                });

            });

        } else {
            res.status(400).json({
                errorMessage: 'Add proper parameter first!',
                status: false
            });
        }
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        });
    }
}

const deleteTask = (req, res) => {
    try {
        if (req.body && req.body.id) {
            task.findByIdAndUpdate(req.body.id, { is_delete: true }, { new: true }, (err, data) => {
                if (data.is_delete) {
                    res.status(200).json({
                        status: true,
                        title: 'Task deleted.'
                    });
                } else {
                    res.status(400).json({
                        errorMessage: err,
                        status: false
                    });
                }
            });
        } else {
            res.status(400).json({
                errorMessage: 'Add proper parameter first!',
                status: false
            });
        }
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        });
    }
}

const getTask = (req, res) => {
    try {
        var query = {};
        query["$and"] = [];
        query["$and"].push({
            is_delete: false,
            user_id: req.user.id
        });
        if (req.query && req.query.search) {
            query["$and"].push({
                name: { $regex: req.query.search }
            });
        }
        var perPage = 5;
        var page = req.query.page || 1;
        task.find(query, { date: 1, name: 1, id: 1, desc: 1, price: 1, discount: 1, image: 1 })
            .skip((perPage * page) - perPage).limit(perPage)
            .then((data) => {
                task.find(query).count()
                    .then((count) => {

                        if (data && data.length > 0) {
                            res.status(200).json({
                                status: true,
                                title: 'Tasks retrived.',
                                products: data,
                                current_page: page,
                                total: count,
                                pages: Math.ceil(count / perPage),
                            });
                        } else {
                            res.status(400).json({
                                errorMessage: 'There are no tasks!',
                                status: false
                            });
                        }

                    });

            }).catch(err => {
                res.status(400).json({
                    errorMessage: err.message || err,
                    status: false
                });
            });
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        });
    }

}
module.exports = { addTask, updateTask, deleteTask, getTask }