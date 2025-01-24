class MenuScene {
    constructor(game) {
        this.game = game;
    }

    init() {
        // Initialize menu state
    }

    update() {
        // Check for start game input
        if (this.game.input.isKeyPressed('Space')) {
            this.game.switchScene('game');
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Girl Match Dash', this.game.canvas.width / 2, 200);
        
        ctx.font = '24px Arial';
        ctx.fillText('Press SPACE to Start', this.game.canvas.width / 2, 300);
    }
} 