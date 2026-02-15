import { describe, expect, it } from 'vitest';
import Card from '../card.js';

describe('Card', () => {
  describe('constructor / parseCard', () => {
    it('인덱스 0을 RED OVAL SOLID 1으로 파싱한다', () => {
      const card = new Card(0);
      expect(card.color).toBe('RED');
      expect(card.shape).toBe('OVAL');
      expect(card.shading).toBe('SOLID');
      expect(card.count).toBe(1);
    });

    it('인덱스 80(마지막 카드)을 GREEN SQUIGGLE STRIPED 3으로 파싱한다', () => {
      const card = new Card(80);
      expect(card.color).toBe('GREEN');
      expect(card.shape).toBe('SQUIGGLE');
      expect(card.shading).toBe('STRIPED');
      expect(card.count).toBe(3);
    });

    it('인덱스 40(중간 카드)을 올바르게 파싱한다', () => {
      const card = new Card(40);
      expect(card.color).toBe('BLUE');
      expect(card.shape).toBe('DIAMOND');
      expect(card.shading).toBe('OPEN');
      expect(card.count).toBe(2);
    });
  });

  describe('cardDataToInt', () => {
    it('RED OVAL SOLID 1 → 0', () => {
      expect(Card.cardDataToInt('RED', 'OVAL', 'SOLID', 1)).toBe(0);
    });

    it('GREEN SQUIGGLE STRIPED 3 → 80', () => {
      expect(Card.cardDataToInt('GREEN', 'SQUIGGLE', 'STRIPED', 3)).toBe(80);
    });

    it('parseCard의 역변환이다', () => {
      for (let i = 0; i < 81; i++) {
        const card = new Card(i);
        expect(
          Card.cardDataToInt(card.color, card.shape, card.shading, card.count),
        ).toBe(i);
      }
    });
  });

  describe('getTypeIndexes', () => {
    it('인덱스 0 → [0,0,0,0]', () => {
      expect(Card.getTypeIndexes(0)).toEqual([0, 0, 0, 0]);
    });

    it('인덱스 80 → [2,2,2,2]', () => {
      expect(Card.getTypeIndexes(80)).toEqual([2, 2, 2, 2]);
    });
  });

  describe('isSet', () => {
    it('모든 속성이 같은 세 카드는 SET이다', () => {
      // 0=[0,0,0,0], 1=[0,0,0,1], 2=[0,0,0,2] → count만 모두 다름, 나머지 같음
      expect(Card.isSet([0, 1, 2])).toBe(true);
    });

    it('SET이 아닌 세 카드를 올바르게 판별한다', () => {
      // 0=[0,0,0,0], 1=[0,0,0,1], 4=[0,0,1,1] → shading 0,0,1 → 불일치
      expect(Card.isSet([0, 1, 4])).toBe(false);
    });

    it('모든 속성이 다른 세 카드도 SET이다', () => {
      // 0=[0,0,0,0], 40=[1,1,1,1], 80=[2,2,2,2]
      expect(Card.isSet([0, 40, 80])).toBe(true);
    });
  });

  describe('predictSetCard', () => {
    it('두 카드로부터 SET을 완성하는 세 번째 카드를 예측한다', () => {
      expect(Card.predictSetCard(0, 1)).toBe(2);
    });

    it('모든 속성이 다른 경우도 예측한다', () => {
      expect(Card.predictSetCard(0, 40)).toBe(80);
    });
  });

  describe('getSets', () => {
    it('테이블에서 SET을 찾는다', () => {
      const table = [0, 1, 2, 3, 4];
      const sets = Card.getSets(table, false);
      expect(sets.length).toBeGreaterThan(0);
      // 첫 번째 SET: 인덱스 1,2,3 (0-based로 0,1,2 카드)
      expect(sets[0]).toEqual([1, 2, 3]);
    });

    it('findOneSet=true이면 하나만 찾고 멈춘다', () => {
      const table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const sets = Card.getSets(table, true);
      expect(sets.length).toBe(1);
    });

    it('SET이 없으면 빈 배열을 반환한다', () => {
      // 0=[0,0,0,0], 1=[0,0,0,1], 4=[0,0,1,1] → SET 불가
      const sets = Card.getSets([0, 1, 4], false);
      expect(sets.length).toBe(0);
    });
  });
});
