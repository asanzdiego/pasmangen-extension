// Function to update user name anda password fields
function updateFields(updateFieldsObject) {

    const passwordSeed = {
        'domainSeed': updateFieldsObject.popoverDomainSelect.value,
        'userNameSeed': updateFieldsObject.popoverUserNameInput.value,
        'masterPasswordSeed': updateFieldsObject.popoverMasterPasswordInput.value,
        'passwordLength': GENERATED_PASSWORD_LENGTH,
        'hasOthers': updateFieldsObject.popoverSpecialCheckBox.checked,
        'hasNumber': updateFieldsObject.popoverNumberCheckBox.checked,
        'hasUpper': updateFieldsObject.popoverUpperCheckBox.checked,
        'hasLower': updateFieldsObject.popoverLowerCheckBox.checked
    }
    const newPassword = generatePasswordFromSeeds(passwordSeed)

    updateFieldsObject.popoverGeneratedPasswordInput.value = newPassword;

    if (updateFieldsObject.userNameField) {
        updateFieldsObject.userNameField.value = updateFieldsObject.popoverUserNameInput.value;
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
    closeButton.addEventListener('click', function () {
        popover.style.display = 'none';
    });

    const popoverDomainSelect = createDomainSelect(document, popover);
    const popoverUserNameInput = createUserNameInput(document, popover, userNameField);
    const popoverMasterPasswordInput = createPasswordInput(document, popover, 'Master');
    addSeparationLine(document, popover);
    const popoverUpperCheckBox = createChekBox(document, popover, 'Upper');
    const popoverSpecialCheckBox = createChekBox(document, popover, 'Special');
    addBR(popover);
    const popoverLowerCheckBox = createChekBox(document, popover, 'Lower');
    const popoverNumberCheckBox = createChekBox(document, popover, 'Number');
    addSeparationLine(document, popover);
    const popoverGeneratedPasswordInput = createPasswordInput(document, popover, 'Generated');

    const updateFieldsObject =  {
        'userNameField': userNameField,
        'passwordField': passwordField,
        'popoverDomainSelect': popoverDomainSelect,
        'popoverUserNameInput': popoverUserNameInput,
        'popoverMasterPasswordInput': popoverMasterPasswordInput,
        'popoverSpecialCheckBox': popoverSpecialCheckBox,
        'popoverNumberCheckBox': popoverNumberCheckBox, 
        'popoverUpperCheckBox': popoverUpperCheckBox,
        'popoverLowerCheckBox': popoverLowerCheckBox,
        'popoverGeneratedPasswordInput': popoverGeneratedPasswordInput,
    }

    popoverDomainSelect.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    popoverUserNameInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    popoverMasterPasswordInput.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    popoverSpecialCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    popoverNumberCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    popoverLowerCheckBox.addEventListener('input', function (event) {
        updateFields(updateFieldsObject);
    });
    popoverUpperCheckBox.addEventListener('input', function (event) {
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
            if ( (field.id != 'popoverMasterPasswordInput') &&
                 (field.id != 'popoverGeneratedPasswordInput') ) {
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
