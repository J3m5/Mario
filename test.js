
function Person(name, age){
    this.name = name;
    this.age = age;
    this.describe = function(){
    return this.name+", "+age+" years old";
};
}


var jack = new Person("Jack", 25)
var jill = new Person("Jill", 24);
console.log(jack.describe());
console.log(jill.describe());
