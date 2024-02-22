let task_arr = [];

document.querySelector("#taskForm").addEventListener("submit", function (evt) {
  evt.preventDefault();
  const taskName = document.querySelector("#task").value;
  const quantity = document.querySelector("#quantity").value;
  makeNewTask(taskName, quantity);
});

function makeNewTask(theName, theQuantity) {
  let uuid = self.crypto.randomUUID();
  const task = { name: theName, quantity: theQuantity, done: false, id: uuid };
  task_arr.push(task);
  console.log("task", task);
  filterAndSortList();
}

function filterAndSortList() {
  showList("inProgressList", false);
  showList("doneList", true);
}

function showList(listId, isDone) {
  const listContainer = document.querySelector(`#${listId}`);
  listContainer.innerHTML = "";

  task_arr
    .filter((task) => task.done === isDone)
    .forEach((task) => {
      const clone = document.querySelector("template").content.cloneNode(true);
      clone.querySelector("header").textContent = task.name;

      const quantityElement = clone.querySelector(".quantity");
      quantityElement.textContent = `Quantity: ${task.quantity}`;

      const statusButton = clone.querySelector(".status-btn");
      statusButton.textContent = isDone ? "Regret" : "Done";
      statusButton.addEventListener("click", () => {
        task.done = !task.done;
        filterAndSortList();
      });

      const deleteButton = clone.querySelector(".delete-btn");
      deleteButton.addEventListener("click", () => {
        const index = task_arr.findIndex((item) => item.id === task.id);
        if (index !== -1) {
          task_arr.splice(index, 1);
          filterAndSortList();
        }
      });

      listContainer.appendChild(clone);
    });
}
