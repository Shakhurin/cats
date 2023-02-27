const dbName = 'karma1703';


const $wrapper = document.querySelector('.container')

const generateCatCard = (cat) => {
    return (
    `<div class="card">
        <img 
            src="${cat.image}" 
            class="card-img-top" 
            alt="Фото чмони"
        />
        <div class="card-body">
            <h5 class="card-title">${cat.name}</h5>
            <p class="card-text">${cat.description}</p>
            <div class = "buttonsContainer">
                <button class="btn-open">Open</button>
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Delete</button>
            </div>
        </div>
    </div>`
    )
}

api.getAllCats()
    .then(res => {
        console.log({res});

        return res.json();
    })   
    .then(data => {
        console.log(data);
        
        data.forEach(cat => {
            $wrapper.insertAdjacentHTML('afterbegin', generateCatCard(cat))
        });

    })

