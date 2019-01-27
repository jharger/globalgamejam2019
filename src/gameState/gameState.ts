import { listeners } from 'cluster';

const startTickTime = 2000;
const minimumTick = 500;
const maxYears = 80;
const startAge = 20;

const year = 365;
const decreaseInterval = year;
const decreaseAmount = startTickTime - minimumTick / (maxYears - startAge);

type GameStateListener = (state: GameState) => void;

class GameState {
  tickTime = startTickTime;
  daysUntilDecrease = decreaseInterval;
  days = 0;
  age = startAge;
  dead = false;

  private listeners: GameStateListener[] = [];

  public tick() {
    this.days += 1;
    this.daysUntilDecrease -= 1;
    if (this.daysUntilDecrease <= 0) {
      this.tickTime = Math.max(minimumTick, this.tickTime - decreaseAmount);
    }

    if (this.days % year === 0) {
      this.age += 1;
    }

    if (this.age >= maxYears) {
      this.dead = true;
    }

    this.listeners.forEach(listener => {
      listener(this);
    });
  }

  registerListener(listener: GameStateListener) {
    this.listeners.push(listener);
  }

  unregisterListener(listener: GameStateListener) {
    const index = this.listeners.findIndex(l => l === listener);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }
}

export { startAge, maxYears };

const gameStateInstance = new GameState();
export default gameStateInstance;
