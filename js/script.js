{
	const tasks = [];

	const addNewTask = (newTaskContent) => {
		tasks.push({
			content: newTaskContent,
		});
		render();
	};

	const removeTask = (taskIndex) => {
		tasks.splice(taskIndex, 1);
		render();
	}

	const toggleTaskDone = (taskIndex) => {
		tasks[taskIndex].done = !tasks[taskIndex].done;
		render();
	}

	const bindEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");
		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});

		const toggleDoneButtons = document.querySelectorAll(".js-done");
		toggleDoneButtons.forEach((toggleDoneButton, index) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});
	}

	const render = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
		<li class="tasksList">	 
        	<button class="task__button task__button--done js-done">
				${task.done ? "&#10004" : ""}
			</button>
        <span class="taskContent ${task.done ? " taskContent--done" : ""}">${task.content} </span>
       		<button class="task__button task__button--remove js-remove">
				&#128465
			</button> 
		</li>
		`;
		}
		document.querySelector(".js-tasks").innerHTML = htmlString;

		bindEvents();

	};

	const onFormSubmit = (event) => {
		event.preventDefault();
		const newTask = document.querySelector(".js-newTask")
		const newTaskContent = newTask.value.trim();

		if (newTaskContent === "") {
			return;
		}
		addNewTask(newTaskContent);
		clearInput(newTask);
	};

	const clearInput = (newTask) => {
		newTask.value = "";
	}

	const focusOn = () => {
		document.querySelector(".js-newTask").focus();
	}

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
		form.addEventListener("submit", clearInput);
		form.addEventListener("submit", focusOn);

	};
	init();
}

