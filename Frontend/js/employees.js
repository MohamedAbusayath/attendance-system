const EMP_API = "http://localhost:8080/employees";
const TEAM_API = "http://localhost:8080/teams";

async function loadTeams(){

    const response = await fetch(TEAM_API);
    const teams = await response.json();

    const dropdown = document.getElementById("teamSelect");
    dropdown.innerHTML = "<option value=\"\">-- Select Team --</option>";

    teams.forEach(team =>{

        const option = document.createElement("option");
        option.value = team.id;
        option.text = team.name;

        dropdown.appendChild(option);

    });

}

async function loadEmployees(){

    const response = await fetch(EMP_API);
    const employees = await response.json();

    const table = document.getElementById("employeeTable");
    table.innerHTML = "";

    employees.forEach(emp =>{

        const row = `
        <tr>
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.phone}</td>
        <td>${emp.role}</td>
        <td>${emp.team.name}</td>
        <td>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
        </td>
        </tr>
        `;

        table.innerHTML += row;

    });

}

async function addEmployee(){

    const name = document.getElementById("empName").value;
    const phone = document.getElementById("empPhone").value;
    const role = document.getElementById("empRole").value;
    const teamId = document.getElementById("teamSelect").value;

    await fetch(EMP_API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            phone:phone,
            role:role,
            team:{id:teamId}
        })
    });

    document.getElementById("empName").value = "";
    document.getElementById("empPhone").value = "";
    document.getElementById("empRole").value = "";
    document.getElementById("teamSelect").value = "";

    loadEmployees();

}

async function deleteEmployee(id){

    await fetch(`${EMP_API}/${id}`,{
        method:"DELETE"
    });

    loadEmployees();

}
async function loadEmployees(teamId) {

  const res = await fetch(`http://localhost:8080/employees/team/${teamId}`);

  if(!res.ok){
    console.error("API error:", res.status);
    return;
  }

  const employees = await res.json();

  if(!Array.isArray(employees)){
    console.error("Employees is not an array", employees);
    return;
  }

  employees.forEach(emp => {
      console.log(emp.name);
  });
}
loadTeams();
loadEmployees();