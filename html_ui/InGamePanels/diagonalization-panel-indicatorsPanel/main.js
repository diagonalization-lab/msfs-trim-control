// The interval at which the main loop runs.
var pollIntervalMs = 100;

// Maximum change in elevator trim (in degrees) per loop iteration.
var maxElevatorTrimDelta = 0.01;

// The last observed elevator trim position.
var lastElevatorTrimPosition = 0;

function getElevatorTrimPosition() {
    return SimVar.GetSimVarValue("ELEVATOR TRIM POSITION", "degrees");
}


function setElevatorTrimPosition(newPosition, forceSet) {
    lastElevatorTrimPosition = newPosition;
    // Produces a promise that we ignore.
    if (forceSet) {
        SimVar.SetSimVarValue("ELEVATOR TRIM POSITION", "degrees", newPosition);
    }
    const elevatorTrimString = `${Math.round(newPosition * 100) / 100}`;
    document.getElementById('elevatorTrim').innerText = elevatorTrimString;

}

function mainLoop() {
    if (GetInputStatus("PLANE", "KEY_TOGGLE_WATER_RUDDER") !== 0) {
        setElevatorTrimPosition(0, true);
        return;
    }
    const currentElevatorTrimPosition = getElevatorTrimPosition();
    const delta = currentElevatorTrimPosition - lastElevatorTrimPosition;
    if (Math.abs(delta) > maxElevatorTrimDelta) {
        console.log("Clipping elevator trim");
        setElevatorTrimPosition(
            lastElevatorTrimPosition + Math.sign(delta) * maxElevatorTrimDelta,
            true);
    }
    else {
        setElevatorTrimPosition(currentElevatorTrimPosition, false);
    }
}

class IngamePanelDiagonalizationPanelIndicatorsPanel extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        lastElevatorTrimPosition = getElevatorTrimPosition();
        setInterval(mainLoop, pollIntervalMs);
    }
    updateImage() {
    }
}

window.customElements.define(
    "ingamepanel-diagonalization-panel-indicators",
    IngamePanelDiagonalizationPanelIndicatorsPanel);

checkAutoload();