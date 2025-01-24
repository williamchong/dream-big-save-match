class GameScene {
    constructor(game) {
        this.game = game;
        this.matchstick = null;
    }

    init() {
        this.matchstick = new Matchstick(
            this.game.canvas.width / 2,
            this.game.canvas.height - 100
        );
    }

    update() {
        if (this.matchstick) {
            this.matchstick.update(this.game.input);
        }
    }

    draw(ctx) {
        if (this.matchstick) {
            this.matchstick.draw(ctx);
        }
    }
} 