import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';

export const keyBindingFunction = (event) => {
    if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey && event.key === 's') {
        return 'strikethrough';
    }
    if (event.shiftKey && event.keyCode === 13) {
        return 'shift-enter';
    }
    return getDefaultKeyBinding(event);
};