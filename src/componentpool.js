class ComponentPool {

  constructor(world, type, spinup) {

    this.world = world;
    this.type = type;
    this.klass = this.world.componentTypes[this.type];
    this.pool = [];
    this.spinUp(spinup);
  }

  get(entity, initial, lookup) {

    let comp;
    if (this.pool.length === 0) {
      comp = new this.klass(entity, initial, lookup);
      //const add = this.world.entitiesByComponent[this.type].size / 2 + 1;
      //this.spinUp(Math.ceil(add));
    } else {
      comp = this.pool.pop();
      comp._setup(entity, initial, lookup);
    }
    return comp;
  }

  release(comp) {

    comp._reset();
    //comp._meta.entity = null;
    this.pool.push(comp);
  }

  spinUp(count) {

    for(let i = 0; i < count; i++) {
      const comp = new this.klass(this.world, {});
      this.pool.push(comp);
    }
  }
}

module.exports = ComponentPool;
