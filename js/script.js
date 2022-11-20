{
    let tasks = [];
    let doneTaskFlag = false;


    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const toggleTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const hideDoneTasks = () => {
        doneTaskFlag = !doneTaskFlag;
        render();
    };

    const bindEventRemoveButtons = () => {
        const removeButtons = document.querySelectorAll(".js-delete");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindEventToggleDoneButtons = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };


    const bindButtonsEvent = () => {

        const toggleAllDoneEvent = () => {
            toggleAllDone.addEventListener("click", () => {
                toggleTasksDone();
            })
        };

        const hideDoneTasksEvent = () => {
            hideDoneTasksButton.addEventListener("click", () => {
                hideDoneTasks();
            })
        };

        const toggleAllDone = document.querySelector(".js-doneButton");
        toggleAllDone ? toggleAllDoneEvent() : "";

        const hideDoneTasksButton = document.querySelector(".js-hideShowButton");
        hideDoneTasksButton ? hideDoneTasksEvent() : "";
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            
            <li class="section__li ${task.done && doneTaskFlag ? "section__li--hidden" : ""}">
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


        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let mainButtons = "";

        if (tasks.length > 0) {
            mainButtons += `
            <button class="div__button js-hideShowButton">
                ${doneTaskFlag ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button 
                class="div__button js-doneButton"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}
            >
                Ukończ wszystkie
            </button>
          `;
        }

        document.querySelector(".js-buttons").innerHTML = mainButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindButtonsEvent();

        bindEventRemoveButtons();
        bindEventToggleDoneButtons();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        let inputValue = document.querySelector(".js-newTask");
        const newTaskContent = inputValue.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            inputValue.value = "";
        }

        inputValue.focus();

    };
    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}