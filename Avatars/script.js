async function fetchData() {
  try {
    const response = await fetch('https://reqres.in/api/users');
    const data = await response.json();
    const users = data.data;
    const table = document.getElementById('userTable');

    users.forEach(user => {
      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      idCell.textContent = user.id;
      row.appendChild(idCell);

      const emailCell = document.createElement('td');
      emailCell.textContent = user.email;
      row.appendChild(emailCell);

      const firstNameCell = document.createElement('td');
      firstNameCell.textContent = user.first_name;
      row.appendChild(firstNameCell);

      const lastNameCell = document.createElement('td');
      lastNameCell.textContent = user.last_name;
      row.appendChild(lastNameCell);

      const avatarCell = document.createElement('td');
      const avatarImage = document.createElement('img');
      avatarImage.src = user.avatar;
      avatarCell.appendChild(avatarImage);
      row.appendChild(avatarCell);

      table.appendChild(row);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

const button = document.getElementById('btn'); 
button.addEventListener('click', fetchData);