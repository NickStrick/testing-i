const enhancement = require('./enhancement.js');

describe('success tests', () => {

    it('should have valid object', () => {
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

        expect(() => enhancement.success({ ...item, enhancement: '20' })).toThrow();
        expect(enhancement.success({ ...item, enhancement: 10 }).enhancement).toBe(10);
        expect(enhancement.success({ ...item, enhancement: 10, durability: 100 }).enhancement).toBe(11);
        expect(enhancement.success({ ...item, enhancement: 10, durability: 100 }).name).toBe('[+11] name');
        expect(enhancement.success({ ...item, enhancement: 19 }).name).toBe('[PEN] name');

        expect(actual.enhancement).toEqual(18);
        expect(actual.name).toEqual(`[TRI] ${item.defaultName}`);

    })

    it('should have Restrictions', () => {
        const item = {
            name: '[DUO] name',
            type: 'weapon',
            durability: 9,
            enhancement: 17,
            defaultName: 'name'
        }

        const actual = enhancement.success(item)


        expect(actual.enhancement).toBe(17);
        expect(enhancement.success({ ...item, durability: 20 }).enhancement).toBe(18);
        expect(enhancement.success({ ...item, enhancement: 10, durability: 23 }).enhancement).toBe(10);
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

        expect(enhancement.fail({ ...item, enhancement: 15 }).durability).toBe(10)

        expect(enhancement.fail({ ...item, enhancement: 10 }).durability).toBe(15)
        expect(enhancement.fail({ ...item, enhancement: 5, durability: 100 }).enhancement).toBe(6)
        expect(enhancement.fail({ ...item, enhancement: 5, durability: 100 }).durability).toBe(100)

    })
})

describe('Repair tests', () => {

    test('repair working', () => {

        const item = {
            name: '[DUO] name',
            type: 'weapon',
            durability: 20,
            enhancement: 17,
            defaultName: 'name'
        }
        const actual = enhancement.repair(item)

        expect(actual.durability).toBe(100);
        expect(actual.name).toBe('[DUO] name');

    })
})