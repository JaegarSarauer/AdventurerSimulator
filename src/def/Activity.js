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
        return .75 + USER.players.get()[viewingPlayerID].skills.get()[SKILL.Woodcutting.id].level * .25;
    },
    TREE: {
        name: 'Cutting tree',
        progress: 0,
        maxProgress: 8,
        reward: {
            item: ITEM.Logs,
            itemAmount: 1,
            xp: 5
        }
    },
    OAKTREE: {
        name: 'Cutting oak tree',
        progress: 0,
        maxProgress: 24,
        reward: {
            item: ITEM.OakLogs,
            itemAmount: 1,
            xp: 15
        }
    },
    WILLOWTREE: {
        name: 'Cutting willow tree',
        progress: 0,
        maxProgress: 56,
        reward: {
            item: ITEM.WillowLogs,
            itemAmount: 1,
            xp: 35
        }
    },
    MAPLETREE: {
        name: 'Cutting maple tree',
        progress: 0,
        maxProgress: 112,
        reward: {
            item: ITEM.MapleLogs,
            itemAmount: 1,
            xp: 75
        }
    },
    YEWTREE: {
        name: 'Cutting yew tree',
        progress: 0,
        maxProgress: 356,
        reward: {
            item: ITEM.YewLogs,
            itemAmount: 1,
            xp: 120
        }
    },
    ARBUTUSTREE: {
        name: 'Cutting arbutus tree',
        progress: 0,
        maxProgress: 880,
        reward: {
            item: ITEM.ArbutusLogs,
            itemAmount: 1,
            xp: 185
        }
    },
    action: (TREE_TYPE, playerID) => {
        let progress = 0;
        let update = () => {
            progress += WOODCUTTING.getProgressIncrement(playerID);
            if (progress >= TREE_TYPE.maxProgress) {
                progress -= TREE_TYPE.maxProgress;
                USER.players.value[playerID].addItem(TREE_TYPE.reward.item, TREE_TYPE.reward.itemAmount);
                USER.players.value[playerID].addXP(SKILL.Woodcutting, TREE_TYPE.reward.xp);
            }
        };
        TREE_TYPE.timer = setInterval(update, TICK_TIME);
        return TREE_TYPE;
    }
};