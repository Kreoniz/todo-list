export default function createInputField(name, text, type, errorRoot=null, validateCallback=null) {
    const field = document.createElement("div");
    field.classList.add(`${name}-field`);

    const fieldPrompt = document.createElement("label");
    field.classList.add(`${name}-prompt`);
    fieldPrompt.textContent = text;
    fieldPrompt.htmlFor = name;

    const fieldInput = document.createElement("input");
    fieldInput.classList.add(name);
    fieldInput.type = type;
    fieldInput.name = name;
    fieldInput.id = name;

    field.appendChild(fieldPrompt);
    field.appendChild(fieldInput);

    if (errorRoot && validateCallback) {
        fieldInput.addEventListener("input", (event) => {
            const value = event.currentTarget.value;
            if (validateCallback(value) && value) {
                fieldInput.style.borderColor = "red";
                fieldInput.style.outline = "red";
                errorRoot.textContent = validateCallback(value);
            } else {
                fieldInput.style.borderColor = "black";
                fieldInput.style.outline = "black";
                errorRoot.textContent = "";
            }
        });

    }

    return field;
}
