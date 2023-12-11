function updateFields(updateFieldsObject) {

    const passwordSeed = {
        'domainSeed': updateFieldsObject.domainSelect.value,
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

    updateFieldsObject.passwordField.value = newPassword;
}

// Function to find previous input of the pasword field (normaly the user name field)
function previousInput(passwordField) {

    // Get all input fields
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

function initializePopover(passwordField) {

    const userNameField = previousInput(passwordField);

    const popover = createPopover(document);
    const closeButton = createCloseButton(document, popover);
    addTitle(document, popover)
    const domainSelect = createDomainSelect(document, popover);
    const userNameInput = createUserNameInput(document, popover, userNameField);
    const masterPasswordInput = createPasswordInput(document, popover, 'Master');
    const optionsContainer = createOptionsContainer(document, popover);
    const generatedPasswordInput = createPasswordInput(document, optionsContainer, 'Generated');
    const passwordLengthInput = createPasswordLengthInput(document, optionsContainer);
    const upperCheckBox = createChekBox(document, optionsContainer, 'Upper');
    const specialCheckBox = createChekBox(document, optionsContainer, 'Special');
    addBR(optionsContainer);
    const lowerCheckBox = createChekBox(document, optionsContainer, 'Lower');
    const numberCheckBox = createChekBox(document, optionsContainer, 'Number');

    const updateFieldsObject =  {
        'userNameField': userNameField,
        'passwordField': passwordField,
        'domainSelect': domainSelect,
        'userNameInput': userNameInput,
        'masterPasswordInput': masterPasswordInput,
        'passwordLengthInput': passwordLengthInput,
        'specialCheckBox': specialCheckBox,
        'numberCheckBox': numberCheckBox, 
        'upperCheckBox': upperCheckBox,
        'lowerCheckBox': lowerCheckBox,
        'generatedPasswordInput': generatedPasswordInput,
    }

    closeButton.addEventListener('click', function () {
        popover.style.display = 'none';
    });
    userNameField.addEventListener('input', function (event) {
        userNameInput.value = userNameField.value;
    });
    domainSelect.addEventListener('input', function (event) {
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

    return popover;
}

function positionPopover(popover, passwordField) {

    const rect = passwordField.getBoundingClientRect();
    popover.style.top = rect.top + window.scrollY + passwordField.offsetHeight + 10 + 'px';
    popover.style.left = rect.left + 'px';
}

function handleFocusOnPasswordField(event) {

    const passwordField = event.target;

    // Check if popover has already been created for this password field
    if (passwordField.dataset.popoverCreated) {
        const popover = document.getElementById('popover');
        popover.style.display = 'block';
        return;
    }

    const popover = initializePopover(passwordField);
    positionPopover(popover, passwordField);
    document.body.appendChild(popover);

    // Mark the password field to indicate that the popover has been created
    passwordField.dataset.popoverCreated = true;
}

// Add event listener to all password fields on the page
function addFocusListenerToPasswordField(field) {

    if (field instanceof Element || field instanceof Document) {

        const passwordFields = field.querySelectorAll('input[type="password"]');
        passwordFields.forEach(field => {
            if ( (field.id != 'MasterPasswordInput') &&
                 (field.id != 'GeneratedPasswordInput') ) {
                    field.addEventListener('focus', handleFocusOnPasswordField);
            }
        });
    };
}

// Load when there are changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            for (let i = 0; i < mutation.addedNodes.length; i++) {
                const newNode = mutation.addedNodes[i];
                addFocusListenerToPasswordField(newNode);
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Load on initial page load
addFocusListenerToPasswordField(document);
