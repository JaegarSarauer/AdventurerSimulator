import * as SKILL from '../def/Skill';
import * as ITEM from '../def/Item';
import { PLAYER, Player } from '../state/Player';
import { USER, User } from '../state/User';
import { GAMESTATE, GameState, TICK_TIME} from '../game/GameState';
import {ToastAndroid} from 'react-native';


export const IDLE = {
    IDLE: {
        name: 'Idle',
        progress: 0,
        maxProgress: 0,
    },
    action: (IDLE_TYPE) => {
        return IDLE_TYPE;
    }
}

export const WOODCUTTING = {
    getProgressIncrement: (viewingPlayerID) => {
        return .75 + USER.players.get()[viewingPlayerID].skills.get()[0].level * .25;
    },
    getBestAxe: (viewingPlayerID) => {
        let wcLevel = USER.players.get()[viewingPlayerID].skills.get()[0].level;
        let bestItem = USER.players.get()[viewingPlayerID].getBestItem((id1, id2) => {
            let i1 = ITEM.getItemById(id1);
            let i2 = ITEM.getItemById(id2);
            if (i1 != null && i1.skill != null && i1.skill[0] != null && i1.skill[0].level <= wcLevel) {
                if (i2 != null && i2.skill != null && i2.skill[0] != null && i2.skill[0].level <= wcLevel) {
                    if (i1.skill[0].boost > i2.skill[0].boost)
                        return id1;
                    return id2;
                } else {
                    return id1;
                }
            } else if (i2 != null && i2.skill != null && i2.skill[0] != null && i2.skill[0].level <= wcLevel) {
                    return id2;
            }
            return -1;
        });
        return bestItem;
    },
    TREE: {
        name: 'Cutting tree',
        progress: 0,
        maxProgress: 24,
        reward: {
            itemID: 1,
            itemAmount: 1,
            xp: 5
        }
    },
    OAKTREE: {
        name: 'Cutting oak tree',
        progress: 0,
        maxProgress: 32,
        reward: {
            itemID: 2,
            itemAmount: 1,
            xp: 15
        }
    },
    WILLOWTREE: {
        name: 'Cutting willow tree',
        progress: 0,
        maxProgress: 56,
        reward: {
            itemID: 3,
            itemAmount: 1,
            xp: 35
        }
    },
    MAPLETREE: {
        name: 'Cutting maple tree',
        progress: 0,
        maxProgress: 112,
        reward: {
            itemID: 4,
            itemAmount: 1,
            xp: 75
        }
    },
    YEWTREE: {
        name: 'Cutting yew tree',
        progress: 0,
        maxProgress: 356,
        reward: {
            itemID: 5,
            itemAmount: 1,
            xp: 120
        }
    },
    ARBUTUSTREE: {
        name: 'Cutting arbutus tree',
        progress: 0,
        maxProgress: 880,
        reward: {
            itemID: 6,
            itemAmount: 1,
            xp: 185
        }
    },
    action: (TREE_TYPE, playerID) => {
        let type = JSON.parse(JSON.stringify(TREE_TYPE));
        type.axe = ITEM.getItemById(WOODCUTTING.getBestAxe(playerID));
        if (type.axe == null) {
            ToastAndroid.show('You do not have an axe with a woodcutting level you can use.', ToastAndroid.SHORT);
            return IDLE.action(IDLE.IDLE);
        }
        let update = () => {
            if (type.axe == null) {
                User.players.value[playerID].stopActivity();
                return;
            }
            type.progress += WOODCUTTING.getProgressIncrement(playerID) + type.axe.skill[0].boost;
            if (type.progress >= type.maxProgress) {
                type.progress -= type.maxProgress;
                USER.players.value[playerID].addItem(type.reward.itemID, type.reward.itemAmount);
                USER.players.value[playerID].addXP(0, type.reward.xp);
                type.axe = ITEM.getItemById(WOODCUTTING.getBestAxe(playerID));
            }
            USER.players.value[playerID].activity.trigger();
        };
        type.timer = setInterval(update, TICK_TIME);
        return type;
    }
};