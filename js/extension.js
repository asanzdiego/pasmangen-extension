const GENERATED_PASSWORD_LENGTH = 24; // max 88
const LABEL_WIDTH = "250px";

// Function to update user name anda password fields
function updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
    popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput,
    popoverCheckSpecialCheck, popoverCheckNumberCheck,
    popoverCheckUpperCheck, popoverCheckLowerCheck) {

    const newPassword = generatePasswordFromSeeds(
        popoverDomainSelect.value,
        popoverUserNameInput.value,
        popoverMasterPasswordInput.value,
        GENERATED_PASSWORD_LENGTH,
        popoverCheckSpecialCheck.checked,
        popoverCheckNumberCheck.checked,
        popoverCheckUpperCheck.checked,
        popoverCheckLowerCheck.checked)

    popoverGeneratedPasswordInput.value = newPassword;

    if (userNameField) {
        userNameField.value = popoverUserNameInput.value;
    }

    passwordField.value = newPassword;
}

// Function to get de parents domains chain
function getParentDomainsChain(subdomainsString) {

    // Split the string into parts using dot as a separator
    var subdomains = subdomainsString.split('.');

    // Initialize an array to store parent domains
    var parentDomains = [subdomainsString];

    // Iterate through the subdomains and build the parent domains
    for (var i = 1; i < subdomains.length; i++) {
        var parentDomain = subdomains.slice(i).join('.');
        parentDomains.push(parentDomain);
    }

    return parentDomains;
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

// Function to create the popover
function createPopover(passwordField) {

    // Get the domain of the page
    const domain = window.location.hostname;

    // Get the value of the previous input field (user code)
    const userNameField = previousInput(passwordField);
    const userName = userNameField ? userNameField.value : "";

    // Create the popover
    const popover = document.createElement('div');
    popover.id = 'popover'
    popover.style.position = 'absolute';
    popover.style.backgroundColor = '#f9f9f9';
    popover.style.border = '1px solid #ccc';
    popover.style.padding = '8px';
    popover.style.borderRadius = '10px';
    popover.style.zIndex = '9999';

    // Create a close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    closeButton.style.cursor = 'pointer';
    closeButton.style.float = 'right';
    closeButton.addEventListener('click', function () {
        popover.style.display = 'none';
    });
    popover.appendChild(closeButton);
    popover.appendChild(document.createElement('br'));

    // Popover Domain
    const popoverDomainLabel = document.createElement('strong');
    popoverDomainLabel.textContent = 'Domain: ';
    popover.appendChild(popoverDomainLabel);
    popover.appendChild(document.createElement('br'));

    const popoverDomainSelect = document.createElement('select');
    popoverDomainSelect.style.width = LABEL_WIDTH;
    const parentDomainsChain = getParentDomainsChain(domain);
    for (var i = 0; i < parentDomainsChain.length; i++) {
        var option = document.createElement('option');
        option.value = parentDomainsChain[i];
        option.text = parentDomainsChain[i];
        popoverDomainSelect.appendChild(option);
    }
    popover.appendChild(popoverDomainSelect);
    popover.appendChild(document.createElement('br'));

    // Popover User Name
    const popoverUserNameLabel = document.createElement('strong');
    popoverUserNameLabel.textContent = 'User Name: ';
    popover.appendChild(popoverUserNameLabel);
    popover.appendChild(document.createElement('br'));

    const popoverUserNameInput = document.createElement('input');
    popoverUserNameInput.type = 'text';
    popoverUserNameInput.value = userName;
    popoverUserNameInput.style.width = LABEL_WIDTH;
    popover.appendChild(popoverUserNameInput);
    popover.appendChild(document.createElement('br'));

    // Popover Master Password
    const popoverMasterPasswordLabel = document.createElement('strong');
    popoverMasterPasswordLabel.textContent = 'Master password: ';
    popover.appendChild(popoverMasterPasswordLabel);
    popover.appendChild(document.createElement('br'));

    const popoverMasterPasswordContainer = document.createElement('div');
    popoverMasterPasswordContainer.style.position = 'relative';
    const popoverMasterPasswordInput = document.createElement('input');
    popoverMasterPasswordInput.type = 'password';
    popoverMasterPasswordInput.id = 'popoverMasterPasswordInput';
    popoverMasterPasswordInput.style.width = LABEL_WIDTH;
    popoverMasterPasswordContainer.appendChild(popoverMasterPasswordInput);
    const popoverMasterPasswordToggle = document.createElement('span');
    popoverMasterPasswordToggle.innerHTML = '&#128274;';
    popoverMasterPasswordToggle.style.position = 'absolute';
    popoverMasterPasswordToggle.style.right = '5px';
    popoverMasterPasswordToggle.style.top = '50%';
    popoverMasterPasswordToggle.style.transform = 'translateY(-50%)';
    popoverMasterPasswordToggle.style.cursor = 'pointer';
    popoverMasterPasswordToggle.addEventListener('click', function (event) {
        if (popoverMasterPasswordInput.type === 'password') {
            popoverMasterPasswordInput.type = 'text';
            popoverMasterPasswordToggle.innerHTML = '&#128275;'; // Open lock icon
        } else {
            popoverMasterPasswordInput.type = 'password';
            popoverMasterPasswordToggle.innerHTML = '&#128274;'; // Closed lock icon
        }
    });
    popoverMasterPasswordContainer.appendChild(popoverMasterPasswordToggle);
    popover.appendChild(popoverMasterPasswordContainer);

    // Popover Generated Password
    const popoverGeneratedPasswordLabel = document.createElement('strong');
    popoverGeneratedPasswordLabel.textContent = 'Generated password: ';
    popover.appendChild(popoverGeneratedPasswordLabel);
    popover.appendChild(document.createElement('br'));

    const popoverGeneratedPasswordContainer = document.createElement('div');
    popoverGeneratedPasswordContainer.style.position = 'relative';
    const popoverGeneratedPasswordInput = document.createElement('input');
    popoverGeneratedPasswordInput.type = 'password';
    popoverGeneratedPasswordInput.id = 'popoverGeneratedPasswordInput';
    popoverGeneratedPasswordInput.style.width = LABEL_WIDTH;
    popoverGeneratedPasswordContainer.appendChild(popoverGeneratedPasswordInput);
    const popoverGeneratedPasswordToggle = document.createElement('span');
    popoverGeneratedPasswordToggle.innerHTML = '&#128274;';
    popoverGeneratedPasswordToggle.style.position = 'absolute';
    popoverGeneratedPasswordToggle.style.right = '5px';
    popoverGeneratedPasswordToggle.style.top = '50%';
    popoverGeneratedPasswordToggle.style.transform = 'translateY(-50%)';
    popoverGeneratedPasswordToggle.style.cursor = 'pointer';
    popoverGeneratedPasswordToggle.addEventListener('click', function (event) {
        if (popoverGeneratedPasswordInput.type === 'password') {
            popoverGeneratedPasswordInput.type = 'text';
            popoverGeneratedPasswordToggle.innerHTML = '&#128275;'; // Open lock icon
        } else {
            popoverGeneratedPasswordInput.type = 'password';
            popoverGeneratedPasswordToggle.innerHTML = '&#128274;'; // Closed lock icon
        }
    });
    popoverGeneratedPasswordContainer.appendChild(popoverGeneratedPasswordToggle);
    popover.appendChild(popoverGeneratedPasswordContainer);

    // Add a horizontal line (hr) and apply the style directly
    const separationLine = document.createElement('hr');
    separationLine.style.border = '1px solid black';
    popover.appendChild(separationLine);

    // Popover Check Special
    const popoverCheckSpecialCheck = document.createElement('input');
    popoverCheckSpecialCheck.type = 'checkbox';
    popoverCheckSpecialCheck.checked = true;
    popover.appendChild(popoverCheckSpecialCheck);
    const popoverCheckSpecialLabel = document.createElement('strong');
    popoverCheckSpecialLabel.textContent = ' Special characters';
    popover.appendChild(popoverCheckSpecialLabel);
    popover.appendChild(document.createElement('br'));

    // Popover Check Number
    const popoverCheckNumberCheck = document.createElement('input');
    popoverCheckNumberCheck.type = 'checkbox';
    popoverCheckNumberCheck.checked = true;
    popover.appendChild(popoverCheckNumberCheck);
    const popoverCheckNumberLabel = document.createElement('strong');
    popoverCheckNumberLabel.textContent = ' Number characters';
    popover.appendChild(popoverCheckNumberLabel);
    popover.appendChild(document.createElement('br'));

    // Popover Check Upper
    const popoverCheckUpperCheck = document.createElement('input');
    popoverCheckUpperCheck.type = 'checkbox';
    popoverCheckUpperCheck.checked = true;
    popover.appendChild(popoverCheckUpperCheck);
    const popoverCheckUpperLabel = document.createElement('strong');
    popoverCheckUpperLabel.textContent = ' Upper characters';
    popover.appendChild(popoverCheckUpperLabel);
    popover.appendChild(document.createElement('br'));

    // Popover Check Lower
    const popoverCheckLowerCheck = document.createElement('input');
    popoverCheckLowerCheck.type = 'checkbox';
    popoverCheckLowerCheck.checked = true;
    popover.appendChild(popoverCheckLowerCheck);
    const popoverCheckLowerLabel = document.createElement('strong');
    popoverCheckLowerLabel.textContent = ' Lower characters';
    popover.appendChild(popoverCheckLowerLabel);
    popover.appendChild(document.createElement('br'));

    // Create input event listener
    popoverDomainSelect.addEventListener('input', function (event) {
        updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
            popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput,
            popoverCheckSpecialCheck, popoverCheckNumberCheck, 
            popoverCheckUpperCheck, popoverCheckLowerCheck);
    });
    popoverUserNameInput.addEventListener('input', function (event) {
        updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
            popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput,
            popoverCheckSpecialCheck, popoverCheckNumberCheck,
            popoverCheckUpperCheck, popoverCheckLowerCheck);
    });
    popoverMasterPasswordInput.addEventListener('input', function (event) {
        updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
            popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput,
            popoverCheckSpecialCheck, popoverCheckNumberCheck,
            popoverCheckUpperCheck, popoverCheckLowerCheck);
    });
    popoverCheckSpecialCheck.addEventListener('input', function (event) {
        updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
            popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput,
            popoverCheckSpecialCheck, popoverCheckNumberCheck,
            popoverCheckUpperCheck, popoverCheckLowerCheck);
    });
    popoverCheckNumberCheck.addEventListener('input', function (event) {
        updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
            popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput,
            popoverCheckSpecialCheck, popoverCheckNumberCheck,
            popoverCheckUpperCheck, popoverCheckLowerCheck);
    });
    popoverCheckLowerCheck.addEventListener('input', function (event) {
        updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
            popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput,
            popoverCheckSpecialCheck, popoverCheckNumberCheck,
            popoverCheckUpperCheck, popoverCheckLowerCheck);
    });
    popoverCheckUpperCheck.addEventListener('input', function (event) {
        updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
            popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput,
            popoverCheckSpecialCheck, popoverCheckNumberCheck,
            popoverCheckUpperCheck, popoverCheckLowerCheck);
    });

    return popover;
}

// Function to position the popover to the left of the password field
function positionPopover(popover, passwordField) {

    const rect = passwordField.getBoundingClientRect();
    // popover.style.top = rect.top + window.scrollY - passwordField.offsetHeight / 2 + 'px';
    // popover.style.left = rect.left + passwordField.offsetWidth + 50 + 'px';
    popover.style.top = rect.top + window.scrollY + passwordField.offsetHeight + 10 + 'px';
    popover.style.left = rect.left + 'px';
}

// Function to handle focus event on password fields
function handleFocusOnPasswordField(event) {

    // Get the focused password field
    const passwordField = event.target;

    // Check if popover has already been created for this password field
    if (passwordField.dataset.popoverCreated) {
        const popover = document.getElementById('popover');
        popover.style.display = 'block';
        return;
    }

    // Create the popover
    const popover = createPopover(passwordField);

    // Position the popover to the left of the password field
    positionPopover(popover, passwordField);

    // Add the popover to the document body
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
