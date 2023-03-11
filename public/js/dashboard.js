// //front-end javascript handling new posts created from the user's dashboard and deleting.

//create
const newPostHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#post-title').value.trim();
    const contents = document.querySelector('#post-contents').value.trim();



  
    if (title && contents) {
      const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        
      });

    }
  };

//delete





  document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);





