/* eslint-disable prettier/prettier */
const loadEditPoem = () => {
    var titles = document.getElementById('edited-titles') as HTMLDivElement;
    fetch('http://localhost:3000/poems', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then((data) => {
            data.forEach(poem => {
                const cellElement = document.createElement('button') as HTMLButtonElement;
                cellElement.innerText = poem.title;
                cellElement.classList.add('title_button');
                cellElement.id = poem.id.toString();
                cellElement.style.backgroundColor = 'red';
                cellElement.addEventListener('click', displayPoem);
                titles.appendChild(cellElement);
            });
        });
};

const displayPoem = (e: Event) => {
    const t = document.getElementById('etitles') as HTMLInputElement;
    const p = document.getElementById('epoem') as HTMLInputElement;
    const subButton = document.querySelector('.editSubmit') as HTMLButtonElement;
    subButton.addEventListener('click', editPoem);
    var body;
    fetch('http://localhost:3000/poems', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then((data) => {
            data.forEach((poem) => {
                if (poem.title == (e.target as HTMLButtonElement).innerText) {
                    body = poem.body;
                    subButton.id = poem.id.toString();
                }
            });

            t.value = (e.target as HTMLButtonElement).innerText;
            t.style.color = 'red';
            p.style.color = 'red';
            t.style.height = 'fit-content';
            t.style.height = 'fit-content';
            p.style.height = 'fit-content';
            p.style.height = 'fit-content';
            p.value = body;
        });
};

async function editPoem(e: Event) {
    const apiUrl = 'http://localhost/3000/poems';
    const poemId = (e.target as HTMLButtonElement).id;
    console.log(poemId);
    const updatedPoem = {
        title: (document.getElementById('etitles') as HTMLInputElement).value,
        body: (document.getElementById('epoem') as HTMLInputElement).value,
    };

    try {
        const response = await fetch(`${apiUrl}/${poemId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPoem),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Poem updated successfully');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

window.onload = function () {
    loadEditPoem();
};
