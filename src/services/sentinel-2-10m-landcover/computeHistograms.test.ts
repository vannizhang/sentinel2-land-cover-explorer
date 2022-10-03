import { convertNumOfPixel2Acres } from './computeHistograms';

describe('test convertNumOfPixel2Acres', () => {
    test('convertNumOfPixel2Acres', () => {
        const output = convertNumOfPixel2Acres(1);
        expect(output).toBe(0);
    });
});
