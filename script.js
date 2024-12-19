// adiconando a função addtask no botão
document.getElementById('addTaskButton').addEventListener('click', addTask);

// array de taks
const tasks = [];

// função add tasks
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskTime = document.getElementById('taskTime');
    const taskPriority = document.getElementById('taskPriority');
    const taskValue = taskInput.value.trim();
    
    if (taskValue && taskDate.value && taskTime.value && taskPriority.value) {
        const task = {
            value: taskValue,
            date: taskDate.value,
            time: taskTime.value,
            priority: taskPriority.value,
            completed: false
        };
        
        tasks.push(task);
        taskInput.value = '';
        taskDate.value = '';
        taskTime.value = '';
        taskPriority.selectedIndex = 0;

        renderTasks();
    }
}

// função rederizar tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const groupedTasks = tasks.reduce((acc, task) => {
        const dateKey = formatDate(task.date);
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(task);
        return acc;
    }, {});

    for (const date in groupedTasks) {
        const dateHeader = document.createElement('h3');
        dateHeader.innerText = `Data de Entrega: ${date}`;
        taskList.appendChild(dateHeader);

        const ul = document.createElement('ul');
        groupedTasks[date].forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">
                    ${task.value} - ${task.time} (Prioridade: ${task.priority})
                </span>
                <div>
                    <button class="edit-button" onclick="editTask(this)">Editar</button>
                    <button class="delete-button" onclick="deleteTask(this)">Remover</button>
                    <button class="complete-button" onclick="completeTask(this)">Concluir</button>
                </div>
            `;
            ul.appendChild(li);
        });
        taskList.appendChild(ul);
    }
}

// função formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Obtém o dia
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtém o mês (0-11)
    const year = date.getFullYear(); // Obtém o ano

    return `${day}/${month}/${year}`; // Formata como "dia/mês/ano"
}

// função editar data
function editTask(button) {
    const li = button.parentElement.parentElement;
    const span = li.querySelector('span');
    const taskIndex = Array.from(li.parentElement.children).indexOf(li);

    const task = tasks.find(t => t.value === span.innerText.split(' - ')[0]);

    const newTask = prompt('Editar tarefa:', task.value);
    const newDate = prompt('Editar data de entrega:', task.date);
    const newTime = prompt('Editar horário:', task.time);
    const newPriority = prompt('Editar prioridade (Alta, Média, Baixa):', task.priority);

    if (newTask) {
        task.value = newTask;
    }
    if (newDate) {
        task.date = newDate;
    }
    if (newTime) {
        task.time = newTime;
    }
    if (newPriority) {
        task.priority = newPriority;
    }

    renderTasks();
}

// função deletar tarefa
function deleteTask(button) {
    const li = button.parentElement.parentElement;
    const taskIndex = Array.from(li.parentElement.children).indexOf(li);
    tasks.splice(taskIndex, 1);
    renderTasks();
}

// função marcar como completa
function completeTask(button) {
    const li = button.parentElement.parentElement;
    const span = li.querySelector('span');
    const task = tasks.find(t => t.value === span.innerText.split(' - ')[0]);
    task.completed = !task.completed;
    renderTasks();
}