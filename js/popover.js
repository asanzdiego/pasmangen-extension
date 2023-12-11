const GENERATED_PASSWORD_LENGTH = 24; // max 88
const LABEL_WIDTH = "13rem";
const INPUT_WIDTH = "28rem";
const MARGIN = "1REM";

function getParentDomainsChain() {

    const domain = window.location.hostname;
    var subdomains = domain.split('.');
    var parentDomains = [domain];

    for (var i = 1; i < subdomains.length; i++) {
        var parentDomain = subdomains.slice(i).join('.');
        parentDomains.push(parentDomain);
    }

    return parentDomains;
}

function createPopover(document) {

    const popover = document.createElement('div');
    popover.id = 'popover'
    popover.style.position = 'absolute';
    popover.style.backgroundColor = '#f9f9f9';
    popover.style.border = '1px solid #ccc';
    popover.style.padding = '8px';
    popover.style.borderRadius = '10px';
    popover.style.zIndex = '9999';
    popover.style.fontFamily = 'Roboto, sans-serif';

    return popover;
}

function addTitle(document, popover) {

    const popoverTitle = document.createElement('h2');
    popoverTitle.innerHTML = 'Password Manager Generator';
    popover.appendChild(popoverTitle);
}

function createCloseButton(document, popover) {

    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    closeButton.style.cursor = 'pointer';
    closeButton.style.float = 'right';

    popover.appendChild(closeButton);
    addBR(popover)

    return closeButton;
}

function createCopyButton(document, popover) {

    const copyButton = document.createElement('button');
    copyButton.innerHTML = '&#9112;';
    copyButton.style.cursor = 'pointer';
    copyButton.style.float = 'right';

    popover.appendChild(copyButton);

    return copyButton;
}

function createDomainInput(document, popover) {

    const domainLabel = document.createElement('Label');
    domainLabel.htmlFor = 'domainInput';
    domainLabel.style.fontWeight = 'bold';
    domainLabel.textContent = 'Domain: ';

    popover.appendChild(domainLabel);
    addBR(popover)

    const domainInput = document.createElement('input');
    domainInput.id = 'domainInput';
    domainInput.type = 'text';
    domainInput.placeholder = 'Domain...';
    domainInput.style.width = INPUT_WIDTH;
    domainInput.style.marginBottom = MARGIN;

    popover.appendChild(domainInput);
    addBR(popover)

    return domainInput;
}

function createDomainSelect(document, popover) {

    const domainLabel = document.createElement('Label');
    domainLabel.htmlFor = 'domainSelect';
    domainLabel.style.fontWeight = 'bold';
    domainLabel.textContent = 'Domain: ';

    popover.appendChild(domainLabel);
    addBR(popover)

    const domainSelect = document.createElement('select');
    domainSelect.id = 'domainSelect';
    domainSelect.style.width = INPUT_WIDTH;
    domainSelect.style.marginBottom = MARGIN;
    const parentDomainsChain = getParentDomainsChain();
    for (var i = 0; i < parentDomainsChain.length; i++) {
        var option = document.createElement('option');
        option.value = parentDomainsChain[i];
        option.text = parentDomainsChain[i];
        domainSelect.appendChild(option);
    }

    popover.appendChild(domainSelect);
    addBR(popover)

    return domainSelect;
}

function createUserNameInput(document, popover, userNameField) {

    const userName = userNameField ? userNameField.value : "";

    const userNameLabel = document.createElement('Label');
    userNameLabel.htmlFor = 'userNameInput';
    userNameLabel.style.fontWeight = 'bold';
    userNameLabel.textContent = 'User Name: ';

    popover.appendChild(userNameLabel);
    addBR(popover)

    const userNameInput = document.createElement('input');
    userNameInput.id = 'userNameInput';
    userNameInput.type = 'text';
    userNameInput.value = userName;
    userNameInput.placeholder = 'User name...';
    userNameInput.style.width = INPUT_WIDTH;
    userNameInput.style.marginBottom = MARGIN;

    popover.appendChild(userNameInput);
    addBR(popover)

    return userNameInput;
}

function createPasswordInput(document, popover, label) {

    const passwordLabel = document.createElement('Label');
    passwordLabel.htmlFor = label + 'PasswordInput';
    passwordLabel.style.fontWeight = 'bold';
    passwordLabel.textContent = label + ' password: ';

    popover.appendChild(passwordLabel);
    addBR(popover)

    const passwordContainer = document.createElement('div');
    passwordContainer.style.position = 'relative';
    passwordContainer.style.width = INPUT_WIDTH;
   
    const passwordInput = document.createElement('input');
    passwordInput.id = label + 'PasswordInput';
    passwordInput.type = 'password';
    passwordInput.style.width = INPUT_WIDTH;
    passwordInput.style.marginBottom = MARGIN;
    passwordInput.placeholder = label + ' password...';
    passwordContainer.appendChild(passwordInput);
    
    const passwordToggle = document.createElement('span');
    passwordToggle.innerHTML = '&#128274;';   
    passwordToggle.style.position = 'absolute';
    passwordToggle.style.right = '5px';
    passwordToggle.style.cursor = 'pointer';
    passwordToggle.addEventListener('click', function (event) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.innerHTML = '&#128275;'; // Open lock icon
        } else {
            passwordInput.type = 'password';
            passwordToggle.innerHTML = '&#128274;'; // Closed lock icon
        }
    });
    passwordContainer.appendChild(passwordToggle);

    popover.appendChild(passwordContainer);

    return passwordInput;
}

function createPasswordLengthInput(document, popover) {

    const passwordLengthLabel = document.createElement('Label');
    passwordLengthLabel.htmlFor = 'passwordLengthInput';
    passwordLengthLabel.style.fontWeight = 'bold';
    passwordLengthLabel.textContent = 'Passord Length: ';

    popover.appendChild(passwordLengthLabel);
    addBR(popover)

    const passwordLengthInput = document.createElement('input');
    passwordLengthInput.id = 'passwordLengthInput';
    passwordLengthInput.type = 'number';
    passwordLengthInput.value = GENERATED_PASSWORD_LENGTH;
    passwordLengthInput.style.width = INPUT_WIDTH;
    passwordLengthInput.style.marginBottom = MARGIN;

    popover.appendChild(passwordLengthInput);
    addBR(popover)

    return passwordLengthInput;
}

function createOptionsContainer(document, popover) {

    const optionsButton = document.createElement('button');
    optionsButton.innerHTML = 'More options...';
    optionsButton.style.cursor = 'pointer';
    optionsButton.style.marginBottom = MARGIN;
    
    popover.appendChild(optionsButton);
    addBR(popover)

    const optionsContainer = document.createElement('div');
    optionsContainer.style.display = 'none';
    popover.appendChild(optionsContainer);

    optionsButton.addEventListener('click', function () {
        if (optionsContainer.style.display === 'none') {
            optionsContainer.style.display = 'block';
            optionsButton.innerHTML = 'Less options...';
        } else {
            optionsContainer.style.display = 'none';
            optionsButton.innerHTML = 'More options...';
        }
    });

    return optionsContainer;
}

function createChekBox(document, popover, label) {

    const checkBoxLabel = document.createElement('Label');
    checkBoxLabel.htmlFor = 'popover' + label + 'CheckBox';
    checkBoxLabel.style.fontWeight = 'bold';
    checkBoxLabel.style.minWidth = LABEL_WIDTH;
    checkBoxLabel.style.display = 'inline-block';
    checkBoxLabel.style.cursor = 'pointer';
    checkBoxLabel.textContent = label + ' characters ';
    
    popover.appendChild(checkBoxLabel);

    const checkBox = document.createElement('input');
    checkBox.id = 'popover' + label + 'CheckBox';
    checkBox.type = 'CheckBox';
    checkBox.checked = true;
    checkBox.style.marginRight = '0.1rem';
    checkBox.style.cursor = 'pointer';

    popover.appendChild(checkBox);

    return checkBox;
}

function addSeparationLine(document, popover) {

    const separationLine = document.createElement('hr');
    separationLine.style.border = '1px solid #ccc';
    separationLine.style.width = INPUT_WIDTH;
    separationLine.style.marginBottom = MARGIN;

    popover.appendChild(separationLine);
}

function addBR(popover) {
    popover.appendChild(document.createElement('br'));
}