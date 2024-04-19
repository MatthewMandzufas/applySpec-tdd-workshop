const R = require('ramda');
import applySpec from './applySpec';

describe('applySpec', () => {
    it('works with an empty spec', () => {
        expect(applySpec({})()).toEqual({});
    });
    it('works with unary functions', () => {
        expect(applySpec({ v: R.inc, u: R.dec })(1)).toEqual({
            v: 2,
            u: 0,
        });
    });
    it('works with binary functions', () => {
        expect(applySpec({ sum: R.add })(1, 2)).toEqual({ sum: 3 });
    });
});
