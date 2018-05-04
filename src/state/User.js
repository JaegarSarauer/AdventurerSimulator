/*
Ther user controller itself. oversees each Player.
*/

import React from 'react';
import { AsyncStorage } from 'react-native';
import { ITEM } from '../def/Item';
import { SKILL } from '../def/Skill';
import { Player } from './Player';
import * as Activities from '../def/Activity';
import Subscriber from '../util/Subscriber';

export class User {
    constructor() {
        //All the player the user has, used for knowing how many players to load.
        this.totalPlayers = new Subscriber(0);

        //Array of player objects.
        this.players = new Subscriber([]);

        //All players share this bank, you have access to this for buying things that require resources.
        //stored as {id: {amt}, id: {amt}}
        this.bank = new Subscriber({});

        //The id of the player were looking through in the UI.
        this.viewingPlayer = new Subscriber(-1);

        this.addBankItem(7, 1);

        this.loadData();
        this.autosaveLoop = setInterval(() => {
            this.saveData();
        }, 30000);
    }

    async saveData() {
        try {
            await AsyncStorage.setItem("@UserData", this.packSaveDataJSON());
            for (let i = 0; i < this.totalPlayers.value; i++) {
                let setter = "@Player" + i;
                await AsyncStorage.setItem(setter, this.players.value[i].packSaveDataJSON());
            }
        } catch (error) {
            throw error;
        }
    }

    async loadData() {
        try {
            let userData = await AsyncStorage.getItem("@UserData");
            if (userData !== null) {
                this.unpackSaveDataJSON(userData);
                for (let i = 0; i < this.totalPlayers.value; i++) {
                    try {
                        let getter = "@Player" + i;
                        let player = await AsyncStorage.getItem(getter);
                        if (player !== null) {
                            let newPlayer = new Player('');
                            newPlayer.unpackSaveDataJSON(player);
                            this.players.value.push(newPlayer);
                            this.players.trigger();
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }

    packSaveDataJSON() {
        //pack
        let dataPack = {
            totalPlayers: this.totalPlayers.value,
            bank: this.bank.value
            //other misc data for the user
        };
        //stringify
        return JSON.stringify(dataPack);
    }

    unpackSaveDataJSON(data) {
        let result = JSON.parse(data);
        this.totalPlayers = new Subscriber(result.totalPlayers);
        this.bank = new Subscriber(result.bank);
    }

    getCurrentPlayer() {
        return this.players.value[this.viewingPlayer.value];
    }

    addPlayer(name) {
        let newPlayer = new Player(name);
        //modify here if needed
        this.players.value.push(newPlayer);
        this.totalPlayers.set(this.totalPlayers.value + 1);
        this.players.trigger();
    }

    addBankItem(id, amount = 1) {
        let item = this.bank.value[id];
        if (item != null) {
            this.bank.value[id].amount += amount;
        } else {
            this.bank.value[id] = {amount};
        }
        this.bank.trigger();
        return true;
    }

    hasBankItem(item, amount = 1) {
        if (this.bank.value[id] != null) {
            return this.bank.value[id].amount >= amount;
        }
        return false;
    }

    getBankItemAmount(item) {
        if (this.bank.value[id] != null) {
            return this.bank.value[id].amount;
        }
        return 0;
    }

    removeBankItem(item, amount = 1) {
        if (this.bank.value[id] != null) {
            let removed = amount + Math.min(0, (this.bank.value[id].amount - amount));
            this.bank.value[id].amount -= removed;
            if (this.bank.value[id].amount <= 0)
                delete this.bank.value[id];
            this.bank.trigger();
            return removed;
        }
        return 0;
    }
}

export const USER = new User();