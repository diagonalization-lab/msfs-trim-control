class IngamePanelDiagonalizationPanelIndicatorsPanel extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        setInterval(() => {
            if (GetInputStatus("PLANE", "KEY_TOGGLE_WATER_RUDDER") !== 0) {
                // Produces a promise that we ignore.
                SimVar.SetSimVarValue("ELEVATOR TRIM POSITION", "degrees", 0);
            }
            const elevatorTrim = SimVar.GetSimVarValue("ELEVATOR TRIM POSITION", "degrees");
            const elevatorTrimString = `${Math.round(elevatorTrim * 100) / 100}`;
            document.getElementById('elevatorTrim').innerText = elevatorTrimString;
        }, 500);
    }
    updateImage() {
    }
}

window.customElements.define(
    "ingamepanel-diagonalization-panel-indicators",
    IngamePanelDiagonalizationPanelIndicatorsPanel);

    checkAutoload();