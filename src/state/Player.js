import React from 'react';
import {USER, User} from './User';
import { AsyncStorage } from 'react-native';
import { ITEM } from '../def/Item';
import { SKILL } from '../def/Skill';

const STORES = {
    Items: '@PlayerItems',
    Bank: '@PlayerBank',
    Skills: '@PlayerSkills',
}

const XP_TABLE = [0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333, 111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431];

export class Player {
    constructor(name) {
        this.name = name;
        this.items = [];
        this.skills = [{
            name: 'Woodcutting',
            xp: 0,
            level: 1,
        }];
    }

    packSaveDataJSON() {
        //pack
        let allData = {
            items: this.items,
            bank: this.bank,
            skills: this.skills,
            name: this.name,
        };
        //stringify
        return JSON.stringify(allData);
    }

    unpackSaveDataJSON(data) {
        let results = JSON.parse(data);
        this.items = results.items;
        this.bank = results.bank;
        this.skills = results.skills;
        this.name = results.name;
        //update definitions here maybe?
    }

    addXP(skill, xp) {
        this.skills[skill.id].xp += xp;
        this.skills[skill.id].level = this.calcLevel(this.skills[skill.id].level, this.skills[skill.id].xp);
    }

    hasLevel(skill, level) {
        return this.skills[skill.id].level >= level;
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

    addItem(item, amount = 1) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items[i].amount += amount;
                return true;
            }
        }
        let add = item;
        add.amount = amount;
        this.items.push(add);
        return true;
    }

    hasItem(item, amount = 1) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                return this.items[i].amount < amount;
            }
        }
        return false;
    }

    getItemAmount(item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                return this.items[i].amount;
            }
        }
        return 0;
    }

    removeItem(item, amount = 1) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                let removed = amount + Math.min(0, (this.items[i].amount - amount));
                this.items[i].amount -= amount;
                if (this.items[i].amount <= 0)
                    this.items.splice(i, 1);
                return removed;
            }
        }
    }

    /*
    Puts item in user bank
    */
    depoistItem(item, amount = 1) {
        let removed = removeItem(item, amount);
        USER.addBankItem(item, removed);
    }

    /*
    Takes item from user bank.
    */
    withdrawItem(item, amount = 1) {
        let removed = USER.removeBankItem(item, amount);
        addItem(item, removed);
    }
}