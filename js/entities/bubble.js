class Bubble {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = BUBBLE.RADIUS;
        this.shieldStrength = BUBBLE.SHIELD_STRENGTH;
        this.regenerationRate = BUBBLE.REGENERATION_RATE;
    }

    update() {
        // Regenerate shield
        if (this.shieldStrength < BUBBLE.SHIELD_STRENGTH) {
            this.shieldStrength += this.regenerationRate;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
} 