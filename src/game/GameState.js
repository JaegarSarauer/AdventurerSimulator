import {USER, User} from '../state/User.js';
import { ITEM } from '../def/Item';
import { SKILL } from '../def/Skill';
import { ToastAndroid} from 'react-native';

export class GameState {
    constructor() {
        this.playerCost = 100;
    }

    getPlayerCost() {
        if (USER.totalPlayers === 0)
            return 0;
        return this.playerCost;
    }

    buyPlayer(name) {
        if (USER.totalPlayers === 0) {
            USER.addPlayer(name);
            return true;
        }
        if (USER.getBankItemAmount(ITEM.Coins) >= this.playerCost) {
            USER.removeBankItem(ITEM.Coins, this.playerCost);
            this.playerCost *= 3;
            USER.addPlayer(name);
            return true;
        }
        ToastAndroid.show('Not enough coins!', ToastAndroid.SHORT);
        return false;
    }
}

export const GAMESTATE = new GameState();