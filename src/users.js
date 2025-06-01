const apiUrl = 'http://localhost:3000/users';

async function fetchUsers() {
    const res = await fetch(apiUrl);
    const users = await res.json();
    const list = document.getElementById('userList');
    list.innerHTML = '';
    users.forEach(user => {
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        li.textContent = `Nome: ${user.name}, Idade: ${user.age}`;


        const delBtn = document.createElement('button');
        delBtn.textContent = 'Excluir';
        delBtn.onclick = () => deleteUser(user.id);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

async function addUser(name, age) {
    await fetch(apiUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, age })
    });
    fetchUsers();
}

async function deleteUser(id) {
    await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
    });
    fetchUsers();
}

document.getElementById('userForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    addUser(name, age);
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';

});

fetchUsers();
