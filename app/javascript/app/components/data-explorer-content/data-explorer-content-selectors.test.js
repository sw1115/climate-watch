import { getDataSection } from './data-explorer-content-selectors';

const section = 'section';
const data = { section: {} };
const sectionData = {};
describe('Data explorer content selectors', () => {
  describe('getDataSection', () => {
    it('gets the data from the sector', () => {
      const selected = getDataSection.resultFunc(data, section);
      expect(selected).toEqual(sectionData);
    });
  });
});
