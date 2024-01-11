document.addEventListener("DOMContentLoaded", function() {
    const monthsSelect = document.getElementById("months");
    const calendarContainer = document.getElementById("calendar");
    const taskModal = document.getElementById("taskModal");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const tasksContainer = document.getElementById("tasksContainer");

    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    function generateCalendar(month) {
        // Lógica para gerar o calendário para o mês selecionado
        // ...

        // Exemplo básico de criação de dias (você pode melhorar isso):
        for (let i = 1; i <= 31; i++) {
            const day = document.createElement("div");
            day.classList.add("day");
            day.textContent = i;
            day.addEventListener("click", openTaskModal);
            calendarContainer.appendChild(day);
        }
    }

    function openTaskModal() {
        // Lógica para abrir o modal com as tarefas
        // ...

        // Exemplo básico de exibição do modal (você pode melhorar isso):
        taskModal.style.display = "block";
    }

    function closeTaskModal() {
        // Lógica para fechar o modal com as tarefas
        // ...

        // Exemplo básico de fechamento do modal (você pode melhorar isso):
        taskModal.style.display = "none";
    }

    function addTask() {
        const taskInput = document.getElementById("taskInput");
        const timeInput = document.getElementById("timeInput");
    
        // Verifique se ambos os campos estão preenchidos
        if (taskInput.value.trim() === "" || timeInput.value.trim() === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        const task = document.createElement("div");
        task.classList.add("task");
    
        const taskTitle = document.createElement("p");
        taskTitle.textContent = taskInput.value;
    
        const taskTime = document.createElement("p");
        taskTime.classList.add("task-time");
        taskTime.textContent = "Horário: " + timeInput.value;
    
        task.appendChild(taskTitle);
        task.appendChild(taskTime);
    
        tasksContainer.appendChild(task);
    
        // Limpar os campos após adicionar a tarefa
        taskInput.value = "";
        timeInput.value = "";
    }
    
    // Restante do código permanece o mesmo
    
    // Adicione um evento de clique para fechar o modal
    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", closeTaskModal);
    document.querySelector(".modal-content").appendChild(closeBtn);

    // Event listeners
    addTaskBtn.addEventListener("click", addTask);
    taskModal.addEventListener("click", function(event) {
        if (event.target === taskModal) {
            closeTaskModal();
        }
    });

    // Gere o calendário para o mês atual ao carregar a página
    const currentMonth = months[new Date().getMonth()];
    monthsSelect.value = currentMonth;
    generateCalendar(currentMonth);
});

function toggleNavbar() {
    const navbarMenu = document.getElementById('navbarMenu');
    navbarMenu.style.display = (navbarMenu.style.display === 'none' || navbarMenu.style.display === '') ? 'block' : 'none';
}