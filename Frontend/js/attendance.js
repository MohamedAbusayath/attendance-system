const SITE_API = "http://localhost:8080/sites";
const TEAM_API = "http://localhost:8080/teams";
const EMP_API = "http://localhost:8080/employees";
const ATT_API = "http://localhost:8080/attendance";

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

    // when site changes reload teams
    dropdown.addEventListener('change', loadTeams);
}

async function loadEmployees(){

    const teamId = document.getElementById("teamSelect").value;
    if (!teamId) {
        // nothing to load if no team selected
        return;
    }

    // get selected date (defaults to today)
    let date = document.getElementById('attendanceDate').value;
    if (!date) {
        date = new Date().toISOString().split("T")[0];
    }

    const response = await fetch(`${EMP_API}/team/${teamId}`);
    const employees = await response.json();

    // fetch existing attendance for that date
    const attResp = await fetch(`${ATT_API}/date/${date}`);
    const attendanceRecords = await attResp.json();

    const table = document.getElementById("attendanceTable");
    table.innerHTML = "";

    employees
    .filter(emp => emp.team && emp.team.id == teamId)
    .forEach(emp =>{

        // determine if there is a record for this employee
        const rec = attendanceRecords.find(a => a.employee && a.employee.id == emp.id);
        const checked = !rec || rec.status === "Present";

        const row = `
        <tr>
        <td>${emp.name}</td>
        <td>
        <input type="checkbox" id="emp_${emp.id}" ${checked ? 'checked' : ''}>
        </td>
        </tr>
        `;

        table.innerHTML += row;

    });

}

async function saveAttendance(){

    const employees = await fetch(EMP_API).then(res => res.json());

    // read the date from the input, or default to today
    let date = document.getElementById('attendanceDate').value;
    if (!date) {
        date = new Date().toISOString().split("T")[0];
    }

    // gather promises so we can wait for all requests to finish
    const promises = [];

    employees.forEach(emp =>{

        const checkbox = document.getElementById(`emp_${emp.id}`);

        if(!checkbox) return;

        const status = checkbox.checked ? "Present" : "Absent";

        const p = fetch(ATT_API,{ 
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                employee:{id:emp.id},
                date:date,
                status:status
            })
        });

        promises.push(p);
    });

    await Promise.all(promises);
    alert("Attendance Saved");

}

// set default date to today and reload employees when it changes
const dateInput = document.getElementById('attendanceDate');
if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
    dateInput.addEventListener('change', () => {
        if (document.getElementById('teamSelect').value) {
            loadEmployees();
        }
    });
}

loadSites();

// helper to populate team dropdown based on selected site
async function loadTeams(){
    const siteId = document.getElementById("siteSelect").value;
    const dropdown = document.getElementById("teamSelect");
    dropdown.innerHTML = "<option value=\"\">-- Select Team --</option>";
    if(!siteId) return;

    const response = await fetch(TEAM_API);
    const teams = await response.json();
    teams
        .filter(t => t.site && t.site.id == siteId)
        .forEach(team => {
            const option = document.createElement("option");
            option.value = team.id;
            option.text = team.name;
            dropdown.appendChild(option);
        });
}