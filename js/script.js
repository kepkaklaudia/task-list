{
	let tasks = [];
	let hideDoneTasks = false;

	const addNewTask = (newTaskContent) => {
		tasks = [
			...tasks,
			{ content: newTaskContent },
		];
		render();
	};

	const removeTask = (taskIndex) => {
		tasks = [
			...tasks.slice(0, taskIndex),
			...tasks.slice(taskIndex + 1),
		];
		render();
	};

	const toggleTaskDone = (taskIndex) => {
		tasks = [
			...tasks.slice(0, taskIndex),
			{ ...tasks[taskIndex], done: tasks[taskIndex].done = !tasks[taskIndex].done },
			...tasks.slice(taskIndex + 1),
		];
		render();
	};

	const bindRemoveEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});
	};

	const bindToggleDoneEvents = () => {
		const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

		toggleDoneButtons.forEach((toggleDoneButton, index) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});
	}

	const renderTask = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
				<li class="tasksList">	 
        		<button class="task__button task__button--toggleDone js-toggleDone">
							${task.done ? "&#10004" : ""}
						</button>
       			<span class="taskContent ${task.done ? " taskContent--done" : ""}">
							${task.content} 
						</span>
       			<button class="task__button task__button--remove js-remove">
			   			<i class="fa">&#xf014;</i>
						</button> 
				</li>
				`;
		}

		document.querySelector(".js-tasks").innerHTML = htmlString;

		bindRemoveEvents();
		bindToggleDoneEvents();
	};

	const renderButtons = () => {
		let htmlString = "";
		if (tasks !== 0) {
			htmlString += `
	<button class=" js-hideAllDoneButton">${hideDoneTasks ? "Pokaż " : "Ukryj "}ukończone</button>
	<button class=" js-setAllDoneButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
	`;
		}
		document.querySelector(".js-buttons").innerHTML = htmlString;
	};

  const setAllTasksDone = () => {
    const toggleAllDone = document.querySelector(".js-setAllDoneButton")
    toggleAllDone.addEventListener("click", () => {
      markAllTasksDone();
    });
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) =>
    ({
      ...task,
      done: true
    }));
    render();
  };

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newTask = document.querySelector(".js-newTask");
		const newTaskContent = newTask.value.trim();

		if (newTaskContent === "") {
			return;
		}
		addNewTask(newTaskContent);
		clearInput(newTask);
	};

	const clearInput = (newTask) => {
		newTask.value = "";
	};

	const focusOn = () => {
		document.querySelector(".js-newTask").focus();
	};

	const render = () => {
		renderTask();
		renderButtons();
		setAllTasksDone();
	};

	const init = () => {

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
		form.addEventListener("submit", clearInput);
		form.addEventListener("submit", focusOn);
	};

	init();
};

