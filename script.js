// Function to load the checklist state from localStorage
function loadChecklistState() {
    const crossedItems = JSON.parse(localStorage.getItem('crossedItems')) || [];
    document.querySelectorAll('li').forEach(item => {
        if (crossedItems.includes(item.textContent.trim())) {
            item.classList.add('crossed');
        }
    });
}

// Function to save the checklist state to localStorage
function saveChecklistState() {
    const crossedItems = [];
    document.querySelectorAll('li.crossed').forEach(item => {
        crossedItems.push(item.textContent.trim());
    });
    localStorage.setItem('crossedItems', JSON.stringify(crossedItems));
}

// Function to toggle the 'crossed' class on click
document.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('crossed');
        saveChecklistState();
    }
});

// Function to uncheck all items
function uncheckAll() {
    document.querySelectorAll('li.crossed').forEach(item => {
        item.classList.remove('crossed');
    });
    saveChecklistState();
}

// Add event listener for the "Uncheck All" button
document.getElementById('uncheck-all').addEventListener('click', uncheckAll);

// Function to add a new item to a category
function addNewItem(event) {
    const button = event.target;
    const targetId = button.getAttribute('data-target');
    const inputId = `${targetId}-input`;
    const input = document.getElementById(inputId);
    const newItemText = input.value.trim();

    if (newItemText !== "") {
        const ul = document.getElementById(targetId);
        const newLi = document.createElement('li');
        newLi.textContent = newItemText;
        
        // Create and append a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-item';
        newLi.appendChild(removeButton);
        
        ul.appendChild(newLi);
        input.value = ""; // Clear the input field
        saveChecklistState(); // Save state if needed
    }
}

// Event delegation for removing items
document.addEventListener('click', event => {
    if (event.target.classList.contains('remove-item')) {
        const li = event.target.parentElement;
        li.remove();
        saveChecklistState(); // Save the updated state
    }
});

// Add event listeners to the add-item buttons
document.querySelectorAll('.add-item').forEach(button => {
    button.addEventListener('click', addNewItem);
});

// Load the checklist state on page load
window.addEventListener('DOMContentLoaded', loadChecklistState);