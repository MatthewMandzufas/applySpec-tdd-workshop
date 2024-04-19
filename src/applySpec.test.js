import applySpec from './applySpec';

describe('applySpec', () => {
    it('works with an empty spec', () => {
        expect(applySpec({})()).toEqual({});
    });
});
