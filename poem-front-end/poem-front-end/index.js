/* eslint-disable prettier/prettier */
const token = localStorage.getItem('token');




  const postPoem = () => {
    const titl = document.getElementById('poem-title')
    const tV = titl.value;
    const bod = document.getElementById('poem')
    const bodyVal = bod.value;
    fetch('http://localhost:3000/poems', {
        method : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
    body: JSON.stringify({
        "title" : tV,
        "body" : bodyVal
    }),
  })
        .then(res => {
            if (!res.ok){
                throw new Error('Error')
            }
            
            return res.json()
        })
        .then(data => {
            console.log(data)
            alert(`${tV} is successfully sadded`)
        })
        .catch(error =>{
            console.log(error)
        })
  }

  function trying(e){
    document.querySelector('#title_intro').innerText = e.target.id
    var readPoem;
    var body;
    fetch('http://localhost:3000/poems', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((data) => {
        data.forEach((poem) => {
          if (poem.title == e.target.id){
            body = poem.body;
          }
        })
        readPoem = document.querySelector('.real_poem')
       readPoem.innerText = body
      }
      );


}




function deletePoem(e){
  resourceUrl = `http://localhost/3000/${e.target.id}`
  fetch(resourceUrl, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log('Resource deleted successfully');
})
 .catch(error => {
    console.error('Error:', error.message);
 });

 loadPoemOnDelete();
}



const loadEditPoem = () => {
  var titles = document.getElementById('edited-titles')
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
        const cellElement = document.createElement('button')
        cellElement.innerText = poem.title
        cellElement.classList.add('title_button')
        cellElement.id = poem.id
        cellElement.addEventListener('click', displayPoem);
        titles.appendChild(cellElement)
      });

    });
};

const displayPoem = (e) => {
   const t = document.getElementById('etitles')
   const p =  document.getElementById('epoem')
   const subButton = document.querySelector('.editSubmit')
   subButton.addEventListener('click' , editPoem)
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
          if (poem.title == e.target.innerText){
            body = poem.body;
            subButton.id = poem.id
          }
        })

        t.value = e.target.innerText
        p.value = body 
      }
      );

}

async function editPoem() {
  const apiUrl = 'http://localhost/3000/poems/';
  const poemId = '';
  const updatedPoem = {
      title: document.getElementById('etitles').value,
      body: document.getElementById('epoem').value,
  };

  try {
      const response = await fetch(`${apiUrl}/${poemId}`, {
          method: 'PUT',
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



  
 


  