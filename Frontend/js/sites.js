// base URL for API – update when backend moves
const BASE_URL = "https://attendance-system-7l6a.onrender.com";
const API_URL = `${BASE_URL}/sites`; 

async function loadSites(){

    const response = await fetch(API_URL);
    const sites = await response.json();

    const table = document.getElementById("siteTable");
    table.innerHTML = "";

    sites.forEach(site => {

        const row = `
        <tr>
            <td>${site.id}</td>
            <td>${site.name}</td>
            <td>${site.location}</td>
            <td>
                <button onclick="deleteSite(${site.id})">Delete</button>
            </td>
        </tr>
        `;

        table.innerHTML += row;

    });

}

async function addSite(){

    const name = document.getElementById("siteName").value;
    const location = document.getElementById("siteLocation").value;

    await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            location:location
        })
    });

    // clear inputs
    document.getElementById("siteName").value = "";
    document.getElementById("siteLocation").value = "";

    loadSites();

}

async function deleteSite(id){

    await fetch(`${API_URL}/${id}`,{
        method:"DELETE"
    });

    loadSites();

}

loadSites();