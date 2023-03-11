//comment form handler.

const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const contents = document.getElementById('new-comment').value.trim();
    const post_id = window.location.pathname.split('/').pop();

    console.log(post_id); //2
    console.log(contents); //fra
    
  
    try {
      const response = await fetch('/api/comments/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            contents: contents,
            post_id: post_id
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to create new comment');
      }
  
      console.log('Fetch response:', response);
    } catch (err) {
      console.error(err);
      // handle the error here
    }
  };
document.querySelector(".new-comment-form").addEventListener('submit', newCommentHandler);