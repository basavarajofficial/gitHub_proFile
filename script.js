const APIURL='https://api.github.com/users/';
const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');

async function getuser(username){
    try{
        const {data}= await axios(APIURL + username);
        createusercard(data);
        getrepos(username);
    }
    catch(err){ 
       if(err.response.status==404){
        createrErrorcard("Sorry, No User Found")
       }
    }
}

async function getrepos(username){
    try{
        const {data}= await axios(APIURL+username+'/repos?sorted=created');
        addrepostocard(data);
    } catch(err){
        createrErrorcard('Problem fetching repos')
    }
}
function createusercard(user){
    const cardHTML=` <div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar" >
        
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <p>${user.location}</p>
        <ul>
            <li>${user.followers}<strong> Followers</strong></li>
            <li>${user.following}<strong> Following</strong></li>
            <li>${user.public_repos}<strong> Repositories</strong></li>
        </ul> 
        <div id="repos">
            
        </div>
    </div>
</div> `
main.innerHTML=cardHTML;
}
function createrErrorcard(msg){
    const cardHTML=`
    <div class="card">
    <h2 class="err-msg">${msg}</h2></div> `
    main.innerHTML=cardHTML
}
function addrepostocard(repos){
    const reposEL=document.getElementById("repos");
    repos.slice(0,5).forEach((repo)=>{
        const repoEL=document.createElement("a");
        repoEL.classList.add('repo');
        repoEL.href=repo.html_url;
        repoEL.target="_blank";
        repoEL.innerHTML=repo.name;
        reposEL.appendChild(repoEL);
    })
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const user=search.value;
    if(user){
        getuser(user);
        search.value='';
    }
})
