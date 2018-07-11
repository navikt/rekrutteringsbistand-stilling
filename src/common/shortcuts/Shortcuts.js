const shortcuts = {};
const groups = {};
let previousKey;
let resetTimout;

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function shouldNotTriggerCallback(element) {
    // stop for input (not checkbox), select, and textarea
    return (element.tagName === 'INPUT' && element.type !== 'checkbox')
        || (element.tagName === 'SELECT')
        || (element.tagName === 'TEXTAREA')
        || (element.contentEditable && element.contentEditable === 'true');
}

function bind(key, callback) {
    shortcuts[key] = callback;
}

function unbind(key) {
    delete shortcuts[key];
}

export function initShortcuts() {
    document.body.addEventListener('keydown', (e) => {
        if (!shouldNotTriggerCallback(e.target)) {
            if (shortcuts[e.key]) {
                shortcuts[e.key](e);
            } else if (previousKey !== undefined) {
                if (shortcuts[`${previousKey} ${e.key}`]) {
                    shortcuts[`${previousKey} ${e.key}`](e);
                }
                clearTimeout(resetTimout);
                previousKey = undefined;
            } else if (isLetter(e.key)) {
                previousKey = e.key;
                resetTimout = setTimeout(() => {
                    previousKey = undefined;
                }, 1000);
            }
        }
    });
}

export function registerShortcuts(group, objects) {
    if (groups[group] === undefined) {
        groups[group] = [];
    }

    for (const key in objects) {
        groups[group].push(key);
        bind(key, (e) => {
            objects[key](e);
        });
    }
}

export function removeShortcuts(group) {
    if (groups[group] !== undefined) {
        for (let i = 0; i < groups[group].length; i += 1) {
            unbind(groups[group][i]);
        }
        groups[group] = [];
    }
}
