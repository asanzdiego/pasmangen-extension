function updateFields(updateFieldsObject) {

    const passwordSeed = {
        'domainSeed': updateFieldsObject.domainInput.value,
        'userNameSeed': updateFieldsObject.userNameInput.value,
        'masterPasswordSeed': updateFieldsObject.masterPasswordInput.value,
        'passwordLength': updateFieldsObject.passwordLengthInput.value,
        'hasOthers': updateFieldsObject.specialCheckBox.checked,
        'hasNumber': updateFieldsObject.numberCheckBox.checked,
        'hasUpper': updateFieldsObject.upperCheckBox.checked,
        'hasLower': updateFieldsObject.lowerCheckBox.checked
    }
    const newPassword = generatePasswordFromSeeds(passwordSeed)

    updateFieldsObject.generatedPasswordInput.value = newPassword;
}

function initializePopover() {

    const popover = createPopover(document);
    addTitle(document, popover)
    const domainInput = createDomainInput(document, popover);
    const userNameInput = createUserNameInput(document, popover);
    const masterPasswordInput = createPasswordInput(document, popover, 'Master');
    const optionsContainer = createOptionsContainer(document, popover);
    addSeparationLine(document, optionsContainer);
    const passwordLengthInput = createPasswordLengthInput(document, optionsContainer);
    const upperCheckBox = createChekBox(document, optionsContainer, 'Upper');
    const specialCheckBox = createChekBox(document, optionsContainer, 'Special');
    addBR(optionsContainer);
    const lowerCheckBox = createChekBox(document, optionsContainer, 'Lower');
    const numberCheckBox = createChekBox(document, optionsContainer, 'Number');
    addSeparationLine(document, optionsContainer);
    const popoverCopyButton = createCopyButton(document, popover)
    const generatedPasswordInput = createPasswordInput(document, popover, 'Generated');

    const updateFieldsObject =  {
        'domainInput': domainInput,
        'userNameInput': userNameInput,
        'masterPasswordInput': masterPasswordInput,
        'passwordLengthInput': passwordLengthInput,
        'specialCheckBox': specialCheckBox,
        'numberCheckBox': numberCheckBox, 
        'upperCheckBox': upperCheckBox,
        'lowerCheckBox': lowerCheckBox,
        'generatedPasswordInput': generatedPasswordInput,
    }

    popoverCopyButton.addEventListener('click', function () {
        const textToCopy = generatedPasswordInput.value;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy);
        } else {
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = textToCopy;
            tempInput.select();
            document.execCommand('copy', false);
            tempInput.remove();
        }
    });
    domainInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    userNameInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    masterPasswordInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    passwordLengthInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    specialCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    numberCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    lowerCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    upperCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });

    document.body.appendChild(popover);
}

initializePopover();