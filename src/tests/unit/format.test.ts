import {
  formatCurrency,
  formatNumber,
  formatCompactNumber,
  formatBytes,
  formatPercentage,
  truncateText,
  slugify,
  capitalize,
} from '@/lib/utils/format';

describe('format utilities', () => {
  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('formats EUR correctly', () => {
      expect(formatCurrency(1234.56, 'EUR', 'de-DE')).toContain('1.234,56');
    });
  });

  describe('formatNumber', () => {
    it('formats numbers with locale separators', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });
  });

  describe('formatCompactNumber', () => {
    it('formats large numbers compactly', () => {
      expect(formatCompactNumber(1200000)).toBe('1.2M');
    });
  });

  describe('formatBytes', () => {
    it('formats bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1048576)).toBe('1 MB');
    });
  });

  describe('formatPercentage', () => {
    it('formats percentages', () => {
      expect(formatPercentage(75.5)).toBe('75.5%');
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
    });

    it('returns short text as-is', () => {
      expect(truncateText('Hi', 10)).toBe('Hi');
    });
  });

  describe('slugify', () => {
    it('converts text to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Some Title Here!')).toBe('some-title-here');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });
  });
});
