class Matchstick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = MATCHSTICK.WIDTH;
        this.height = MATCHSTICK.HEIGHT;
        this.speed = MATCHSTICK.SPEED;
        this.health = MATCHSTICK.INITIAL_HEALTH;
    }

    update(input) {
        // Handle keyboard movement
        if (input.isKeyPressed('ArrowLeft')) {
            this.x -= this.speed;
        }
        if (input.isKeyPressed('ArrowRight')) {
            this.x += this.speed;
        }

        // Handle mouse movement
        if (input.mouseX) {
            this.x = input.mouseX - this.width / 2;
        }

        // Auto-rise
        this.y -= this.speed / 2;
    }

    draw(ctx) {
        // Draw matchstick body
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw match head
        ctx.fillStyle = '#FF4500';
        ctx.fillRect(this.x, this.y - 10, this.width, 10);
    }
} 