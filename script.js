const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// Function to save notes in localstorage
const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea"); // Selects textarea under the note class
  const data = []; // Empty array for storing notes
  notes.forEach((note) => {
    // Push value of every textarea into the data array
    data.push(note.value);
  });
  // console.log(data)
  if (data.length === 0) {
    // If data is empty, remove localstorage completely, i.e., make it null
    localStorage.removeItem("notes");
  } else {
    // Store notes in localstorage
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

// Function to add notes on frontend dynamically
const addNote = (text = "") => {
  // Create a div with class  of 'note'
  const note = document.createElement("div");
  note.classList.add("note");
  // Add innerHTML to the 'note' div
  note.innerHTML = `
    <div class="tool">
      <i class="save fas fa-save"></i>
      <i class="delete fas fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
  `;

  note.querySelector(".delete").addEventListener("click", () => {
    // Delete note from frontend
    note.remove();
    // Call saveNotes to delete note from localstorage
    saveNotes();
  });

  note.querySelector(".save").addEventListener("click", () => {
    // Save Note
    saveNotes();
  });

  note.querySelector("textarea").addEventListener("focusout", () => {
    // Whenever user clicks outside of textarea the note is saved automatically
    saveNotes();
  });

  main.appendChild(note); // Append note
  saveNotes(); // Save
};

addBtn.addEventListener("click", () => {
  // Add a note when clicked on 'add note' button
  addNote();
});

// IIFE Function
(() => {
  // Get note from localstorage
  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  // console.log(storedNotes);
  if (storedNotes === null) {
    // If there's notes is null, then add an empty 'note' div by default
    addNote();
  } else {
    // Fetch notes from localstorage and add it on the frontend
    storedNotes.forEach((note) => {
      addNote(note);
    });
  }
})();
