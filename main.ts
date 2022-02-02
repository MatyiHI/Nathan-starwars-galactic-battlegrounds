namespace SpriteKind {
    export const beam = SpriteKind.create()
    export const Obstacle = SpriteKind.create()
    export const Enemy_Projectile = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Obstacle, function (sprite, otherSprite) {
    scene.cameraShake(4, 200)
    otherSprite.destroy(effects.disintegrate, 200)
    xwing.startEffect(effects.fire, 200)
    music.smallCrash.play()
    info.changeLifeBy(-1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Xwing_Laser = sprites.createProjectileFromSprite(assets.image`laser beams`, xwing, 0, -140)
    music.pewPew.playUntilDone()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Obstacle, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate, 100)
    tie_fighter.setPosition(-20, 0)
    Tie_Laser.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 100)
})
let Asteroid: Sprite = null
let Tie_Laser: Sprite = null
let tie_fighter: Sprite = null
let Xwing_Laser: Sprite = null
let xwing: Sprite = null
effects.starField.startScreenEffect()
let Astroid_Types = [
assets.image`Small Asteroid 1`,
assets.image`asteroid`,
assets.image`Small Asteroid 2`,
assets.image`Big Asteroid 2`,
assets.image`Big Asteroid 3`
]
xwing = sprites.create(assets.image`X-Wing Smaller`, SpriteKind.Player)
xwing.setStayInScreen(true)
xwing.bottom = 120
controller.moveSprite(xwing, 100, 100)
info.setLife(5)
game.onUpdateInterval(5000, function () {
    timer.after(5000, function () {
        tie_fighter = sprites.create(assets.image`tie fighter`, SpriteKind.Enemy)
        tie_fighter.setPosition(70, -1)
        tie_fighter.follow(xwing, 15)
        while (true) {
            Tie_Laser = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . 2 . . . . . . 2 . . . . 
                . . . . 2 . . . . . . 2 . . . . 
                . . . . 2 . . . . . . 2 . . . . 
                `, tie_fighter, 0, 140)
            pause(1000)
        }
    })
})
game.onUpdateInterval(500, function () {
    Asteroid = sprites.createProjectileFromSide(Astroid_Types[randint(0, Astroid_Types.length - 1)], 0, 80)
    Asteroid.setKind(SpriteKind.Obstacle)
    Asteroid.x = randint(10, 150)
})
