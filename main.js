// 유저가 값(할 일)을 입력한다
// + 버튼을 클릭하면, 값이 추가된다
// delete버튼을 누르면 값이 삭제된다
// check버튼을 누르면 값이 끝나면서 밑줄이 그어진다
// 1. check버튼을 클릭하는 순간 true false
// 2. true면 끝난걸로 간주하고 밑줄 보여주기
// 3. false면 안 끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝난탭은 끝난 값만, 진행중탭은 진행중인 값만 보여진다
// 전체탭을 누르면 다시 전체값을 보여준다


let taskInput = document.getElementById("task-input");
console.log(taskInput)

let addButton = document.getElementById("add-button");
addButton.addEventListener("click", addTask);

let tabs = document.querySelectorAll(".task-tabs div")
console.log(tabs);
for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
    
}

let taskList = [];

let mode = "all";
let filterList = [];

function addTask() {
    console.log("click")

    let task = {
        id : randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList);

    render();
}

function render() {
    // 1. 내가 선택한 탭에 따라서 
    let list = []
    if(mode === 'all') {
    //  all -> taskList
    list = taskList;
    } else if (mode === 'ing') {
    //  ing, done -> filterList
    list = filterList;
    } 
    // 2. 리스트를 다르게 보여준다



    let resultHTML = '';
    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task"></div>
            <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">
                        Check <i class="fa-solid fa-check"></i>
                    </button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
           </div>`;
        } else {
            resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
            </div>`;
            }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    console.log("click : check")
    console.log("id : ", id)
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList)
}

function deleteTask(id) {
    console.log("삭제", id)
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
    console.log(taskList)
}


function filter(event) {
    console.log("filter", event.target.id);
    //let mode = event.target.id
    //let filterList = []

    if(mode == "all") {
        //전체 리스트를 보여준다
        render()

    } else if(mode == "ing") {
        //진행중인 아이템을 보여준다
        // task.isComplete = false
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i])
                
            }
        }
        render();
        console.log("진행중", filterList)

    } else if(mode == "done") {
        //끝난 값
        // task.isComplete = true
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i])
            }
        }
        render();
        
    }
}


function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
