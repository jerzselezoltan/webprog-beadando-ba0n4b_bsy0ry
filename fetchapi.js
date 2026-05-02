const apiUrl = 'api.php';

async function loadTelepulesek() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    let tableHTML = "";
    data.readData.forEach(t => {
        tableHTML += `
            <tr>
                <td>${t.nev}</td>
                <td>${t.megye}</td>
                <td>
                    <button class="nav-link" style="border:none; background:none; display:inline;" 
                        onclick='fillForm("${t.nev}", "${t.megye}")'>Szerkesztés</button>
                    <button class="nav-link" style="border:none; background:none; display:inline; color:red !important;" 
                        onclick='deleteTelepules("${t.nev}")'>Törlés</button>
                </td>
            </tr>`;
    });
    document.getElementById('telepulesTable').innerHTML = tableHTML;
}

document.getElementById('telepulesForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const oldName = document.getElementById('id').value; // Az "id" hidden mezőben tároljuk a szerkesztendő nevet
    const newName = document.getElementById('nev').value;
    const megye = document.getElementById('megye').value;

    const payload = {
        oldNev: oldName,
        nev: newName,
        megye: megye
    };

    const method = (oldName && oldName !== "") ? 'PUT' : 'POST';

    const response = await fetch(apiUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const result = await response.json();
    alert(result.status);
    
    document.getElementById('id').value = ""; 
    document.getElementById('form-title').innerText = "Új település rögzítése";
    e.target.reset();
    loadTelepulesek();
});

async function deleteTelepules(nev) {
    if (!confirm(`Biztosan törölni akarod: ${nev}?`)) return;

    const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev: nev }) 
    });
    const result = await response.json();
    alert(result.status);
    loadTelepulesek();
}

function fillForm(nev, megye) {
    document.getElementById('id').value = nev;
    document.getElementById('nev').value = nev;
    document.getElementById('megye').value = megye;
    document.getElementById('form-title').innerText = "Település szerkesztése";
    window.scrollTo(0,0);
}

window.onload = loadTelepulesek;