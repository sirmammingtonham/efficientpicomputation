planck.testbed(function(testbed) {
    var pl = planck, Vec2 = pl.Vec2;
    var world = pl.World({gravity: Vec2(0, -10)});
  
    var ground = world.createBody({
        type: 'static',
        position: Vec2(2, 5),
    });
    ground.createFixture({
        shape: pl.Edge(Vec2(-40.0, 0.0),Vec2(40.0, 0.0))
    });

    var smallRect = world.createDynamicBody(Vec2(0.0, 1.0));
    smallRect.createFixture(pl.Box(0.5, 0.5), {density:1, friction:0, restitution:1});

    return world;
});