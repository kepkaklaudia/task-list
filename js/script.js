{
	let tasks = [];

	const addNewTask = (newTaskContent) => {
		tasks = [
			...tasks,
			{ content: newTaskContent },
		];
		render();
	};

	const removeTask = (taskIndex) => {
		tasks.splice(taskIndex, 1);
		render();
	};

	const toggleTaskDone = (taskIndex) => {
		tasks[taskIndex].done = !tasks[taskIndex].done;
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

	const render = () => {
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

