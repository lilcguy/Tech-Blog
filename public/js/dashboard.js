// //front-end javascript handling new posts created from the user's dashboard and deleting.

const newPostHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#post-title').value.trim();
    const contents = document.querySelector('#post-contents').value.trim();



  
    if (title && contents) {
      const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: {
          'Content-Type': 'application/json'
        },
        
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post.');
      }
    }
  };
  
  document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);



