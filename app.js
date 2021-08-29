// default function 

const fetchData = async url =>{
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

// /////////////////////////////////////////////////
document.getElementById('error-msg').style.visibility='hidden'
document.getElementById('spin').style.visibility='hidden';
document.getElementById('search-btn').addEventListener('click', ()=>{
    const input = document.getElementById('input-field');
    const inputValue = input.value;
    input.value = '';
    
    document.getElementById('parent-container').textContent = '';
    if(inputValue == ''){
        document.getElementById('error-msg').style.visibility='visible'
    }else{
        document.getElementById('spin').style.visibility='visible'
        loadData(inputValue)
        document.getElementById('error-msg').style.visibility='hidden'
        
    }

})

const loadData = obj =>{
    fetchData(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${obj}`)
    .then(data => {
        const parent = document.getElementById('parent-container')
        data.teams.forEach(team => {
            console.log(team)
            document.getElementById('spin').style.visibility='hidden'
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div onclick="teamDetails('${team.idTeam}')"  class="card" style="width: 18rem;">
            <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
            <div class="card-body">
              <h2 class="card-title">${team.strTeam}</h2>
            </div>
            </div>
            `
            parent.appendChild(div)
        })
    })
}

const teamDetails = id => {
    fetchData(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`)
    .then(data => {
        displayDetails(data.teams[0])
    })
}

const displayDetails = obj => {
    window.scroll(0, 40)
        const teamDetail = document.getElementById('team-detail');
        teamDetail.innerHTML = `
            <div  class="container-details mx-auto p-5">
            <h2>Name : ${obj.strTeam}</h2>
            <h3>Alternative Name : ${obj.intFormedYear}</h3>
            <h2>Made : ${obj.intFormedYear}</h2>
            <h3>Description : ${obj.strDescriptionEN.slice(0, 200)}</h3>
            </div>
            
        `
}

