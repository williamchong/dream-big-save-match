class UpgradeScene {
    constructor(game) {
        this.game = game;
    }

    init() {
        // Initialize upgrade state
    }

    update() {
        // Handle upgrade selections
        if (this.game.input.isKeyPressed('Space')) {
            this.game.switchScene('game');
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Upgrade Scene', this.game.canvas.width / 2, 200);
        ctx.font = '24px Arial';
        ctx.fillText('Press SPACE to continue', this.game.canvas.width / 2, 300);
    }
} 