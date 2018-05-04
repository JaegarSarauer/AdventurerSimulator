import { SKILL } from '../def/Skill';
import { ITEM } from '../def/Item';
import { PLAYER, Player } from '../state/Player';
import { USER, User } from '../state/User';
import { GAMESTATE, GameState, TICK_TIME} from '../game/GameState';

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
    TREE: {
        name: 'Cutting tree',
        progress: 0,
        maxProgress: 8,
        reward: {
            itemID: 1,
            itemAmount: 1,
            xp: 5
        }
    },
    OAKTREE: {
        name: 'Cutting oak tree',
        progress: 0,
        maxProgress: 24,
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
        let update = () => {
            TREE_TYPE.progress += WOODCUTTING.getProgressIncrement(playerID);
            if (TREE_TYPE.progress >= TREE_TYPE.maxProgress) {
                TREE_TYPE.progress -= TREE_TYPE.maxProgress;
                USER.players.value[playerID].addItem(TREE_TYPE.reward.itemID, TREE_TYPE.reward.itemAmount);
                USER.players.value[playerID].addXP(0, TREE_TYPE.reward.xp);
            }
        };
        TREE_TYPE.timer = setInterval(update, TICK_TIME);
        return TREE_TYPE;
    }
};