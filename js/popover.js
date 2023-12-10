const GENERATED_PASSWORD_LENGTH = 24; // max 88
const LABEL_WIDTH = "270px";

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

    return popover;
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

function createDomainSelect(document, popover) {

    const popoverDomainLabel = document.createElement('strong');
    popoverDomainLabel.textContent = 'Domain: ';

    popover.appendChild(popoverDomainLabel);
    addBR(popover)

    const popoverDomainSelect = document.createElement('select');
    popoverDomainSelect.style.width = LABEL_WIDTH;
    const parentDomainsChain = getParentDomainsChain();
    for (var i = 0; i < parentDomainsChain.length; i++) {
        var option = document.createElement('option');
        option.value = parentDomainsChain[i];
        option.text = parentDomainsChain[i];
        popoverDomainSelect.appendChild(option);
    }

    popover.appendChild(popoverDomainSelect);
    addBR(popover)

    return popoverDomainSelect;
}

// Funtion to create the User Name Input
function createUserNameInput(document, popover, userNameField) {

    const userName = userNameField ? userNameField.value : "";

    const popoverUserNameLabel = document.createElement('strong');
    popoverUserNameLabel.textContent = 'User Name: ';

    popover.appendChild(popoverUserNameLabel);
    addBR(popover)

    const popoverUserNameInput = document.createElement('input');
    popoverUserNameInput.type = 'text';
    popoverUserNameInput.value = userName;
    popoverUserNameInput.style.width = LABEL_WIDTH;

    popover.appendChild(popoverUserNameInput);
    addBR(popover)

    return popoverUserNameInput;
}

// Funtion to create the Password Input
function createPasswordInput(document, popover, label) {

    const popoverPasswordLabel = document.createElement('strong');
    popoverPasswordLabel.textContent = label + ' password: ';

    popover.appendChild(popoverPasswordLabel);
    addBR(popover)

    const popoverPasswordContainer = document.createElement('div');
    popoverPasswordContainer.style.position = 'relative';
    const popoverPasswordInput = document.createElement('input');
    popoverPasswordInput.id = 'popover' + label + 'PasswordInput';
    popoverPasswordInput.type = 'password';
    popoverPasswordInput.style.width = LABEL_WIDTH;
    popoverPasswordContainer.appendChild(popoverPasswordInput);
    const popoverPasswordToggle = document.createElement('span');
    popoverPasswordToggle.innerHTML = '&#128274;';   
    popoverPasswordToggle.style.position = 'absolute';
    popoverPasswordToggle.style.right = '5px';
    popoverPasswordToggle.style.top = '50%';
    popoverPasswordToggle.style.transform = 'translateY(-50%)';
    popoverPasswordToggle.style.cursor = 'pointer';
    popoverPasswordToggle.addEventListener('click', function (event) {
        if (popoverPasswordInput.type === 'password') {
            popoverPasswordInput.type = 'text';
            popoverPasswordToggle.innerHTML = '&#128275;'; // Open lock icon
        } else {
            popoverPasswordInput.type = 'password';
            popoverPasswordToggle.innerHTML = '&#128274;'; // Closed lock icon
        }
    });
    popoverPasswordContainer.appendChild(popoverPasswordToggle);

    popover.appendChild(popoverPasswordContainer);

    return popoverPasswordInput;
}

// Funtion to add a Separation Line
function addSeparationLine(document, popover) {

    const separationLine = document.createElement('hr');
    separationLine.style.border = '1px solid black';
    popover.appendChild(separationLine);
}

// Funtion to add a Separation Line
function addBR(popover) {
    popover.appendChild(document.createElement('br'));
}

// Funtion to create a CheckBox
function createChekBox(document, popover, label) {

    const popoverCheckBox = document.createElement('input');
    popoverCheckBox.type = 'CheckBox';
    popoverCheckBox.checked = true;
    
    popover.appendChild(popoverCheckBox);

    const popoverCheckBoxLabel = document.createElement('strong');
    popoverCheckBoxLabel.textContent = ' ' + label + ' characters ';
    
    popover.appendChild(popoverCheckBoxLabel);
    
    return popoverCheckBox;
}

// Funtion to create the
function create(document, popover) {
    return ;
}