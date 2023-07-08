import axios from "axios";
import Swal from "sweetalert2";


export async function getNotes({token, userId ,update}){
    let {data} = await axios.get(`http://localhost:5000/notes/owner/notes/${token}`
    // let {data} = await axios.get(`http://localhost:5000/notes/owner/notes/2`

    // ,{token
        // ,userId}
    );
    // console.log(data);
    update(data)

    // if(data.message == "success"){
    //     update(data.Notes)
    // }

    // if(data.message == 'no notes found'){
    //     update([])
    // }
}

export async function deleteNote({token, NoteId,userId ,update}){
    let {data} = await axios.delete(`http://localhost:5000/notes/${NoteId}/${token}`,
//     {data: { 
//         "NoteID":NoteId,
//         "token":token
//     },
// }
);
console.log(data);

getNotes({token,userId ,update});
}

export function showDeleteWarning({token, NoteId,userId ,update}){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteNote({token, NoteId,userId ,update})
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}

export async function addNote({title, content, userID, token, update}){
    let{data} = await axios.post("http://localhost:5000/notes",{
        title,
        content,
        userID,
        // token,
    });

    console.log(data);

    if(data.message == "Done"){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Note has been added',
            showConfirmButton: false,
            timer: 1500
          })

        getNotes({token, userId:userID ,update})
    }
}

export async function showAddForm({  userID, token, update }) {
    Swal.fire({
      title: "Create a New Note 📝",
      html: `
              <label for="title" class="form-label">Title</label>
              <input type="text" id="title" placeholder="Title" class="note-title swal2-input m-0 w-100 d-block"/>
              <label for="description" class="form-label">Description</label>
              <textarea type="text" id="description" placeholder="Description" class="swal2-textarea m-0 w-100 d-block"></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Add Note",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = document.getElementById("title");
        const description = document.getElementById("description");
        return { title: title.value, content: description.value };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
        console.log(result)
      if (result.isConfirmed) {
        const { title, content } = result.value;
        addNote({title, content, userID, token, update});
      }
    });
  }

export async function updateNote({title, content, NoteID, token, userId ,update}){
     let {data} = await axios.put(`http://localhost:5000/notes/${NoteID}/${token}`,
     {title, content
      , NoteID, token
    });
     console.log(data);

    //  if(data.message == "updated"){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Note has been updated',
        showConfirmButton: false,
        timer: 1500
      })
      getNotes({token, userId ,update});
    //  }
}

export function showUpdateWindow({prevData, NoteID, token, userId ,update}){
  console.log(prevData)
  Swal.fire({
    title: "Create Your Note 📝",
    html: `
            <label for="title" class="form-label">Title</label>
            <input type="text" value="${prevData.title}" id="title" placeholder="Title" class="note-title swal2-input m-0 w-100 d-block"/>
            <label for="description" class="form-label">Description</label>
            <textarea type="text" id="description" placeholder="Description" class="swal2-textarea m-0 w-100 d-block">${prevData.content} </textarea>
    `,
    showCancelButton: true,
    confirmButtonText: "Update Note",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const title = document.getElementById("title");
      const content = document.getElementById("description");
      return { title: title.value, content: content.value };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
      console.log(result)
    if (result.isConfirmed) {
      const { title, content } = result.value;
      updateNote({title, content, NoteID, token, userId ,update});
    }
  });
}