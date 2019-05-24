var piMatter = function(mass) {
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
        canvas: myCanvas,
        engine: engine,
        options: {
        width: 700,
        height: 600,
        background: 'rgb(242, 247, 255)',
        wireframes: false,
        showAngleIndicator: false
      }
    });

    var smallRect = Bodies.rectangle(300, 600-80, 80, 80, { label: 'small', inertia: Infinity, //restitution: 1, 
        friction: 0, frictionAir: 0, frictionStatic: 0 });
    var bigRect = Bodies.rectangle(480, 600-90, 160, 160, { label: 'big', inertia: Infinity, //restitution: 1, 
        friction: 0, frictionAir: 0, frictionStatic: 0 });
    var wall = Bodies.rectangle(0, 0, 60, 1500, { label: 'wall', restitution: 1, isStatic: true });
    var ground = Bodies.rectangle(400, 600, 1000, 1, { isStatic: true });

    Body.setMass(smallRect, 1);
    Body.setMass(bigRect, Math.pow(10,mass));

    var button = document.getElementById('button');
    button.addEventListener('click', function(event) {
        // ground.friction = 0;
        // smallRect.friction = 0;
        // bigRect.friction = 0;
        // bigRect.frictionAir = 0;
        bigRect.restitution = 1;
        smallRect.restitution = 1;
        Body.setVelocity(bigRect, {x: -3, y: 0})
    });

    Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {s = '0' + s;}
      return s;
    }

    var numCollisions = 0;
    Events.on(engine, 'collisionStart', function(event) {
        var a = event.pairs[0].bodyA;
        var b = event.pairs[0].bodyB;
        // console.log(b.label);
        if (a.label === 'small' && (b.label === 'big' || b.label === 'wall')) {
            // numCollisions++;
            // button.innerHTML = numCollisions.pad(4);
        }
    });

    // add all of the bodies to the world
    World.add(world, [smallRect, bigRect, wall, ground]);
    Engine.run(engine);
    Render.run(render);
}