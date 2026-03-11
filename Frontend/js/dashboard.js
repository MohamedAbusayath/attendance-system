async function loadDashboard(){

    const response = await fetch("http://localhost:8080/dashboard");
    const data = await response.json();

    document.getElementById("totalSites").innerText = data.totalSites;
    document.getElementById("totalTeams").innerText = data.totalTeams;
    document.getElementById("totalEmployees").innerText = data.totalEmployees;
    document.getElementById("presentToday").innerText = data.presentToday;
    document.getElementById("absentToday").innerText = data.absentToday;

}

loadDashboard();