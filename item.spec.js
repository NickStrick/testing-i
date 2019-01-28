const enhancement = require('./enhancement.js');

describe('success tests', () => {

    test('valid object', () => {
        const item = {
            name: '[DUO] name',
            type: 'weapon',
            durability: 20,
            enhancement: 17,
            defaultName: 'name'
        }

        const actual = enhancement.success(item)

        expect(actual).toMatchObject({
            name: '[TRI] name',
            type: 'weapon',
            durability: 20,
            enhancement: 18,
            defaultName: 'name'
        });

        expect(enhancement.success({ ...item, durability: 10 })).toMatchObject({
            name: '[TRI] name',
            type: 'weapon',
            durability: 10,
            enhancement: 18,
            defaultName: 'name'
        });
        // expect(actual.enhancement).toEqual(18);
        // expect(actual.name).toEqual(`[DUO] ${item.defaultName}`);

    })
})
describe('fail tests', () => {

    test('valid object', () => {
        const item = {
            name: '[DUO] name',
            type: 'weapon',
            durability: 20,
            enhancement: 17,
            defaultName: 'name'
        }

        const actual = enhancement.fail(item)

        expect(actual).toMatchObject({
            name: '[PRI] name',
            type: 'weapon',
            durability: 10,
            enhancement: 16,
            defaultName: 'name'
        });

    })
})