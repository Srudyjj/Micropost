import { http } from "./http";
import { ui } from "./ui";

document.addEventListener("DOMContentLoaded", getPosts);

document.querySelector(".post-submit").addEventListener("click", submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
  http.get('https://my-json-server.typicode.com/Srudyjj/MicropostApi/posts/')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err))
};

function submitPost(e) {  
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  if (title !== "" && body !== "") {
    const data = {
      id,
      title,
      body
    }

    if (id === '') {
      http.post('https://my-json-server.typicode.com/Srudyjj/MicropostApi/posts/', data)
      .then(data => {
        
        
        ui.showAlert("Post updated", "alert alert-success");
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err))
    } else {
      http.put(`https://my-json-server.typicode.com/Srudyjj/MicropostApi/posts/${id}`, data)
      .then(data => {
        
        ui.showAlert("Post added", "alert alert-success");
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err))
    }
  
    
  } else {
    ui.showAlert("Nothing added", "alert alert-danger");
  }

  e.preventDefault();
};

function deletePost(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`https://my-json-server.typicode.com/Srudyjj/MicropostApi/posts/${id}`)
        .then(data => {
          
          ui.showAlert('Post removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    const data = {
      id,
      title,
      body
    }

    ui.fillForm(data);
    ui.scrollToTop(400);
  } 
  e.preventDefault();
}

function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}