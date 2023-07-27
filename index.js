const readline = require("readline-sync");
const fs = require("fs");

// Function to clear the terminal screen
function clearScreen() {
  console.clear();
}

// Function to display the menu options and get user choice
function displayMenu() {
  console.log(
    "\x1b[36m============================ To-Do List ============================\x1b[0m"
  );
  console.log("\x1b[33m1. Add Task\x1b[0m");
  console.log("\x1b[34m2. View List\x1b[0m");
  console.log("\x1b[35m3. Edit Task\x1b[0m");
  console.log("\x1b[31m4. Remove Task\x1b[0m");
  console.log("\x1b[32m5. Mark Completed Task\x1b[0m");
  console.log("\x1b[33m6. Search\x1b[0m");
  console.log("\x1b[32m7. Exit\x1b[0m");
  return readline.question("Enter your choice: ");
}

// Function to add a new task to the to-do list
function addTask() {
  console.log(
    "\x1b[36m\n============================ To-Do List ============================\x1b[0m"
  );
  const newItem = readline.question("\x1b[34mEnter a new task: \x1b[0m");
  toDoList.push(newItem);
  console.log("\x1b[32mTask added successfully!\x1b[0m");
  saveTasksToFile();
}

// Function to view the current tasks in the to-do list
function viewList() {
  if (toDoList.length === 0) {
    console.log("\x1b[33mYour to-do list is empty.\x1b[0m");
  } else {
    console.log(
      "\x1b[36m========================== To-Do List ==========================\x1b[0m"
    );
    for (let i = 0; i < toDoList.length; i++) {
      console.log(`\x1b[34m│ ${i + 1}. \x1b[0m${toDoList[i]}`);
    }
    console.log(
      "\x1b[36m===============================================================\x1b[0m"
    );
  }
}

// Function to edit a task in the to-do list
function editTask() {
  const taskIndex = parseInt(
    readline.question("\x1b[35mEnter the task number to edit: \x1b[0m"),
    10
  );
  if (taskIndex >= 1 && taskIndex <= toDoList.length) {
    const updatedTask = readline.question(
      `\x1b[35mEnter the updated task for task ${taskIndex}: \x1b[0m`
    );
    toDoList[taskIndex - 1] = updatedTask;
    console.log("\x1b[32mTask updated successfully!\x1b[0m");
  } else {
    console.log("\x1b[31mInvalid task number. Please try again.\x1b[0m");
  }
  saveTasksToFile();
}

// Function to remove a task from the to-do list
function removeTask() {
  const taskIndex = parseInt(
    readline.question("\x1b[31mEnter the task number to remove: \x1b[0m"),
    10
  );
  if (taskIndex >= 1 && taskIndex <= toDoList.length) {
    toDoList.splice(taskIndex - 1, 1);
    console.log("\x1b[32mTask removed successfully!\x1b[0m");
  } else {
    console.log("\x1b[31mInvalid task number. Please try again.\x1b[0m");
  }
  saveTasksToFile();
}

// Function to mark a task as completed
function markCompletedTask() {
  const taskIndex = parseInt(
    readline.question(
      "\x1b[34mEnter the task number to mark as completed: \x1b[0m"
    ),
    10
  );
  if (taskIndex >= 1 && taskIndex <= toDoList.length) {
    const completedTask = toDoList[taskIndex - 1];
    if (!completedTask.startsWith("[X] ")) {
      toDoList[taskIndex - 1] = "[X] " + completedTask;
      console.log("\x1b[32mTask marked as completed!\x1b[0m");
    } else {
      console.log("\x1b[33mThis task is already marked as completed.\x1b[0m");
    }
  } else {
    console.log("\x1b[31mInvalid task number. Please try again.\x1b[0m");
  }
  saveTasksToFile();
}

// Function to search for tasks based on keyword
function searchTasks() {
  const keyword = readline.question(
    "\x1b[34mEnter a keyword to search tasks: \x1b[0m"
  );
  const matchingTasks = toDoList.filter((task) =>
    task.toLowerCase().includes(keyword.toLowerCase())
  );

  if (matchingTasks.length === 0) {
    console.log("\x1b[33mNo tasks found with the specified keyword.\x1b[0m");
  } else {
    console.log(
      "\x1b[36m========================== Matching Tasks ==========================\x1b[0m"
    );
    for (let i = 0; i < matchingTasks.length; i++) {
      console.log(`\x1b[34m│ ${i + 1}. \x1b[0m${matchingTasks[i]}`);
    }
    console.log(
      "\x1b[36m=================================================================\x1b[0m"
    );
  }
}

// Function to load tasks from the JSON file
function loadTasksFromFile() {
  try {
    const data = fs.readFileSync("tasks.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // Return an empty array if the file doesn't exist or is empty
    return [];
  }
}

// Main app logic
const toDoList = loadTasksFromFile();

let isRunning = true;

while (isRunning) {
  clearScreen();
  const choice = displayMenu();

  switch (choice) {
    case "1":
      addTask();
      break;
    case "2":
      viewList();
      break;
    case "3":
      editTask();
      break;
    case "4":
      removeTask();
      break;
    case "5":
      markCompletedTask();
      break;
    case "6":
      searchTasks();
      break;
    case "7":
      isRunning = false;
      break;
    default:
      console.log("\x1b[31mInvalid choice. Please try again.\x1b[0m");
  }

  if (isRunning) {
    readline.question("\x1b[36mPress Enter to continue...\x1b[0m");
  }
}

// Function to save tasks to the JSON file
function saveTasksToFile() {
  const data = JSON.stringify(toDoList, null, 2);
  fs.writeFileSync("tasks.json", data, "utf-8");
}

console.log("\x1b[36mThank you for using the To-Do List app!\x1b[0m");
