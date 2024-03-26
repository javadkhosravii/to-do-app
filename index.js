// params
let tasks_list = [];
let text_input = document.getElementById('text-input')
let add_btn = document.getElementById('add-btn')
let delete_all_btn = document.getElementById('dlt-all-btn')
let cards = document.getElementById('cards')

// consts
const TASKS_KEY = 'tasks'

//events
add_btn.addEventListener('click', function () {
   addTask()
})

text_input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13)  {
    //    13 is a code for enter button
        addTask()
    }
})

delete_all_btn.addEventListener('click', () => {
    if (confirm('میخواهید تسک ها را پاک کنید؟')) {
        tasks_list = []
        saveTasks()
        renderCards()
    }
})

//application
tasks_list = getTasks()
console.log(tasks_list);
renderCards()



// functions
// from local storage
function saveTasks() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks_list))
}

function getTasks() {
    const tasks_string = localStorage.getItem(TASKS_KEY)
    console.log(tasks_string);

    if (tasks_string == null)
        return []

    return JSON.parse(tasks_string)
}

// add new task
function addTask () {
    console.log('click');
    let text = text_input.value
    console.log(text);
    if (!text)  //means text is empty
        return alert('متن را وارد نکرده اید')

    let task = {
        text: text,
        done: false
    }
    text_input.value = ''
    tasks_list.unshift(task)
    saveTasks()
    renderCards()
}

// render tasks cards for making HTML
function renderCards() {
    cards.innerHTML = ''
    if (tasks_list.length) {
        tasks_list.forEach((task, index) => {
            let card = document.createElement('div')
            // card
            card.classList.add('card')
            if (task.done)
                card.classList.add('done')
            // checkbox
            let checkbox = document.createElement('input')
            checkbox.setAttribute('type', "checkbox")
            if (task.done)
                checkbox.setAttribute('checked', true)
            card.append(checkbox)
            checkbox.addEventListener('change', (event) => {
                tasks_list[index].done = !tasks_list[index].done
                saveTasks()
                renderCards()
            })
            // p tag
            let text = document.createElement('p')
            text.textContent = task.text
            card.append(text)
            // btn
            let btn = document.createElement('button')
            btn.classList.add('btn')
            btn.innerHTML = [
                '<img src="/icon/delete.svg" alt="">',
                '<span>حذف</span>'
            ].join('')
            btn.addEventListener('click', () => {
                if (confirm('میخواهید تسک را حذف کنید؟')) {
                    tasks_list.splice(index, 1)
                    saveTasks()
                    renderCards()
                }

            })
            card.append(btn)
            cards.append(card)
        })
    }
}



