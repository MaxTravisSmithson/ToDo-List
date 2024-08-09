import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

interface ToDo {
    id: number,
    name: string,
    description?: string,
    completed: Boolean
}

let todos: ToDo[] = [];
let latestID = 1;
function addToDo() {
    rl.question("Enter a new task: " , (name: string) => {
        const newToDo: ToDo = {
            id: latestID,
            name: name,
            description: "This task doesn't have a description.",
            completed: false
        };
        todos.push(newToDo);
        console.log("task added: " , newToDo);
        rl.question("Enter Y to add a description or anything else to skip this step: " , (answer: string) => {
            if (answer.toLowerCase() === "y"){
                    addDescription(name, latestID);
            }
            else {
                latestID++;
                promptUser();
            }
        })
    })
}

function addDescription(name: string, id: number) {
    rl.question("Enter your description: " , (description: string) => {
        const newToDo = {
            id: id,
            name: name,
            description: description,
            completed: false
        }
        todos.pop()
        todos.push(newToDo);
        console.log("description added: " , newToDo);
        latestID++;
        promptUser();
    })
}

function completeToDo() {
    rl.question("Enter the id of the ToDo you would like to mark as completed: " , (searchID: string) => {
        var targetID: number = +searchID
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === targetID){
                todos[i].completed = true;
                console.log("Done! " , todos[i]);
                promptUser();
            }
        }
        promptUser();
    }
)}

function viewToDos() {
    sortCompleted();
    if (sortCompleted().length < 1){
        console.log("No tasks to show you!");
        promptUser();
    } else{
        console.log("Your ToDos: " , sortCompleted());
        promptUser();
    }
}

function sortCompleted() {
    const completedTrue: ToDo[] = [];
    const completedFalse: ToDo[] = [];
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed === true){
            completedTrue.push(todos[i]);
        }else{
            completedFalse.push(todos[i]);
        }
    }
    return(completedFalse);
}

function exitProgram() {
    rl.close();
    console.log("BYE!");
}

function info() {
    console.log("This is a basic ToDo list built in the terminal where tasks can be added and can be removed by stting complete to true using the complete command.")
    promptUser();
}

function promptUser() {
    rl.question("What would you like to do? (add, complete, view, exit): " , (command: string) => {
        if (command === 'add') {
            addToDo();
        } else if (command === 'complete') {
            completeToDo();
        } else if (command === 'view') {
            viewToDos();
        } else if (command === 'exit') {
            exitProgram();
        } else if (command === 'info') {
            info();
        }else {
            console.log('Unknown command. Please try again.');
            promptUser();
        }
    })
}

promptUser();