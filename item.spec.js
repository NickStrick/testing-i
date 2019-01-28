const enhancement = require('./enhancement.js');

describe('success tests', () => {

    test('valid object', () => {
        const item = {
            name: 'name',
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
        expect(actual.enhancement).toEqual(18);
        expect(actual.name).toEqual(`[TRI] ${item.defaultName}`);

    })
})