/*
Ther user controller itself. oversees each Player.
*/

import React from 'react';
import { AsyncStorage } from 'react-native';
import { ITEM } from '../def/Item';
import { SKILL } from '../def/Skill';
import {Player } from './Player';

export class User {
    constructor() {
        //All the player the user has, used for knowing how many players to load.
        this.totalPlayers = 0;

        //Array of player objects.
        this.players = [];

        //All players share this bank, you have access to this for buying things that require resources.
        this.bank = [];

        //The id of the player were looking through in the UI.
        this.viewingPlayer = -1;

        this.loadData();
        this.autosaveLoop = setInterval(() => {
            this.saveData();
        }, 30000);
    }

    async saveData() {
        try {
            await AsyncStorage.setItem("@UserData", this.packSaveDataJSON());
            for (let i = 0; i < this.totalPlayers; i++) {
                let setter = "@Player" + i;
                await AsyncStorage.setItem(setter, this.players[i].packSaveDataJSON());
            }
        } catch (error) {
            console.error(error);
        }
    }

    async loadData() {
        try {
            let userData = await AsyncStorage.getItem("@UserData");
            if (userData !== null) {
                this.unpackSaveDataJSON(userData);
                for (let i = 0; i < this.totalPlayers; i++) {
                    try {
                        let getter = "@Player" + i;
                        let player = await AsyncStorage.getItem(getter);
                        if (player !== null) {
                            let newPlayer = new Player('');
                            newPlayer.unpackSaveDataJSON(player);
                            this.players.push(newPlayer);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    packSaveDataJSON() {
        //pack
        let dataPack = {
            totalPlayers: this.totalPlayers,
            bank: this.bank
            //other misc data for the user
        };
        //stringify
        return JSON.stringify(dataPack);
    }

    unpackSaveDataJSON(data) {
        let result = JSON.parse(data);
        this.totalPlayers = result.totalPlayers;
        this.bank = result.bank;
    }

    addPlayer(name) {
        let newPlayer = new Player(name);
        //modify here if needed
        this.players.push(newPlayer);
        this.totalPlayers++;
    }

    addBankItem(item, amount = 1) {
        for (let i = 0; i < this.bank.length; i++) {
            if (this.bank[i].id === item.id) {
                this.bank[i].amount += amount;
                return true;
            }
        }
        let add = item;
        add.amount = amount;
        this.bank.push(add);
        return true;
    }

    hasBankItem(item, amount = 1) {
        for (let i = 0; i < this.bank.length; i++) {
            if (this.bank[i].id === item.id) {
                return this.bank[i].amount < amount;
            }
        }
        return false;
    }

    getBankItemAmount(item) {
        for (let i = 0; i < this.bank.length; i++) {
            if (this.bank[i].id === item.id) {
                return this.bank[i].amount;
            }
        }
        return 0;
    }

    removeBankItem(item, amount = 1) {
        for (let i = 0; i < this.bank.length; i++) {
            if (this.bank[i].id === item.id) {
                let removed = amount + Math.min(0, (this.items[i].amount - amount));
                this.bank[i].amount -= amount;
                if (this.bank[i].amount <= 0)
                    this.bank.splice(i, 1);
                    return removed;
            }
        }
    }
}

export const USER = new User();