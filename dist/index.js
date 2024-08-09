"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let todos = [];
let latestID = 1;
function addToDo() {
    rl.question("Enter a new task: ", (name) => {
        const newToDo = {
            id: latestID,
            name: name,
            description: "This task doesn't have a description.",
            completed: false
        };
        todos.push(newToDo);
        console.log("task added: ", newToDo);
        rl.question("Enter Y to add a description or anything else to skip this step: ", (answer) => {
            if (answer.toLowerCase() === "y") {
                addDescription(name, latestID);
            }
            else {
                latestID++;
                promptUser();
            }
        });
    });
}
function addDescription(name, id) {
    rl.question("Enter your description: ", (description) => {
        const newToDo = {
            id: id,
            name: name,
            description: description,
            completed: false
        };
        todos.pop();
        todos.push(newToDo);
        console.log("description added: ", newToDo);
        latestID++;
        promptUser();
    });
}
function completeToDo() {
    rl.question("Enter the id of the ToDo you would like to mark as completed: ", (searchID) => {
        var targetID = +searchID;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === targetID) {
                todos[i].completed = true;
                console.log("Done! ", todos[i]);
                promptUser();
            }
        }
        promptUser();
    });
}
function viewToDos() {
    sortCompleted();
    if (sortCompleted().length < 1) {
        console.log("No tasks to show you!");
        promptUser();
    }
    else {
        console.log("Your ToDos: ", sortCompleted());
        promptUser();
    }
}
function sortCompleted() {
    const completedTrue = [];
    const completedFalse = [];
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed === true) {
            completedTrue.push(todos[i]);
        }
        else {
            completedFalse.push(todos[i]);
        }
    }
    return (completedFalse);
}
function exitProgram() {
    rl.close();
    console.log("BYE!");
}
function info() {
    console.log("This is a basic ToDo list built in the terminal where tasks can be added and can be removed by stting complete to true using the complete command.");
    promptUser();
}
function promptUser() {
    rl.question("What would you like to do? (add, complete, view, exit): ", (command) => {
        if (command === 'add') {
            addToDo();
        }
        else if (command === 'complete') {
            completeToDo();
        }
        else if (command === 'view') {
            viewToDos();
        }
        else if (command === 'exit') {
            exitProgram();
        }
        else if (command === 'info') {
            info();
        }
        else {
            console.log('Unknown command. Please try again.');
            promptUser();
        }
    });
}
promptUser();
