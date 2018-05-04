import {USER, User} from '../state/User.js';
import { ITEM } from '../def/Item';
import { SKILL } from '../def/Skill';
import { ToastAndroid} from 'react-native';

export const TICK_TIME = 250;

export class GameState {
    constructor() {
    }

    getPlayerCost() {
        return Math.pow(USER.totalPlayers.get(), 3) * 100;
    }

    buyPlayer(name) {
        let cost = this.getPlayerCost();
        if (USER.getBankItemAmount(0) >= cost) {
            USER.removeBankItem(0, cost);
            USER.addPlayer(name);
            return true;
        }
        ToastAndroid.show('Not enough coins!', ToastAndroid.SHORT);
        return false;
    }
}

export const GAMESTATE = new GameState();