const listHelper = require('../utils/list_helper')

describe('list helper tests', () => {
    it('should test dummy function', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})