const GENERATED_PASSWORD_LENGTH = 24; // max 88
const LABEL_WIDTH = "200px";

// Function to generate a hash from text
function generateHashFromText(text) {

    const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
    shaObj.update(text);
    return shaObj.getHash("B64");
}

// Funtion to normalize de password (minimun lower, upper, number and others)
function normalizePassword(password, passwordLength) {

    var newPassword = password.slice(0, passwordLength);

    const lower = /[a-z]/;
    const upper = /[A-Z]/;
    const number = /[0-9]/;
    const normal = /^[a-zA-Z0-9]+$/;

    var append = ""
    if (!lower.test(newPassword)) {
        append = append + "p";
    }
    if (!upper.test(newPassword)) {
        append = append + "M";
    }
    if (!number.test(newPassword)) {
        append = append + "0";
    }
    if (normal.test(newPassword)) {
        append = append + ".";
    }
    if (append) {
        newPassword = append + newPassword;
        return newPassword.slice(0, passwordLength);
    }

    return newPassword;
}

// Function to generate a password from seeds
function generatePasswordFromSeeds(domainSeed, userNameSeed, masterPasswordSeed, passwordLength) {

    const data = domainSeed + userNameSeed + masterPasswordSeed;
    const hash = generateHashFromText(data);

    return normalizePassword(hash, passwordLength);
}

// Function to update user name anda password fields
function updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
    popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput) {

    const newPassword = generatePasswordFromSeeds(
        popoverDomainSelect.value,
        popoverUserNameInput.value,
        popoverMasterPasswordInput.value,
        GENERATED_PASSWORD_LENGTH)

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
    popover.style.position = 'absolute';
    popover.style.backgroundColor = '#f9f9f9';
    popover.style.border = '1px solid #ccc';
    popover.style.padding = '8px';
    popover.style.borderRadius = '10px';
    popover.style.zIndex = '9999';

    // Popover Domain
    const popoverDomainLabel = document.createElement('strong');
    popoverDomainLabel.textContent = 'Domain: ';
    popoverDomainLabel.style.width = LABEL_WIDTH;
    popover.appendChild(popoverDomainLabel);

    const popoverDomainSelect = document.createElement('select');
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
    popoverUserNameLabel.style.width = LABEL_WIDTH;
    popover.appendChild(popoverUserNameLabel);

    const popoverUserNameInput = document.createElement('input');
    popoverUserNameInput.type = 'text';
    popoverUserNameInput.value = userName;
    popover.appendChild(popoverUserNameInput);

    popover.appendChild(document.createElement('br'));

    // Popover Master Password
    const popoverMasterPasswordLabel = document.createElement('strong');
    popoverMasterPasswordLabel.textContent = 'Master password: ';
    popoverMasterPasswordLabel.style.width = LABEL_WIDTH;
    popover.appendChild(popoverMasterPasswordLabel);

    const popoverMasterPasswordInput = document.createElement('input');
    popoverMasterPasswordInput.type = 'password';
    popover.appendChild(popoverMasterPasswordInput);

    popover.appendChild(document.createElement('br'));

    // Popover Generated Password
    const popoverGeneratedPasswordLabel = document.createElement('strong');
    popoverGeneratedPasswordLabel.textContent = 'Generated password: ';
    popoverGeneratedPasswordLabel.style.width = LABEL_WIDTH;
    popover.appendChild(popoverGeneratedPasswordLabel);

    const popoverGeneratedPasswordInput = document.createElement('input');
    popoverGeneratedPasswordInput.type = 'text';
    popover.appendChild(popoverGeneratedPasswordInput);

    // Crear input event listener
    popoverDomainSelect.addEventListener('input', function (event) {
        updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
            popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput);
    });
    popoverUserNameInput.addEventListener('input', function (event) {
        updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
            popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput);
    });
    popoverMasterPasswordInput.addEventListener('input', function (event) {
        updateFields(userNameField, passwordField, popoverGeneratedPasswordInput,
            popoverDomainSelect, popoverUserNameInput, popoverMasterPasswordInput);
    });

    return popover;
}

// Function to position the popover to the left of the password field
function positionPopover(popover, passwordField) {

    const rect = passwordField.getBoundingClientRect();
    popover.style.top = rect.top + window.scrollY - passwordField.offsetHeight / 2 + 'px';
    popover.style.left = rect.left + passwordField.offsetWidth + 50 + 'px';
}

// Function to handle click event on password fields
function handleClickOnPasswordField(event) {

    // Get the clicked password field
    const passwordField = event.target;

    // Check if popover has already been created for this password field
    if (passwordField.dataset.popoverCreated) {
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
function addClickListenerToPasswordField(field) {

    if (field instanceof Element || field instanceof Document) {

        const passwordFields = field.querySelectorAll('input[type="password"]');
        passwordFields.forEach(field => {
            field.addEventListener('click', handleClickOnPasswordField);
        });
    };
}

// Load when there are changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            for (let i = 0; i < mutation.addedNodes.length; i++) {
                const newNode = mutation.addedNodes[i];
                addClickListenerToPasswordField(newNode);
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Load on initial page load
addClickListenerToPasswordField(document);
