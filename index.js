const $wrapper = document.querySelector('[data-wrapper]');
const $addBtn = document.querySelector('[data-add_button]');
const $closeBtn = document.querySelector('[data-close_button');
const $modalAdd = document.querySelector('[data-modal]');
const $formErrorMsg = document.querySelector('[data-errmsg]');

const HIDDEN_CLASS = 'hidden';

const generateCatCard = (cat) => {
    return (
    `<div data-card_id=${cat.id} class="card">
        <img 
            src="${cat.image}" 
            class="card-img-top" 
            alt="Фото чмони"
        />
        <div class="card-body">
            <h5 class="card-title">${cat.name}</h5>
            <p class="card-text">${cat.description}</p>
            <div class = "buttonsContainer">
                <button type='button' data-action="open" class="btn-open">Open</button>
                <button type='button' data-action="edit" class="btn-edit">Edit</button>
                <button type='button' data-action="delete" class="btn-delete">Delete</button>
            </div>
        </div>
    </div>`
    )
}

// api.getAllCats()
//     .then(res => {
//         console.log({res});

//         return res.json();
//     })   
//     .then(data => {
//         console.log(data);
        
//         data.forEach(cat => {
//             $wrapper.insertAdjacentHTML('afterbegin', generateCatCard(cat))
//         });

//     })

$wrapper.addEventListener('click', async (event) => {
    const action = event.target.dataset.action;

    switch (action) {
        case 'delete':
            const $currentCard = event.target.closest('[data-card_id]');
            const catId = $currentCard.dataset.card_id;
            try {
                const res = await api.deleteCat(catId);
                const responce = await res.json();
                if (!res.ok) throw Error(response.massage)
                $currentCard.remove();
            } catch (error) {
                console.log(error);
            }
            break;
        
        case 'open':
            
            break;

        case 'edit':
            
            break;

        default:
            break;
    }
})

$addBtn.addEventListener('click', () => {
    $modalAdd.classList.remove(HIDDEN_CLASS);
})

$closeBtn.addEventListener('click', () => { // Как то начать отлавливать ошибку при закрытии ((
    $modalAdd.classList.add(HIDDEN_CLASS);
})


document.forms.add_cats_form.addEventListener('submit', async (event) => {
    $formErrorMsg.innerText = '';
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target).entries());

    data.id = Number(data.id);
    data.age = Number(data.age);
    data.rate = Number(data.rate);
    data.favorite = data.favorite ? true : false;

    const res = await api.addNewCat(data);

    if (res.ok) {
        $wrapper.replaceChildren();
        getCatsFunc();
        $modalAdd.classList.add(HIDDEN_CLASS); // убираем модалку
        return event.target.reset() // сброс формы
    } else {
        const responce = await res.json();
        $formErrorMsg.innerText = responce.massage;
        return;
    }
})

const getCatsFunc = async () => {
    const res = await api.getAllCats();

    if (res.status !== 200) {
        const $errorMassage = document.createElement('p');
        $errorMassage.classList.add('error-msg');
        $errorMassage.innerText = 'Произошла ошибка, попробуйте позже';
        return $wrapper.appendChild($errorMassage);
    }

    const data = await res.json();
    
    if (data.length === 0) {
        const $notificationMassage = document.createElement('p');
        $notificationMassage.innerText = 'Список котов пуст, добавьте нового кота';
        return  z$wrapper.appendChild($notificationMassage);
    }

    data.forEach(cat => {
        $wrapper.insertAdjacentHTML('beforeend', generateCatCard(cat))
    });
}

getCatsFunc();