import * as IMAGE from './Image';


export const getItemById = (id) => {
    return ITEM[id];
}

export const getNameById = (id) => {
    return ITEM[id].name;
}

export const getIconById = (id) => {
    return ITEM[id].icon;
}

export const getValueById = (id) => {
    return ITEM[id].value;
}

export const ITEM = {
    '0': {
        id: 0,
        name: 'Coins',
        value: 1,
        icon: IMAGE.ITEMS.Coins,
    },
    '1': {
        id: 1,
        name: 'Logs',
        value: 3,
        icon: IMAGE.ITEMS.Logs,
    },
    '2': {
        id: 2,
        name: 'Oak Logs',
        value: 6,
        icon: IMAGE.ITEMS.OakLogs,
    },
    '3': {
        id: 3,
        name: 'Willow Logs',
        value: 10,
        icon: IMAGE.ITEMS.WillowLogs,
    },
    '4': {
        id: 4,
        name: 'Maple Logs',
        value: 15,
        icon: IMAGE.ITEMS.MapleLogs,
    },
    '5': {
        id: 5,
        name: 'Yew Logs',
        value: 20,
        icon: IMAGE.ITEMS.YewLogs,
    },
    '6': {
        id: 6,
        name: 'Arbutus Logs',
        value: 30,
        icon: IMAGE.ITEMS.ArbutusLogs,
    },
    '7': {
        id: 7,
        name: 'Bronze Axe',
        value: 20,
        icon: IMAGE.ITEMS.BronzeAxe,
        skill: {
            '0': {
                level: 1,
                boost: 0,
            }
        },
    },
    '8': {
        id: 8,
        name: 'Iron Axe',
        value: 40,
        icon: IMAGE.ITEMS.IronAxe,
        skill: {
            '0': {
                level: 5,
                boost: 0.1,
            }
        },
    },
    '9': {
        id: 9,
        name: 'Steel Axe',
        value: 200,
        icon: IMAGE.ITEMS.SteelAxe,
        skill: {
            '0': {
                level: 10,
                boost: 0.3,
            }
        },
    },
    '10': {
        id: 10,
        name: 'Kleidite Axe',
        value: 1000,
        icon: IMAGE.ITEMS.KleiditeAxe,
        skill: {
            '0': {
                level: 20,
                boost: 0.5,
            }
        },
    },
    '11': {
        id: 11,
        name: 'Thidite Axe',
        value: 7000,
        icon: IMAGE.ITEMS.ThiditeAxe,
        skill: {
            '0': {
                level: 30,
                boost: 1,
            }
        },
    },
    '12': {
        id: 12,
        name: 'Syrium Axe',
        value: 21000,
        icon: IMAGE.ITEMS.SyriumAxe,
        skill: {
            '0': {
                level: 40,
                boost: 2,
            }
        },
    },
};