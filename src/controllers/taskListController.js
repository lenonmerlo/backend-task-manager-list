const taskListModel = require("../models/taskListModel")

module.exports = {
    // GET /app
    index: (req, res) => {
        const taskLists = taskListModel.getAllTaskLists()
        res.render('app', { taskLists })
    },

    // GET /app/nova-lista
    create: (req, res) => {
        res.render('create.ejs')
    },

    // POST /app/nova-lista
    save: (req, res) => {
        const { title } = req.body

        const newList = taskListModel.createList(title)
        taskListModel.saveList(newList)

        res.redirect('/app')
    },

    // GET /app/:id
    show: (req, res) => {
        try {
            const { id } = req.params
            const taskList = taskListModel.getAllTaskListById(id)
            if (!taskList) throw new Error('Lista de tarefas não encontrada!')
            res.render('show', { taskList })
        } catch (error) {
            res.status(404).send(error.message) // Ou redirecione para uma página de erro
        }
    },
    

    // POST /app/:id/excluir
    delete: (req, res) => {
        const { id } = req.params
        taskListModel.deleteList(id)
        res.redirect('/app')
    },

    // POST /app/:id/nova-tarefa
    addTask: (req, res) => {
        const { id } = req.params
        const { title } = req.body

        taskListModel.addTask(id, title)
        res.redirect(`/app/${id}`)
    },

    // POST /app/:listId/completar/:taskId
    completeTask: (req, res) => {
        const { listId, taskId } = req.params

        taskListModel.completeTask(listId, taskId)
        res.redirect(`/app/${listId}`)
    },

    // POST /app/:listId/desfazer/:taskId
    undoTask: (req, res) => {
        const { listId, taskId } = req.params

        taskListModel.undoTask(listId, taskId)
        res.redirect(`/app/${listId}`)
    }
}