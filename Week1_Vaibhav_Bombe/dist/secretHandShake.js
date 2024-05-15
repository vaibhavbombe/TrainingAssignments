"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretHandshake = void 0;
function secretHandshake(num) {
    if (num < 1 || num > 31) {
        throw new Error('Number must be between 1 and 31');
    }
    const actions = ['wink', 'double blink', 'close your eyes', 'jump'];
    const binary = num.toString(2).padStart(5, '0');
    const binaryArray = binary.split('');
    binaryArray.reverse();
    let handshake = [];
    for (let i = 0; i < binaryArray.length; i++) {
        if (i === 4) {
            handshake.reverse();
            continue;
        }
        if (binaryArray[i] === '1') {
            handshake.push(actions[i]);
        }
    }
    return handshake;
}
exports.secretHandshake = secretHandshake;
//# sourceMappingURL=secretHandShake.js.map