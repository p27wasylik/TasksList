{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (index) => {
        const tasksWithoutSelectedItem = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        const tasksToggleSelectedItem = [
            ...tasks[index].done = !tasks[index].done,
        ];
        render();
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            
            <li class="section__li">
                <button class="section__button--toggleDone js-toggleDone">
                ${task.done ? "✔" : ""}
                </button>
                <span
                ${task.done ? " class=\"section__span\"" : ""}>
                ${task.content}
                </span>
                <button class="section__button--delete js-delete">🗑</button>
            </li>
        `;
        }
    };

    document.querySelector(".js-tasksList").innerHTML = htmlString;

    const render = () => {

        renderTasks();

        const removeButtons = document.querySelectorAll(".js-delete");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        document.querySelector(".js-newTask").value = "";
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);

    };
    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}