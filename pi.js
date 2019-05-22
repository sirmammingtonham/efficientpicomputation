var myCanvas = document.getElementById('animation');

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

var engine = Engine.create();
var world = engine.world;
var render = Render.create({
    // canvas: myCanvas,
    element: document.body,
    engine: engine,
    options: {
    // width: 1000,
    // height: 1000,
    background: 'rgb(242, 247, 255)',
    wireframes: false,
    showAngleIndicator: false
  }
});

var smallRect = Bodies.rectangle(400, 200, 80, 80 { label: 'small' });
var bigRect = Bodies.rectangle(450, 50, 160, 160, { label: 'big' });
var wall = Bodies.rectangle(0, 0, 60, 1500, { isStatic: true });
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

Body.setMass(smallRect, 10);
Body.setMass(bigRect, 100);

var button = document.getElementById('button');
button.addEventListener("click", function(event) {
    ground.friction = 0;
    smallRect.friction = 0;
    bigRect.friction = 0;
    bigRect.frictionAir = 0;
    bigRect.restitution = 1;
    smallRect.restitution = 1;
    Body.setVelocity(bigRect, {x: -5, y: 0})
});

var numCollisions = 0;
Events.on(engine, 'collisionStart', function(event) {
    var a = event.pairs.bodyA;
    var b = event.pairs.bodyB;
    if ((a.label === "small" || "big") && (b.label === "small" || "big")) {
        console.log("|");
        button.innerHTML = numCollisions;
        numCollisions++;
    }
});

// add all of the bodies to the world
World.add(world, [smallRect, bigRect, wall, ground]);
Engine.run(engine);
Render.run(render);

