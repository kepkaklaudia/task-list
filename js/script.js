{
	const tasks = [];

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
	};

	const addNewTask = (newTaskContent) => {
		tasks.push({
			content: newTaskContent,
		});
		render();
	}

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newTaskContent = document.querySelector(".js-newTask").value.trim();
		console.log(newTaskContent);

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

