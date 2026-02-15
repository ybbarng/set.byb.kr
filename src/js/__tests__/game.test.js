import { beforeEach, describe, expect, it } from 'vitest';
import Game from '../game.js';

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  describe('초기화', () => {
    it('81장의 카드로 시작한다', () => {
      expect(game.deck.length + game.table.length).toBe(81);
    });

    it('테이블에 12장이 놓인다', () => {
      expect(game.table.length).toBe(12);
    });

    it('덱에 69장이 남는다', () => {
      expect(game.deck.length).toBe(69);
    });

    it('플레이어가 없다', () => {
      expect(Object.keys(game.players).length).toBe(0);
    });
  });

  describe('reset', () => {
    it('게임을 초기 상태로 되돌린다', () => {
      game.connect('player1');
      game.addPoint('player1', 10);
      game.reset();
      expect(Object.keys(game.players).length).toBe(0);
      expect(game.table.length).toBe(12);
      expect(game.deck.length).toBe(69);
    });
  });

  describe('connect / disconnect', () => {
    it('플레이어를 연결한다', () => {
      game.connect('player1');
      expect(game.players.player1).toBeDefined();
      expect(game.players.player1.connected).toBe(1);
      expect(game.players.player1.score).toBe(0);
    });

    it('같은 플레이어의 중복 연결을 카운트한다', () => {
      game.connect('player1');
      game.connect('player1');
      expect(game.players.player1.connected).toBe(2);
    });

    it('플레이어를 연결 해제한다', () => {
      game.connect('player1');
      game.disconnect('player1');
      expect(game.players.player1.connected).toBe(0);
    });
  });

  describe('점수', () => {
    beforeEach(() => {
      game.connect('player1');
    });

    it('점수를 추가한다', () => {
      game.addPoint('player1', 3);
      expect(game.players.player1.score).toBe(3);
    });

    it('점수를 차감한다', () => {
      game.addPoint('player1', 5);
      game.deductPoint('player1', 2);
      expect(game.players.player1.score).toBe(3);
    });

    it('존재하지 않는 플레이어에게 점수를 추가해도 에러가 나지 않는다', () => {
      expect(() => game.addPoint('unknown', 1)).not.toThrow();
    });
  });

  describe('rename', () => {
    it('플레이어 이름을 변경한다', () => {
      game.connect('player1');
      game.addPoint('player1', 5);
      const result = game.rename('player1', 'newName');
      expect(result).toBe(true);
      expect(game.players.newName).toBeDefined();
      expect(game.players.newName.score).toBe(5);
      expect(game.players.player1).toBeUndefined();
    });

    it('이미 존재하는 이름으로 변경하면 실패한다', () => {
      game.connect('player1');
      game.connect('player2');
      const result = game.rename('player1', 'player2');
      expect(result).toBe(false);
    });

    it('존재하지 않는 플레이어의 이름을 변경하면 실패한다', () => {
      const result = game.rename('unknown', 'newName');
      expect(result).toBe(false);
    });
  });

  describe('draw', () => {
    it('카드를 추가로 뽑는다', () => {
      const tableBefore = game.table.length;
      game.draw(3);
      expect(game.table.length).toBe(tableBefore + 3);
    });

    it('게임이 끝나면 카드를 뽑을 수 없다', () => {
      // 덱을 비우고 SET이 없는 상태를 만듬
      game.deck = [];
      game.sets = [];
      const result = game.draw(3);
      expect(result).toBe(false);
    });
  });

  describe('getTableContext', () => {
    it('테이블과 덱 수를 반환한다', () => {
      const context = game.getTableContext();
      expect(context.table).toEqual(game.table);
      expect(context.deck).toBe(game.deck.length);
    });
  });

  describe('isOver', () => {
    it('SET이 있으면 게임이 끝나지 않는다', () => {
      game.sets = [[1, 2, 3]];
      expect(game.isOver()).toBe(false);
    });

    it('덱이 남아있으면 게임이 끝나지 않는다', () => {
      game.sets = [];
      game.deck = [1];
      expect(game.isOver()).toBe(false);
    });

    it('SET도 없고 덱도 비면 게임이 끝난다', () => {
      game.sets = [];
      game.deck = [];
      expect(game.isOver()).toBe(true);
    });
  });
});
