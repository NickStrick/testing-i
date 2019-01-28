module.exports = {
    success,
    fail,
    repair,
}

function success(item) {
    let resItem = { ...item };
    let enhancement = resItem.enhancement + 1;
    if (resItem.enhancement < 0 || resItem.enhancement > 20) return resItem;
    if (resItem.enhancement < 15 && resItem.durability < 25) {
        return resItem;
    } else if (resItem.enhancement >= 15 && resItem.durability < 10) {
        return resItem;
    }
    createName(enhancement, resItem);

    return { ...resItem, enhancement: enhancement }
}

function fail(item) {
    let resItem = { ...item };
    if (resItem.type === 'armor' && resItem.enhancement <= 5) {
        return success(item);
    }
    if (resItem.type === 'weapon' && resItem.enhancement <= 7) {
        return success(item);
    }

    const en = resItem.enhancement;
    if (en <= 14) {
        resItem.durability -= 5;
    } else if (en > 14) {
        resItem.durability -= 10;
        if (en > 16) {
            resItem.enhancement--;
        }
    }

    createName(resItem.enhancement, resItem);

    return resItem;

}

function repair(item) {
    return { ...item, durability: 100 };
}

function canEnhance(item) {

}

function createName(en, item) {
    switch (en) {
        case 16:
            item.name = `[PRI] ${item.defaultName}`
            break;
        case 17:
            item.name = `[DUO] ${item.defaultName}`
            break;
        case 18:
            item.name = `[TRI] ${item.defaultName}`
            break;
        case 19:
            item.name = `[TET] ${item.defaultName}`
            break;
        case 20:
            item.name = `[PEN] ${item.defaultName}`
            break;
        default:

            if (en === 0) {
                item.name = `${item.defaultName}`
            } else {
                item.name = `[+${en}] ${item.defaultName}`
            }

    }
}