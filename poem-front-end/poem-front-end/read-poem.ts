/* eslint-disable prettier/prettier */
const loadPoemOnRead = async (): Promise<void> => {
    try {
        const response = await fetch('http://localhost:3000/poems', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Handle specific error cases
            if (response.status === 401) {
                console.error('Unauthorized: Token might be invalid or expired.');
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }

        const data = await response.json();

        data.forEach((poem: { title: string }) => {
            console.log(poem.title);
            const cellElement = document.createElement('button');
            cellElement.innerText = poem.title;
            cellElement.classList.add('title_button');
            cellElement.id = poem.title;
            cellElement.addEventListener('click', trying);
            document.querySelector('#t')?.appendChild(cellElement);
        });
    } catch (error) {
        console.error('Error:', (error as Error).message);
    }
};

function trying(e: Event): void {
    const target = e.target as HTMLButtonElement;
    document.querySelector('#title_intro')!.innerHTML = target.id;
    let readPoem: HTMLElement | null;
    let body: string | undefined;

    fetch('http://localhost:3000/poems', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then((data: { title: string; body: string }[]) => {
            data.forEach((poem) => {
                if (poem.title === target.id) {
                    body = poem.body;
                }
            });

            readPoem = document.querySelector('.real_poem');
            if (readPoem) {
                readPoem.innerText = body || '';
            }
        });
}

window.onload = function (): void {
    loadPoemOnRead();
};
