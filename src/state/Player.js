import React from 'react';
import {USER, User} from './User';
import { AsyncStorage } from 'react-native';
import { ITEM } from '../def/Item';
import { SKILL } from '../def/Skill';
import * as Activities from '../def/Activity';
import Subscriber from '../util/Subscriber';

const STORES = {
    Items: '@PlayerItems',
    Bank: '@PlayerBank',
    Skills: '@PlayerSkills',
}

const XP_TABLE = [0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333, 111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431];

export class Player {
    constructor(name) {
        //the player/adventurer's name
        this.name = new Subscriber(name);

        //the adventurers total level
        this.totalLevel = new Subscriber(0);

        //current action that this player is doing. Activities manage themselves.
        this.activity = new Subscriber(Activities.IDLE.action(Activities.IDLE.IDLE));

        //the adventurers items, stored as {id: {amt}, id: {amt}}
        this.items = new Subscriber({});

        //the adventurers skills and xp as {id: {xp, lvl}, id: {xp, lvl}}
        this.skills = new Subscriber({
            '0': { //woodcutting
                xp: 0,
                level: 1,
            }
        });
    }

    /*
    Call action first and pass the return into this.
    */
    setActivity(activityResult) {
        if (this.activity.value != null && this.activity.value.timer != null)
            clearInterval(this.activity.value.timer);
        if (this.activity.value != null && this.activity.value.timeout != null)
            clearTimeout(this.activity.value.timeout);
        this.activity.set(activityResult);
    }

    stopActivity() {
        this.setActivity(Activities.IDLE.action(Activities.IDLE.IDLE));
    }

    packSaveDataJSON() {
        //pack
        let allData = {
            items: this.items.get(),
            skills: this.skills.get(),
            activity: this.activity.get(),
            name: this.name.get(),
        };
        //stringify
        return JSON.stringify(allData);
    }

    unpackSaveDataJSON(data) {
        let results = JSON.parse(data);
        this.items = new Subscriber(results.items);
        this.skills = new Subscriber(results.skills);
        this.name = new Subscriber(results.name);
        this.activity = new Subscriber(results.activity);
        this.updateTotalLevel();
    }

    addXP(id, xp) {
        this.skills.value[id].xp += xp;
        let level = this.calcLevel(this.skills.value[id].level, this.skills.value[id].xp);
        if (this.skills.value[id].level != level) {
            this.skills.value[id].level = level; 
            this.updateTotalLevel();
        }
        this.skills.trigger();
    }

    updateTotalLevel() {
        let total = 0;
        for (let i = 0; i < Object.keys(this.skills.value).length; i++) {
            total += this.skills.value[i].level;
        }
        this.totalLevel.set(total);
    }

    hasLevel(id, level) {
        return this.skills.value[id].level >= level;
    }

    calcLevel(curLevel, xp) {
        for (let i = curLevel; i < XP_TABLE.length; i++) {
            if (xp < XP_TABLE[i]) {
                if (xp > XP_TABLE[i - 1]) {
                    return i;
                } else {
                    i -= 2;
                }
            }
        }
        return 1;
    }

    addItem(id, amount = 1) {
        let item = this.items.value[id];
        if (item != null) {
            this.items.value[id].amount += amount;
        } else {
            this.items.value[id] = {amount};
        }
        this.items.trigger();
        return true;
    }

    hasItem(id, amount = 1) {
        if (this.items.value[id] != null) {
            return this.items.value[id].amount >= amount;
        }
        return false;
    }

    getItemAmount(id) {
        if (this.items.value[id] != null) {
            return this.items.value[id].amount;
        }
        return 0;
    }

    /*
    Summary:                Removes items from the adventurer's inventory.

    Return:     [number]    Returns the amount of items removed.
    */
    removeItem(id, amount = 1) {
        if (this.items.value[id] != null) {
            let removed = amount + Math.min(0, (this.items.value[id].amount - amount));
            this.items.value[id].amount -= removed;
            if (this.items.value[id].amount <= 0)
                delete this.items.value[id];
            this.items.trigger();
            return removed;
        }
        return 0;
    }

    /*
    Puts item in user bank
    */
    depositItem(itemID, amount = 1) {
        let removed = this.removeItem(itemID, amount);
        USER.addBankItem(itemID, removed);
    }

    /*
    Takes item from user bank.
    */
    withdrawItem(itemID, amount = 1) {
        let removed = USER.removeBankItem(itemID, amount);
        this.addItem(itemID, removed);
    }
}