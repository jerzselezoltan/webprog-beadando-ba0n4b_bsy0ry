let stations = [
            { frek: "87,6", telj: "7,6", nev: "Neo FM", hely: "Győr" },
            { frek: "87,6", telj: "0,5", nev: "Gong Rádió", hely: "Csongrád" },
            { frek: "87,6", telj: "-", nev: "Kontakt Rádió", hely: "Budapest" },
            { frek: "87,8", telj: "0,001", nev: "ZsebRádió", hely: "Halásztelek" },
            { frek: "87,8", telj: "0,0006", nev: "Remete Rádió", hely: "Pécs" },
            { frek: "87,9", telj: "0,2", nev: "Dió Rádió", hely: "Hatvan" },
            { frek: "88,1", telj: "1", nev: "Rise FM", hely: "Budapest" },
            { frek: "88,4", telj: "0,1", nev: "Sirály Rádió", hely: "Balatonfüred" },
            { frek: "89,5", telj: "68", nev: "Music FM", hely: "Budapest" },
            { frek: "94,8", telj: "78", nev: "Petőfi Rádió", hely: "Budapest" }
        ];

        
        function renderStations() {
            const tbody = document.getElementById('stationTableBody');
            tbody.innerHTML = '';
            stations.forEach((s, index) => {
                tbody.innerHTML += `
                    <tr>
                        <td><b>${s.frek} MHz</b></td>
                        <td>${s.telj} kW</td>
                        <td>${s.nev}</td>
                        <td>${s.hely}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary me-1" onclick="prepareUpdate(${index})">Szerkeszt</button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteStation(${index})">Törlés</button>
                        </td>
                    </tr>`;
            });
        }

        
        function handleSave() {
            const editIndex = document.getElementById('editIndex').value;
            const frek = document.getElementById('inputFrekvencia').value;
            const telj = document.getElementById('inputTeljesitmeny').value;
            const nev = document.getElementById('inputCsatorna').value;
            const hely = document.getElementById('inputAdohely').value;

            if (!frek || !nev || !hely) {
                alert("Kérjük, a frekvenciát, csatornát és adóhelyet töltsd ki!");
                return;
            }

            const stationData = { frek, telj: telj || "-", nev, hely };

            if (editIndex === "-1") {
                
                stations.push(stationData);
            } else {
               
                stations[editIndex] = stationData;
                resetForm();
            }

            clearInputs();
            renderStations();
        }

        
        function prepareUpdate(index) {
            const s = stations[index];
            document.getElementById('inputFrekvencia').value = s.frek;
            document.getElementById('inputTeljesitmeny').value = s.telj;
            document.getElementById('inputCsatorna').value = s.nev;
            document.getElementById('inputAdohely').value = s.hely;
            
            document.getElementById('editIndex').value = index;
            document.getElementById('saveBtn').innerText = "Mentés";
            document.getElementById('saveBtn').className = "btn btn-success w-100 fw-bold";
            document.getElementById('formTitle').innerText = "Adó Szerkesztése";
        }

        function resetForm() {
            document.getElementById('editIndex').value = "-1";
            document.getElementById('saveBtn').innerText = "Hozzáadás";
            document.getElementById('saveBtn').className = "btn btn-warning w-100 fw-bold";
            document.getElementById('formTitle').innerText = "Új Rádióadó Felvétele";
        }

        function clearInputs() {
            document.querySelectorAll('.form-control').forEach(i => i.value = '');
        }

        function deleteStation(index) {
            if(confirm("Biztosan törölni szeretnéd ezt a bejegyzést?")) {
                stations.splice(index, 1);
                renderStations();
            }
        }

        window.onload = renderStations;