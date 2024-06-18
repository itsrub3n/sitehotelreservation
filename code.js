document.addEventListener("DOMContentLoaded", function() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('arrivee').setAttribute('min', today);
});

function validateDates() {
    var arrivee = document.getElementById('arrivee').value;
    var depart = document.getElementById('depart').value;

    if (arrivee) {
        document.getElementById('depart').setAttribute('min', arrivee);
    }

    if (arrivee && depart && arrivee > depart) {
        document.getElementById('depart').value = arrivee;
    }
}

function increase(inputId) {
    var input = document.getElementById(inputId);
    input.value = parseInt(input.value) + 1;
    if (inputId === 'enfant') {
        addChildAgeInput();
    }
}

function decrease(inputId) {
    var input = document.getElementById(inputId);
    if (parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - 1;
        if (inputId === 'enfant') {
            removeChildAgeInput();
        }
    }
}

function addChildAgeInput() {
    var container = document.getElementById('enfant-age-container');
    var numChildren = parseInt(document.getElementById('enfant').value);
    var div = document.createElement('div');
    div.setAttribute('id', 'enfant-age-' + numChildren);
    var label = document.createElement('label');
    label.setAttribute('for', 'age-' + numChildren);
    label.textContent = 'Âge de l\'enfant ' + numChildren + ' :';
    var input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'age-' + numChildren);
    input.setAttribute('name', 'age-' + numChildren);
    input.setAttribute('min', '0');
    input.setAttribute('max', '18');
    div.appendChild(label);
    div.appendChild(input);
    container.appendChild(div);
}

function removeChildAgeInput() {
    var container = document.getElementById('enfant-age-container');
    var numChildren = parseInt(document.getElementById('enfant').value);
    var childDiv = document.getElementById('enfant-age-' + numChildren);
    if (childDiv) {
        container.removeChild(childDiv);
    }
}

function resetForm() {
    var confirmationElements = document.querySelectorAll('#reservation-details p');
    confirmationElements.forEach(function(element) {
        var id = element.getAttribute('id');
        if (id === 'adulte-result' || id === 'enfant-result' || id === 'chambre-result' || id === 'voyage-travail-result') {
            element.textContent = id.replace('-result', '') + ' :';
        }
    });

    var container = document.getElementById('enfant-age-container');
    container.innerHTML = '';
}

function updateReservationDetails() {
    var adulteResult = document.getElementById("adulte-result");
    var enfantResult = document.getElementById("enfant-result");
    var chambreResult = document.getElementById("chambre-result");
    var voyageTravailResult = document.getElementById("voyage-travail-result");

    var adulteInput = document.getElementById("adulte");
    var enfantInput = document.getElementById("enfant");
    var chambreInput = document.getElementById("chambre");
    var voyageTravailInput = document.getElementById("voyage-travail");

    adulteResult.textContent = "Nombre d'adultes : " + adulteInput.value;
    enfantResult.textContent = "Nombre d'enfants : " + enfantInput.value;
    chambreResult.textContent = "Nombre de chambre(s) : " + chambreInput.value;
    voyageTravailResult.textContent = "Voyage pour le travail : " + (voyageTravailInput.checked ? "Oui" : "Non");

    var container = document.getElementById('enfant-age-container');
    var ages = container.querySelectorAll('input[type="number"]');
    var agesText = '';
    ages.forEach(function(ageInput, index) {
        agesText += 'Âge de l\'enfant ' + (index + 1) + ' : ' + ageInput.value + '<br>';
    });

    document.getElementById('reservation-details').innerHTML = 
        adulteResult.outerHTML + 
        enfantResult.outerHTML + 
        chambreResult.outerHTML + 
        voyageTravailResult.outerHTML + 
        agesText;
}
