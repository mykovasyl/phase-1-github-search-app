document.addEventListener('DOMContentLoaded', () => {

  const searchForm = document.querySelector('#github-form')
  const userContainer = document.querySelector('#user-list')
  const repoContainer = document.querySelector('#repos-list')
  let users = [];
  let repos = [];

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = e.target.elements.search.value;

    if (!userName) {
      alert('Please enter valid username')
      return
    }

    fetch(`https://api.github.com/search/users?q=${userName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify()
    })//fetch ends
      .then(resp => resp.json())
      .then(data => {
        users = data.items
        return renderAllUsers(users)
        //console.log(users)
      })

    function renderAllUsers(users) {
      return userContainer.innerHTML = users.map(renderUser).join('')
    }

    function renderUser(user) {
      return `
        <li>
        <p id="user-name">${user.login}</p>
        <img src='${user.avatar_url}'><br>
        <a href='${user.html_url}'>GitHub Profile</a>
        </li>
      `
    }
  })//search form ends

  document.addEventListener('click', (e) => {
    if(e.target.id === "user-name") {
      fetch(`https://api.github.com/users/${e.target.textContent}/repos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify()
      })//fetch ends
      .then(resp => resp.json())
      .then(data => {
        repos = data
        renderRepos(repos)
      })

      function renderRepos(repos) {
        return repoContainer.innerHTML = repos.map(renderRepo).join('')
      }

      function renderRepo(repo) {
        return `
          <li>
            <p id='repo-name'>${repo.name}</p>
            <a href='${repo.html_url}'>Repo Link</a>
            <br>
          </li>
        `
      }
    }
  })//click event ends

});//code ends