// script.js

// 할 일 목록을 저장할 배열
let tasks = [];

// 페이지가 로드될 때 할 일 목록을 불러옵니다.
window.onload = function() {
    // 저장된 할 일 목록이 있는 경우 로드합니다.
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        renderTasks();
    }
};

// 할 일 목록을 렌더링하는 함수
function renderTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // 목록 초기화

    // 할 일 목록을 순회하면서 목록에 추가합니다.
    tasks.forEach(function(task, index) {
        var li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);

        // 완료된 항목에 completed 클래스를 추가합니다.
        li.addEventListener("click", function() {
            if (li.classList.contains("completed")) {
                li.classList.remove("completed");
            } else {
                li.classList.add("completed");
            }
            saveTasks();
        });

        // 우클릭으로 삭제 기능 추가
        li.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            tasks.splice(index, 1); // 배열에서 해당 할 일을 삭제합니다.
            renderTasks();
            saveTasks();
        });
    });
}

// 할 일 목록을 저장하는 함수
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 할 일을 추가하는 함수
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var task = taskInput.value.trim();
    if (task !== "") {
        tasks.push(task); // 새로운 할 일을 배열에 추가합니다.
        renderTasks(); // 할 일 목록을 다시 렌더링합니다.
        saveTasks(); // 변경된 목록을 저장합니다.
        taskInput.value = ""; // 입력 상자를 비웁니다.
    } else {
        alert("Please enter a task!");
    }
}
