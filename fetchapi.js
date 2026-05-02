const apiUrl = 'api.php';


window.onload = loadTelepulesek;

const form = document.getElementById('telepulesForm');
const messageDiv = document.getElementById('message');

async function loadTelepulesek() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        let tableHTML = "";
        data.readData.forEach(t => {
            tableHTML += `
                <tr>
                    <td>${t.nev}</td>
                    <td>${t.megye}</td>
                    <td>
                        <button class="edit" onclick='fillForm(${JSON.stringify(t)})'>Szerkesztés</button>
                        <button class="delete" onclick='deleteTelepules(${t.id})'>Törlés</button>
                    </td>
                </tr>`;
        });
        document.getElementById('telepulesTable').innerHTML = tableHTML;
    } catch (error) {
        messageDiv.innerText = "Hiba a betöltéskor!";
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('id').value;
    const nev = document.getElementById('nev').value;
    const megye = document.getElementById('megye').value;
    
    const payload = { id, nev, megye };
    const method = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(apiUrl, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        
        messageDiv.innerText = result.status;
        form.reset();
        document.getElementById('id').value = "";
        loadTelepulesek();
    } catch (error) {
        messageDiv.innerText = "Hiba a mentés során!";
    }
});

function fillForm(t) {
    document.getElementById('id').value = t.id;
    document.getElementById('nev').value = t.nev;
    document.getElementById('megye').value = t.megye;
    messageDiv.innerText = "Szerkesztés mód";
}

async function deleteTelepules(id) {
    if (!confirm("Biztosan törlöd?")) return;

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const result = await response.json();
        messageDiv.innerText = result.status;
        loadTelepulesek();
    } catch (error) {
        messageDiv.innerText = "Hiba a törléskor!";
    }
}