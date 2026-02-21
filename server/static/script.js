function getBathValue() {
    const baths = document.getElementsByName("uiBathrooms");
    for (let i = 0; i < baths.length; i++) {
        if (baths[i].checked) return parseInt(baths[i].value);
    }
    return -1;
}

function getBHKValue() {
    const bhks = document.getElementsByName("uiBHK");
    for (let i = 0; i < bhks.length; i++) {
        if (bhks[i].checked) return parseInt(bhks[i].value);
    }
    return -1;
}

function onClickedEstimatePrice() {
    const sqft = document.getElementById("uiSqft").value;
    const bhk = getBHKValue();
    const bath = getBathValue();
    const location = document.getElementById("uiLocations").value;
    const result = document.getElementById("uiEstimatedPrice");

    if (sqft <= 0 || bhk < 0 || bath < 0 || !location) {
        result.innerHTML = "<h2>Please enter valid inputs</h2>";
        return;
    }

    $.post("/predict_home_price", {
        total_sqft: sqft,
        bhk: bhk,
        bath: bath,
        location: location
    }, function (data) {
        result.innerHTML = `<h2>₹ ${data.estimated_price} Lakhs</h2>`;
    });
}

function onPageLoad() {
    $.get("/get_location_names", function (data) {
        const locations = data.locations;
        const uiLocations = document.getElementById("uiLocations");
        uiLocations.innerHTML = "";

        const defaultOption = new Option("Choose a Location", "");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        uiLocations.add(defaultOption);

        locations.forEach(loc => {
            uiLocations.add(new Option(loc, loc));
        });
    });
}

window.onload = onPageLoad;