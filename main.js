let notes= [];

function saveNote() {
    localStorage.setItem("notes", JSON.stringify(notes))
}

function loadNote(){
    const saved = localStorage.getItem("notes");
    if(saved) notes= JSON.parse(saved);
    console.log(notes);
    
}

const task_box = document.getElementById('task-box');
task_box.addEventListener("click",  (e) => {
     console.log("hello!!");
    if(!e.target.classList.contains('task-btn')&&!e.target.classList.contains('task-btn2') ) return;
    console.log("hello!!");
    
    const note = e.target.closest('.task-container');
    if(!note) return;
    let id = Number(e.target.dataset.id);
    if (e.target.classList.contains('task-btn')) {
         note.classList.toggle('done');
         console.log("hello1");
         
     for (let i = 0; i < notes.length; i++) {
        if(notes[i].id == id) {
            if(notes[i].done== true) notes[i].done= false
            else notes[i].done= true;
        }
        
    }
    }else if (e.target.classList.contains('task-btn2')) {
        notes= notes.filter(note => note.id!=id);
        console.log("hello2");
        
    } 
    saveNote();
    render();
})
function addNote() {
    let input = document.getElementById('task-input');
    let value = input.value; 
    if(value=='') {alert("La note ne peut pas etre vide"); return;}
    notes.push({
        id: Date.now(),
        content: value,
        done: false
    });
    input.value= " ";
    saveNote();
    render();
} 
function render() {
     task_box.innerHTML= '';
     for (let i = 0; i < notes.length; i++) {
        const element = notes[i];
        const new_input = document.createElement("input");
        const new_div= document.createElement("div");
        const new_btn= document.createElement("button");
        const new_btn2= document.createElement("button");
        new_btn2.textContent="X"
        new_btn.textContent='Cocher';
        new_btn.classList.add('task-btn');
        new_btn2.classList.add('task-btn2');
        new_div.classList.add('task-container');
        new_input.classList.add('task');
        new_btn.dataset.id= element.id;
        new_btn2.dataset.id= element.id;
        new_div.id= element.id;
        new_input.value = element.content;
        if(element.done == true) new_div.classList.add('done');
        new_div.appendChild(new_input);
        new_div.appendChild(new_btn);
        new_div.appendChild(new_btn2);
        task_box.appendChild(new_div);
    }
    
}

loadNote();
saveNote();
render();

