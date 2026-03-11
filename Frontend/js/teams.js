const TEAM_API = "http://localhost:8080/teams";
const SITE_API = "http://localhost:8080/sites";

async function loadSites(){

    const response = await fetch(SITE_API);
    const sites = await response.json();

    const dropdown = document.getElementById("siteSelect");
    dropdown.innerHTML = "<option value=\"\">-- Select Site --</option>";

    sites.forEach(site =>{

        const option = document.createElement("option");
        option.value = site.id;
        option.text = site.name;

        dropdown.appendChild(option);

    });

}

async function loadTeams(){

    const response = await fetch(TEAM_API);
    const teams = await response.json();

    const table = document.getElementById("teamTable");
    table.innerHTML = "";

    teams.forEach(team =>{

        const row = `
        <tr>
        <td>${team.id}</td>
        <td>${team.name}</td>
        <td>${team.site.name}</td>
        <td>
        <button onclick="deleteTeam(${team.id})">Delete</button>
        </td>
        </tr>
        `;

        table.innerHTML += row;

    });

}

async function addTeam(){

    const name = document.getElementById("teamName").value;
    const siteId = document.getElementById("siteSelect").value;

    await fetch(TEAM_API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            site:{id:siteId}
        })
    });

    document.getElementById("teamName").value = "";
    document.getElementById("siteSelect").value = "";

    loadTeams();

}

async function deleteTeam(id){

    await fetch(`${TEAM_API}/${id}`,{
        method:"DELETE"
    });

    loadTeams();

}

loadSites();
loadTeams();