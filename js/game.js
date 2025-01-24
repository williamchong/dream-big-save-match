class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();
        
        // Add input handler
        this.input = new InputHandler();
        
        this.currentScene = null;
        this.scenes = {
            menu: new MenuScene(this),
            game: new GameScene(this),
            upgrade: new UpgradeScene(this)
        };

        this.init();
    }

    setCanvasSize() {
        this.canvas.width = 800;
        this.canvas.height = 600;
    }

    init() {
        this.switchScene('menu');
        this.gameLoop();
    }

    switchScene(sceneName) {
        this.currentScene = this.scenes[sceneName];
        this.currentScene.init();
    }

    gameLoop() {
        const loop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(loop);
        };
        loop();
    }

    update() {
        if (this.currentScene) {
            this.currentScene.update();
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.currentScene) {
            this.currentScene.draw(this.ctx);
        }
    }
}

// Start the game when the window loads
window.onload = () => {
    new Game();
}; 