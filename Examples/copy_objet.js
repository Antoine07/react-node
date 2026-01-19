


const user = { name: "Alice", age: 20 }; // pas le modifier

function modify( user ){
    user.age = 99 ;
    console.log(user)
}

const copyUser = { ...user } // crée un nouvel objet 

modify( copyUser ) ;

console.log(user)