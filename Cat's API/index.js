const $wrapper = document.querySelector('[data-wrapper]');

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
                <button data-action="open" class="btn-open">Open</button>
                <button data-action="edit" class="btn-edit">Edit</button>
                <button data-action="delete" class="btn-delete">Delete</button>
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

const firstGettingCats = async () => {
    const res = await api.getAllCats();
    const data = await res.json();

    data.forEach(cat => {
        $wrapper.insertAdjacentHTML('afterbegin', generateCatCard(cat))
    });
}

firstGettingCats();