# To-Do List App

The To-Do list app is a simple terminal-based application written in JavaScript that allows users to manage their to-do tasks efficiently. Users can add, view, edit, remove, mark completed tasks, and search for tasks using keywords.

## Features

 - Add new tasks to the to-do list.
 - View the current list of tasks with optional task numbers.
 - Edit existing tasks to update their content.
 - Remove tasks from the list.
 - Mark tasks as completed to track completed tasks.
 - Search for tasks based on keywords to find specific tasks quickly.

## How to Use
 - You can either download the windows executable from the **Releases** page or follow the steps below:

 1. Make sure you have Node.js installed in your system.
 2. Clone or download this repository.
 3. Open a terminal in the project directory.
 4. Install the required dependencies using the following command:

 	```bash
 	npm install
 	```
 5. Run the To-Do List app using the following command:
 ```bash
node index.js
 ```
 6. Follow the on-screen meny to perform various actions on your to-do list.

## Data Persistence

 The to-do list data is saved in a JSON file named `tasks.json`. The data is loaded from this file at the beginning of each session and saved back to it whenever you add, edit, or remove tasks.

## Contributing

 Contributions to this project are welcome! If you find any bugs, have new feature ideas, or want to improve the existing code, feel free to open an issue or submit a pull request.