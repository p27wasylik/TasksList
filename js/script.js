{
    const tasks = [
        {
            content: "zdanie 1",
            done: false,
        },
        {
            content: "zadanie 2",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li
                    ${task.done ? " class=\"section__li--done\"" : ""}
                    >
                    ${task.content}
                </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    }

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