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

    if (updateFieldsObject.userNameField) {
        updateFieldsObject.userNameField.value = updateFieldsObject.userNameInput.value;
    }

    if (updateFieldsObject.passwordField) {
        updateFieldsObject.passwordField.value = newPassword;
    }

    const codesCardCellLabel = generateCodesCardCellLabel(
        updateFieldsObject.domainInput.value, 
        updateFieldsObject.userNameInput.value,
        updateFieldsObject.codesCardLengthInput.value);

    updateFieldsObject.codesCardLabel.textContent = codesCardCellLabel + ':';
}

// Function to find previous input of the pasword field (normaly the user name field)
function previousInput(passwordField) {

    const inputsFields = document.querySelectorAll('input');

    // Find the previous input field relative to the password field
    for (let index = 0; index < inputsFields.length; index++) {

        const element = inputsFields[index];

        if (element === passwordField) {

            // Return the field of the previous input field, if it exists
            return inputsFields[index - 1] ? inputsFields[index - 1] : null;
        }
    }

    return null;
}

function closePopover(popover, updateFieldsObject) {

    popover.style.display = 'none';
}

function initializePopover(passwordField) {

    const isIndex = passwordField ? false : true;

    const userNameField = previousInput(passwordField);

    const popover = createPopover(document);

    const closeButton = createCloseButton(document, popover, isIndex);
    addTitle(document, popover)
    
    const domainInput = createDomainInput(document, popover, isIndex);
    const userNameInput = createUserNameInput(document, popover, userNameField);
    const masterPasswordInput = createPasswordInput(document, popover, 'Master');
    const copyButton = createCopyButton(document, popover)
    const generatedPasswordInput = createPasswordInput(document, popover, 'Generated');

    const optionsContainer = createOptionsContainer(document, popover);
    
    addSeparationLine(document, optionsContainer)

    const passwordLengthInput = createPasswordLengthInput(document, optionsContainer);
    const upperCheckBox = createChekBox(document, optionsContainer, 'Upper');
    const lowerCheckBox = createChekBox(document, optionsContainer, 'Lower');
    const specialCheckBox = createChekBox(document, optionsContainer, 'Special');
    const numberCheckBox = createChekBox(document, optionsContainer, 'Number');
    
    addSeparationLine(document, optionsContainer)

    const codesCardLengthInput = createCodesCardLengthInput(document, optionsContainer);
    const codesCardCellLabel = generateCodesCardCellLabel(
        domainInput.value, userNameInput.value, codesCardLengthInput.value);
    const codesCardLabel = createCodesCardLabel(document, optionsContainer, codesCardCellLabel);
    const codesCardInput = createCodesCardInput(document, optionsContainer, codesCardCellLabel);
    
    const updateFieldsObject = {
        'userNameField': userNameField,
        'passwordField': passwordField,
        'domainInput': domainInput,
        'userNameInput': userNameInput,
        'masterPasswordInput': masterPasswordInput,
        'codesCardLengthInput': codesCardLengthInput,
        'codesCardLabel': codesCardLabel,
        'codesCardInput': codesCardInput,
        'passwordLengthInput': passwordLengthInput,
        'specialCheckBox': specialCheckBox,
        'numberCheckBox': numberCheckBox,
        'upperCheckBox': upperCheckBox,
        'lowerCheckBox': lowerCheckBox,
        'generatedPasswordInput': generatedPasswordInput,
    }

    if (closeButton) {
        closeButton.addEventListener('click', function () {
            closePopover(popover, updateFieldsObject)
        });
    }

    copyButton.addEventListener('click', function () {
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

    if (userNameField) {
        userNameField.addEventListener('input', function (event) {
            userNameInput.value = userNameField.value;
        });
    }

    domainInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    userNameInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    masterPasswordInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    codesCardInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    codesCardLengthInput.addEventListener('input', function (event) {
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

    return popover;
}