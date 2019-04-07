function formatter(rows){
    let descriptions = [];
    let task = {};
    let task_info = {};

    for (let i = 0 ; i < rows.length ; i++){
        task_info = {};
        task_info.id_task = rows[i].id_task;
        task_info.description = rows[i].description_task;
        descriptions.push(task_info);
    }

    task.id_user = rows[0].id_user;
    task.name = rows[0].name;
    task.lastname = rows[0].lastname;
    task.tasks = descriptions;
    return task;
}

module.exports = {
    formatter
}
