import { duplicatesError } from './extending/duplicatesError.js';
import { existError } from './extending/existError.js';
import { InvalidError } from './extending/InvalidError.js';

export const _existKey = async (key) => {
    const existErrorMessage = `key at ${key} isn't exist on database.`
    throw new existError(`${existErrorMessage}`);
};
export const _duplicatesData = async (key) => {
    const duplicatesErrorMessage = `key at ${key} is duplicate some data on database.`
    throw new duplicatesError(`${duplicatesErrorMessage}`);
}
export const _InvalidKey = async (key) => {
    const InvalidErrorMessage = `Invalid signature for profile key. <${key}>`
    throw new InvalidError(`${InvalidErrorMessage}`);
}