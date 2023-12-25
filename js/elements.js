const GENERATED_PASSWORD_LENGTH = 24; // max 88
const NUMBER_CODES_CARD_CELLS = 40;
const LABEL_WIDTH = "14rem";
const INPUT_WIDTH = "28rem";
const NUMBER_INPUT_WIDTH = "3rem";
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

function addTitle(document, parentElement) {

    const title = document.createElement('h2');
    title.innerHTML = 'Password Manager Generator';
    
    parentElement.appendChild(title);
}

function addSeparationLine(document, parentElement) {

    const separationLine = document.createElement('hr');
    separationLine.style.border = '1px solid #ccc';
    separationLine.style.width = INPUT_WIDTH;
    separationLine.style.marginBottom = MARGIN;
    
    parentElement.appendChild(separationLine);
}

function addBR(parentElement) {
    
    parentElement.appendChild(document.createElement('br'));
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


function createLabel(document, parentElement, htmlFor, textContent) {

    const label = document.createElement('Label');
    label.htmlFor = htmlFor;
    label.style.fontWeight = 'bold';
    label.style.minWidth = LABEL_WIDTH;
    label.style.display = 'inline-block';
    label.style.cursor = 'pointer';
    label.textContent = textContent;
    
    parentElement.appendChild(label);
    
    return label;
}

function createInputText(document, parentElement, id, placeholder, value) {

    const input = document.createElement('input');
    input.id = id;
    input.type = 'text';
    input.placeholder = placeholder;
    input.style.width = INPUT_WIDTH;
    input.style.marginBottom = MARGIN;

    if (value) {
        input.value = value;
    }

    parentElement.appendChild(input);
    addBR(parentElement);
    
    return input;
}

function createInputNumber(document, parentElement, id, value) {

    const input = document.createElement('input');
    input.id = id;
    input.type = 'number';
    input.value = value;
    input.style.width = NUMBER_INPUT_WIDTH;
    input.style.marginBottom = MARGIN;

    parentElement.appendChild(input);
    addBR(parentElement);

    return input;
}

function createCloseButton(document, parentElement, isIndex) {

    if (isIndex) {
        return null;
    }

    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    closeButton.style.cursor = 'pointer';
    closeButton.style.float = 'right';

    parentElement.appendChild(closeButton);
    addBR(parentElement);

    return closeButton;
}

function createCopyButton(document, parentElement) {

    const copyButton = document.createElement('button');
    copyButton.innerHTML = '&#9112;';
    copyButton.style.cursor = 'pointer';
    copyButton.style.float = 'right';

    parentElement.appendChild(copyButton);

    return copyButton;
}

function createDomainInput(document, parentElement, isIndex) {

    createLabel(document, parentElement, 'domainInput', 'Domain: ');
    addBR(parentElement);

    if (isIndex) {
        return createInputText(document, parentElement, 'domainInput', 'Domain...');
    }

    const domainInput = document.createElement('select');
    domainInput.id = 'domainInput';
    domainInput.style.width = INPUT_WIDTH;
    domainInput.style.marginBottom = MARGIN;
    const parentDomainsChain = getParentDomainsChain();
    for (var i = 0; i < parentDomainsChain.length; i++) {
        var option = document.createElement('option');
        option.value = parentDomainsChain[i];
        option.text = parentDomainsChain[i];
        domainInput.appendChild(option);
    }

    parentElement.appendChild(domainInput);
    addBR(parentElement);

    return domainInput;
}

function createUserNameInput(document, parentElement, userNameField) {

    createLabel(document, parentElement, 'userNameInput', 'User Name: ');
    addBR(parentElement);

    const userName = userNameField ? userNameField.value : "";

    return createInputText(document, parentElement, 'userNameInput', 'User name...', userName);
}

function createPasswordInput(document, parentElement, label) {

    createLabel(document, parentElement, label + 'PasswordInput', label + ' password: ');
    addBR(parentElement);

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

    parentElement.appendChild(passwordContainer);

    return passwordInput;
}

function createOptionsContainer(document, parentElement) {

    const optionsButton = document.createElement('button');
    optionsButton.innerHTML = 'More options...';
    optionsButton.style.cursor = 'pointer';
    optionsButton.style.marginBottom = MARGIN;

    parentElement.appendChild(optionsButton);
    addBR(parentElement);

    const optionsContainer = document.createElement('div');
    optionsContainer.style.display = 'block';
    parentElement.appendChild(optionsContainer);

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

function createPasswordLengthInput(document, parentElement) {

    createLabel(document, parentElement, 'passwordLengthInput', 'Passord Length: ');

    return createInputNumber(document, parentElement, 'passwordLengthInput', GENERATED_PASSWORD_LENGTH);
}

function createChekBox(document, parentElement, label) {

    createLabel(document, parentElement, label + 'CheckBox', label + ' characters: ');

    const checkBox = document.createElement('input');
    checkBox.id = label + 'CheckBox';
    checkBox.type = 'CheckBox';
    checkBox.checked = true;
    checkBox.style.marginBottom = MARGIN;
    checkBox.style.cursor = 'pointer';

    parentElement.appendChild(checkBox);
    addBR(parentElement);

    return checkBox;
}


function createCodesCardLabel(document, parentElement, codesCardCellLabel) {

    return createLabel(document, parentElement, 'codesCardInput', codesCardCellLabel + ":");
}

function createCodesCardInput(document, parentElement, codesCardCellLabel) {

    const input = createInputText(document, parentElement, 'codesCardInput', codesCardCellLabel + "...");
    input.style.width = LABEL_WIDTH;
    return input;
}

function createCodesCardLengthInput(document, parentElement) {

    createLabel(document, parentElement, 'codesCardLengthInput', 'Codes Card Length: ');

    return createInputNumber(document, parentElement, 'codesCardLengthInput', NUMBER_CODES_CARD_CELLS);
}