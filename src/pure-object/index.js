const Dog = {
  name: 'taro',
  bark: () => {
    // failure
    console.log(this.name)
    // success
    console.log(Dog.name)
  },
}

Dog.bark()
// undefined
// taro
